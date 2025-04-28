/* import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [targetLang, setTargetLang] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVideoUrl('');

    try {
      const response = await axios.post('https://8f64-34-143-200-8.ngrok-free.app/submit', {
        youtube_url: youtubeUrl,
        target_lang: targetLang
      });

      setVideoUrl(response.data.video_url);
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Something went wrong. Please check console.');
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>Lip-Sync Video Translator 🎬</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="text"
          placeholder="Target Language Code (e.g., fr, de, es)"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {videoUrl && (
        <div style={styles.videoContainer}>
          <h2>Translated Lip-Synced Video:</h2>
          <video controls width="500" src={videoUrl} />
          <p><a href={videoUrl} download>Download Video</a></p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  },
  form: {
    margin: '20px 0'
  },
  input: {
    padding: 10,
    margin: 10,
    width: 300,
    borderRadius: 5,
    border: '1px solid #ccc'
  },
  button: {
    padding: 10,
    margin: 10,
    width: 150,
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer'
  },
  videoContainer: {
    marginTop: 30
  }
};

export default App;
 */

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [targetLang, setTargetLang] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVideoUrl('');

    try {
      const response = await axios.post('https://aa56-35-231-113-228.ngrok-free.app/submit', {
        youtube_url: youtubeUrl,
        target_lang: targetLang
      });

      setVideoUrl(response.data.video_url);
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Something went wrong. Please check console.');
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Lip-Sync Video Translator</h1>
      <h4>Enter the Youtube URL and Preferred Language Code</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Target Language Code (e.g., fr, de, es)"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {videoUrl && (
        <div className="videoContainer">
          <h2>Translated Lip-Synced Video:</h2>
          <video controls width="500" src={videoUrl} />
          <p><a href={videoUrl} download>Download Video</a></p>
        </div>
      )}
    </div>
  );
}

export default App;