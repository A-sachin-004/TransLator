import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const BASE_URL = 'https://eb6e-34-186-19-255.ngrok-free.app';

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [targetLang, setTargetLang] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const checkStatus = async () => {
    while (true) {
      try {
        const res = await axios.get(`${BASE_URL}/check_status`);

        if (res.data.status === 'completed') {
          setVideoUrl(`${BASE_URL}/static/final_video.mp4`);
          setLoading(false);
          break;
        }
      } catch (err) {
        console.error('Status check failed:', err);
      }

      await sleep(3000); // check every 3 seconds
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVideoUrl('');

    try {
      await axios.post(`${BASE_URL}/submit`, {
        youtube_url: youtubeUrl,
        target_lang: targetLang,
      });

      // Start polling for completion
      await checkStatus();
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Something went wrong. Check console.');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Lip-Sync Video Translator</h1>
      <h4>Enter YouTube URL and Target Language</h4>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Language (e.g., fr, de, es)"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {loading && <p>Processing video... please wait ⏳</p>}

      {videoUrl && (
        <div className="videoContainer">
          <h2>Translated Video:</h2>
          <video controls width="500" src={videoUrl} />
          <p>
            <a href={videoUrl} download>
              Download Video
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
