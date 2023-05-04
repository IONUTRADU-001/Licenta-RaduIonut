import React from 'react';

const Image: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {src: string}> = ({src,...rest}) => {
  src = src && src.includes('https://')
    ? src
    : 'http://localhost:4000/uploads/'+src;
  return (
    <img {...rest} src={src} alt={''} />
  );
}

export default Image;