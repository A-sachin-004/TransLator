import React, { useState } from "react";
import axios from "axios";

function VideoTranslator() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVideoUrl("");

    try {
      const response = await axios.post("https://0826-34-143-180-161.ngrok-free.app/submit", {
        url: youtubeUrl,
        lang: language,
      });
      setVideoUrl(response.data.video_url);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>YouTube Video Translator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Language code (e.g., fr)"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <button type="submit">Translate</button>
      </form>

      {loading && <p>Processing... Please wait.</p>}

      {videoUrl && (
        <div>
          <h3>Translated Video:</h3>
          <video src={videoUrl} controls width="600" />
        </div>
      )}
    </div>
  );
}

export default VideoTranslator;
