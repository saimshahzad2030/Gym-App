 
import React from 'react'
import { ImageComponentTypes } from '../../types/image';

const Image: React.FC<ImageComponentTypes> = ({ className, image }) => {
  return (
    <img className={className} src={image.src} alt={image.name || 'Image'} />
  );
};

export default Image;
