
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const app = express();
const PORT = 3001;

// Enable CORS for frontend access
app.use(cors());
app.use(express.json());

/**
 * Root route to check server status
 */
app.get('/', (req, res) => {
  res.json({ status: 'Online', message: 'FreeTube Downloader Backend is Running. Use /api/fetch-info' });
});

/**
 * Endpoint: POST /api/fetch-info
 * Uses yt-dlp to get video metadata.
 */
app.post('/api/fetch-info', (req, res) => {
  const { url } = req.body;
  
  if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) {
    return res.status(400).json({ error: 'Please provide a valid YouTube URL.' });
  }

  // Run yt-dlp to dump JSON metadata
  const ytDlp = spawn('yt-dlp', ['--dump-json', url]);
  
  let data = '';
  let errorData = '';

  ytDlp.stdout.on('data', (chunk) => { data += chunk; });
  ytDlp.stderr.on('data', (chunk) => { errorData += chunk; });

  ytDlp.on('close', (code) => {
    if (code !== 0) {
      console.error('yt-dlp stderr:', errorData);
      return res.status(500).json({ error: 'Failed to fetch video. Ensure the URL is accessible and valid.' });
    }

    try {
      const json = JSON.parse(data);
      
      const licenseField = json.license || '';
      const description = json.description || '';
      const isCC = licenseField.toLowerCase().includes('creative commons') || 
                   description.toLowerCase().includes('creative commons attribution');

      const rawFormats = json.formats || [];
      
      const cleanFormats = rawFormats
        .filter(f => {
          const isMuxed = f.ext === 'mp4' && f.acodec !== 'none' && f.vcodec !== 'none';
          const isAudio = f.ext === 'm4a';
          return isMuxed || isAudio;
        })
        .sort((a, b) => {
            if (a.height !== b.height) return (b.height || 0) - (a.height || 0);
            return (b.filesize || 0) - (a.filesize || 0);
        })
        .map(f => ({
          id: f.format_id,
          ext: f.ext,
          resolution: f.height ? `${f.height}p` : 'Audio',
          note: f.format_note || '',
          filesize_approx_mb: f.filesize ? parseFloat((f.filesize / 1024 / 1024).toFixed(2)) : 0
        }));
      
      const uniqueFormats = [];
      const seen = new Set();
      
      uniqueFormats.push({
        id: 'mp3-high',
        ext: 'mp3',
        resolution: 'Audio',
        note: 'High Quality (Converted)',
        filesize_approx_mb: 0
      });

      for (const fmt of cleanFormats) {
        const key = `${fmt.resolution}-${fmt.ext}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueFormats.push(fmt);
        }
      }

      res.json({
        id: json.id,
        title: json.title,
        thumbnail: json.thumbnail,
        channel: json.uploader,
        duration: json.duration_string,
        views: json.view_count,
        uploadDate: json.upload_date,
        license: licenseField || 'Standard YouTube License',
        isCopyrightFree: true,
        isCC: isCC,
        formats: uniqueFormats.slice(0, 12)
      });
      
    } catch (err) {
      console.error('JSON Parse Error:', err);
      res.status(500).json({ error: 'Failed to process video metadata.' });
    }
  });
});

/**
 * Endpoint: GET /api/download
 * Streams the download using yt-dlp.
 */
app.get('/api/download', (req, res) => {
  const { url, format_id, title } = req.query;

  if (!url || !format_id) {
    return res.status(400).send('Missing URL or Format ID');
  }

  const safeTitle = (title || 'video').replace(/[^a-z0-9]/gi, '_').substring(0, 50);
  const args = ['--output', '-', url]; 

  if (format_id === 'mp3-high') {
    res.header('Content-Disposition', `attachment; filename="${safeTitle}.mp3"`);
    res.header('Content-Type', 'audio/mpeg');
    args.push('-x', '--audio-format', 'mp3');
  } else {
    res.header('Content-Disposition', `attachment; filename="${safeTitle}.mp4"`);
    res.header('Content-Type', 'video/mp4');
    args.push('-f', format_id);
  }

  const ytDlpProcess = spawn('yt-dlp', args);
  ytDlpProcess.stdout.pipe(res);

  ytDlpProcess.stderr.on('data', (data) => {
     // console.log(`stderr: ${data}`);
  });

  ytDlpProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Download process exited with code ${code}`);
    }
    res.end();
  });
  
  req.on('close', () => {
    ytDlpProcess.kill();
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
