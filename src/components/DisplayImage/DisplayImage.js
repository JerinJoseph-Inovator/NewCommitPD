import React from 'react'
import "./DisplayImage.css"

function DisplayImage({ uploadedImage, resultImageURL }) {
  return (
    <div className="wrapper">
      <div>
        <h3>Uploaded Image Here</h3>
        <img alt="upload" src={uploadedImage} height={"100%"} />
      </div>
      <div>
        <h3>Result Image Here</h3>
        <img alt="result" src={resultImageURL} height={"100%"} />
      </div>
      <div>
        <h3>Some text here</h3>
      </div>
    </div>
  );
}

export default DisplayImage