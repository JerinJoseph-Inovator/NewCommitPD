import React from 'react'
import "./DisplayImage.css"

function DisplayImage({ uploadedImage, resultImage }) {

  return (
    <div className="wrapper">
      <div>
        <h3>Uploaded Image: </h3>
        <img alt="upload" src={uploadedImage} height={"100%"} />
      </div>
      <div>
        <h3>Result Image: </h3>
        <img alt="result" src={resultImage} height={"100%"} />
      </div>
      <div>
        <h3>Geo Tag:</h3>
      </div>
    </div>
  );
}

export default DisplayImage