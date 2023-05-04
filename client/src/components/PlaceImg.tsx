import React from 'react';
import Image from "./Image";

interface IPlaceImgProps {
  index?: number;
  className?: string;
  place: any;
}

const PlaceImg: React.FC<IPlaceImgProps> = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return null;
  }
  if (!className) {
    className = 'object-cover';
  }
  return (
    <Image className={className} src={place.photos[index]} alt="" />
  );
}

export default PlaceImg;