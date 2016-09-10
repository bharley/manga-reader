import React from 'react';

const Images = ({ chapter, images }) => {
  if (!images) {
    return false;
  }

  return (
    <div>
      {images.map((image, index) => (
        <img
          key={`image ${index}`}
          src={image}
          className="img-responsive"
          alt={`${chapter}, page ${index + 1}`}
        />
      ))}
    </div>
  );
};

Images.propTypes = {
  chapter: React.PropTypes.string,
  images: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default Images;
