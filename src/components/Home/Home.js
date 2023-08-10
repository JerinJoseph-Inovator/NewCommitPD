import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase";
import DisplayImage from "../DisplayImage/DisplayImage"

function Home({ userId }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [imageListRef, setImageListRef] = useState(null);
  console.log("User ID", userId);
  // DRAG AND DROP CODE HERE
  const [files, setFiles] = useState([])

  const handleDrop = (event) => {
  event.preventDefault();
  const { files } = event.dataTransfer;
  if (files.length > 0) {
    setFiles([...files]);
  }
}
  
  const handleDragOver = (event) => {
    event.preventDefault()
  }

   const handleDragStart = (event) => {
        event.dataTransfer.setData("text/plain", event.target.id)
    }
    // DRAG AND DROP CODE END HERE

  const handleUpload = () => {
    if (imageUpload == null) return;
    //const imageRef = ref(storage, `${userId}/results/${imageUpload.name}`);
    const imageRef = ref(storage, `${userId}/uploads/${imageUpload.name}${Math.random()*10000000}.jpg`);

    uploadBytes(imageRef, imageUpload).then((snapShot) => {
      getDownloadURL(snapShot.ref)
      .then((url) => {
        setImageURL(url);
        console.log(url);
      });
    });
  };

  const handleGenerate = (url, userId) => {
    fetch(
      `https://pyhplasticdetection.azurewebsites.net/api/httptrigger1pypld?image=${url}&userId=${userId}`
    );
  };

  const handleDelete = (url) => {
    console.log("Delete Image", url);
    const fileRef = ref(storage, url);
    deleteObject(fileRef)
      .then(() => {
        // File deleted successfully
        console.log("file deleted");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log("ERROR: ", error);
      });
  };

  useEffect(() => {
    if (!userId) return;
    setImageListRef(ref(storage, `${userId}/uploads/`));
  }, [userId, imageURL]);

  useEffect(() => {
    if (!imageListRef) return;
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((imageList) => [...imageList, url]);
        });
      });
    });
  }, [imageListRef]);

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.buttonsContainer}>
            <div className={styles.uploadsBtnContainer}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageUpload(e.target.files[0])}
              ></input>
              <button
                style={{ padding: "5px 25px", margin: 25 }}
                onClick={handleUpload}
                disabled={userId ? false : true}
              >
                Upload
              </button>

              <button
                style={{ padding: "5px 25px", margin: 25, width: 250 }}
                onClick={handleGenerate}
              >
                Generate
              </button>
            </div>

          <div className={styles.uploadImageContainer}>
{/* FILE UPLOAD HERE */}
<div className = "file-upload-div" onDrop = {handleDrop} onDragOver = {handleDragOver}>
           Add file upload display here
    </div>
{/* FILE UPLOAD END HERE */}
            {true ? (
              <DisplayImage uploadedImage={imageURL} />
            ) : (
              <h1>Upload an Image</h1>
            )}
          </div>
        </div>

        <div className={styles.showUploadsContainer}>
          <h3>Be The Change </h3>
          {imageList.map((url, id) => {
            return (
              <div key={id}>
                <img src={url} height={"250px"} style={{ margin: 25 }} />
                <button onClick={() => handleDelete(url)}>Delete image</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
