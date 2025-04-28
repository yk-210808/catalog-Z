import * as React from 'react';
import { useLocation } from "@reach/router";
// Plugins
import ReactPlayer from 'react-player';
// Types 
import { typeGraphqlValue } from '../types/typeGraphql';

interface GetThumbOrVideoProps {
  featuredImage?: typeGraphqlValue['featuredImage'];
  video?: string | null;
  onDuration?: (duration: number) => void;
}

export const GetThumbOrVideo: React.FC<GetThumbOrVideoProps> = ({ featuredImage, video, onDuration }) => {
  const imageUrl = featuredImage?.node?.sourceUrl;

  if (imageUrl) {
    return <img src={imageUrl} alt="Image" className="img-fluid" />;
  }

  // 画像がなく、video の URL が存在すれば動画を表示
  if (video) {
    return <ReactPlayer url={video} width="100%" height="auto" style={{ aspectRatio: '16 / 9' }} controls={true} onDuration={onDuration} />;
  }

  return null;
};

export const isVideoPage = () => {
  const locationPath = useLocation().pathname.split("/") || "/";
  const videoFlg = locationPath.filter((x) => x === 'videos').length ? true : false;

  return videoFlg;
}

export const GetFileFormat: React.FC<GetThumbOrVideoProps> = ({ featuredImage, video }) => {
  const imageUrl = featuredImage?.node?.sourceUrl;
  const fileName = imageUrl ? imageUrl : video;

  if (!fileName) {
    return
  }

  const splitFileName = fileName.split('.');
  return splitFileName.pop()?.toUpperCase() || '';
}

export const formatDuration = (seconds: number) => {
  if(isNaN(seconds) || seconds < 0) {
    return '00:00:00';
  }

  // 秒 ➡ hh:mm:ss
  const time = new Date(seconds * 1000).toISOString().slice(11, 19);

  return time;
};