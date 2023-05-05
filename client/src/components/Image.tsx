import React from 'react';

const Image: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {src: string}> = ({src,...rest}) => {
  src = src && src.includes('https://')
    ? src
    : 'http://localhost:4000/uploads/'+src;
  return (
    <img {...rest} src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt={''} />
  );
}

export default Image;