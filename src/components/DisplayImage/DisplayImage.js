import React from 'react'
import "./DisplayImage.css"

function DisplayImage({ uploadedImage, resultImage, geoTag, num_plastic, Total_distance, resultImageURL}) {

  function generateSpaces(n) {
    const nonBreakingSpace = '\u00A0';
    return nonBreakingSpace.repeat(n);
  }

  const space3 = 5;
  const space2 = 9;
  const space1 = 18;
  
  

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
      <div className='Info'>
        <h3>MetaData:</h3>

        <p>Geo-tag{generateSpaces(space1)}:-&nbsp; <a href={geoTag} target='_blank' className='Link' > Link</a></p>
        <p>
          Result Image{generateSpaces(space2)}:-&nbsp; <a href={resultImage}target='_blank' className='Link'> Link</a>
        </p>
        <p>Detected Pastic{generateSpaces(space3)}:-&nbsp; {num_plastic}</p>
        <p>Shortest Distance&nbsp;:-&nbsp; {Total_distance}m</p>
      </div>
    </div>
  );
}

export default DisplayImage

// "geo_tag": geo_tag,
// "public_url": blob.public_url,
// "num_plastic": num_plastics, 
// "Total_distance": total_distance_meters