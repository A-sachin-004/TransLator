import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const BASE_URL = 'https://75ae-34-158-37-66.ngrok-free.app';

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [targetLang, setTargetLang] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [error, setError] = useState('');

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const checkStatus = async () => {
    while (true) {
      const res = await axios.get(`${BASE_URL}/check_status`);

      setStatusMsg(res.data.message);

      if (res.data.status === 'completed') {
        setVideoUrl(`${BASE_URL}${res.data.video_url}?t=${Date.now()}`);
        setLoading(false);
        break;
      }

      if (res.data.status === 'error') {
        setError(res.data.error);
        setLoading(false);
        break;
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
      await axios.post(`${BASE_URL}/submit`, {
        youtube_url: youtubeUrl,
        target_lang: targetLang
      });

      checkStatus();
    } catch (err) {
      setError('Server error');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Lip-Sync Translator</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="YouTube URL"
        />

        <input
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          placeholder="Language (fr, de, es)"
        />

        <button disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {loading && <p>⏳ {statusMsg}</p>}
      {error && <p style={{color:'red'}}>❌ {error}</p>}

      {videoUrl && (
        <div>
          <h2>Translated Video:</h2>
          <video controls width="500">
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}

export default App;
