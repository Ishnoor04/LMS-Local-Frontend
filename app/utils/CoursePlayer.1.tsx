import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl:string
  title:string
};

export const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
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
  console.log(videoData.otp, videoData.playbackInfo);
  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          //   src=`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&playbackInfo=J8z5EhdWfcc3bhZV`
          src=""
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
