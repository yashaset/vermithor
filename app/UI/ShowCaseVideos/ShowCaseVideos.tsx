import React from "react";
import YouTubeEmbed from "../YouTubeEmbed/YouTubeEmbed";
import { styles } from "./styles";

const ShowCaseVideos = () => {
  const videoUrls = [
    "Cp2sIlRWvjw",
    "Mjf2Hfyal8U",
    "aEt1fHNwIfo",
    "Z0ccNHOmtQw",
    "HVy4wCL0V7E",
    "36yfSiqwJUQ",
    "WDMCUGzwKvc",
    "LJ2ENbj9NfY",
    "npDb7IJoL8c",
    "gqUSpbobccs",
    "b-i7l6TQa0M",
    "ruhVBM2hQm8",
    "-KWb-O2djUU",
    "IxDJcKR0UwU",
    "Rt3gMSnnSac",
  ];

  return (
    <div style={styles.gridContainer}>
      {videoUrls.map((video) => (
        <div key={video} style={styles.gridItem}>
          <h3>{""}</h3>
          <YouTubeEmbed videoId={video} />
        </div>
      ))}
    </div>
  );
};

export default ShowCaseVideos;
