import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const BASE_URL = 'https://54ff-34-158-37-66.ngrok-free.app';

const axiosConfig = {
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
};

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [targetLang, setTargetLang] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [error, setError] = useState('');

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const checkStatus = async () => {
    while (true) {
      try {
        const res = await axios.get(
          `${BASE_URL}/check_status`,
          axiosConfig
        );

        setStatusMsg(res.data.message);

        if (res.data.status === 'completed') {
          setVideoUrl(`${BASE_URL}/static/final_video.mp4?t=${Date.now()}`);
          setLoading(false);
          break;
        }

        if (res.data.status === 'error') {
          setError(res.data.error || 'Something went wrong.');
          setLoading(false);
          break;
        }
      } catch (err) {
        console.error('Status check failed:', err);
      }

      await sleep(3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setVideoUrl('');
    setError('');
    setStatusMsg('Starting...');

    try {
      await axios.post(
        `${BASE_URL}/submit`,
        {
          youtube_url: youtubeUrl,
          target_lang: targetLang,
        },
        axiosConfig
      );

      await checkStatus();
    } catch (err) {
      console.error('Error submitting:', err);
      setError('Failed to connect to server. Is the Colab running?');
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
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Language (e.g., fr, de, es)"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {loading && (
        <p>⏳ {statusMsg || 'Processing video... please wait'}</p>
      )}

      {error && (
        <p style={{ color: 'red' }}>❌ {error}</p>
      )}

      {videoUrl && (
        <div className="videoContainer">
          <h2>Translated Video:</h2>
          <video
            controls
            width="500"
            src={videoUrl}
          />
        </div>
      )}
    </div>
  );
}

export default App;
