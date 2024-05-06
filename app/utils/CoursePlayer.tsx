import React, { FC, useEffect, useState } from "react";
import axios from "axios";
type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/v1/getVdoCipherOTP", {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);

  return (
    <div style={{ paddingTop: "41%", position: "relative", overflow:"hidden" }}>
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&playbackInfo=J8z5EhdWfcc3bhZV`}
        // src="https://player.vdocipher.com/v2/?otp=20160313versASE323TPA6OXp3YK9kcgrClCnS6EF9r6sAwqTnHd7kSPkVLqdcjp&playbackInfo=eyJ2aWRlb0lkIjoiMThmODZlMWRhYjQ2ZmU3NDg1OWY5MzllZmU1MDA3N2MifQ==&playbackInfo=J8z5EhdWfcc3bhZV"
          style={{
            border: "0",
            maxWidth: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            height: "100%",
            width: "100%",
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
