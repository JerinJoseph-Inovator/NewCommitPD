import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase";

import DisplayImage from "../DisplayImage/DisplayImage";
import styles from "./Home.module.css";

function Home({ userId }) {
  const [imageUpload, setImageUpload] = useState(null);

  const [resultImageURL, setResultImgURL] = useState("");
  const [uploadImageURL, setUploadImgURL] = useState("");

  const [imageList, setImageList] = useState([]);
  const [resultList, setResultList] = useState([]);

  const [imageListRef, setImageListRef] = useState(null);
  const [resultImageListRef, setResultImageListRef] = useState(null);


  const handleUpload = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `https://storage.googleapis.com/plastic-detection-598e8.appspot.com/${userId}/uploads/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then((snapShot) => {
      getDownloadURL(snapShot.ref).then((url) => {
        setUploadImgURL(url);
      });
    });
  };

  const handleGenerate = (url, userId) => {
    const str = new URL(url)
    const fetchURL = str.pathname.replace(
      "/v0/b/plastic-detection-598e8.appspot.com/o/",
      "https://storage.googleapis.com/plastic-detection-598e8.appspot.com/"
    );
    console.log("Fetch: ", fetchURL, userId);
    try {
      fetch(
        `http://plastic-detection.eastus.cloudapp.azure.com/?imgz=${fetchURL}&uuid=${userId}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Request-Method": "GET",
          },
        }
      )
        .then((response) => {
          console.log(response)
          return response.json();
        })
        .then((data) => {
          //extract your results here. i.e after your cloud function runs
          console.log("Result", data.public_url);
          setResultImgURL(data.public_url);
          return data;
        });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleDelete = (url) => {
    const fileRef = ref(storage, url);
    const indexOfURL = imageList.indexOf(url);
    deleteObject(fileRef)
      .then(() => {
        // File deleted successfully
        setImageList((imageList) => imageList.splice(indexOfURL, 1));
        console.warn("file deleted", fileRef);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.error("ERROR: ", error);
      });
  };

  const handleSelect = (url) => {
    setUploadImgURL(url);
  };

  useEffect(() => {
    if (!userId) return;
    setImageListRef(ref(storage, `${userId}/uploads/`));
    setResultImageListRef(ref(storage, `${userId}/results/`));

  }, [userId, uploadImageURL]);

  useEffect(() => {
    if (!imageListRef) return;
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (imageList.includes(url)) return;
          setImageList([...imageList, url]);
        });
      });
    });
  }, [imageList, imageListRef]);

   useEffect(() => {
     if (!resultImageListRef) return;
     listAll(resultImageListRef).then((response) => {
       response.items.forEach((item) => {
         getDownloadURL(item).then((url) => {
           if (resultList.includes(url)) return;
           setImageList([...resultList, url]);
         });
       });
     });
   }, [resultList, resultImageListRef]);

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.buttonsContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageUpload(e.target.files[0])}
          ></input>
          <button onClick={handleUpload} disabled={userId ? false : true}>
            Upload
          </button>

          <button
            style={{ width: 250 }}
            onClick={() => handleGenerate(uploadImageURL, userId)}
          >
            Generate
          </button>
        </div>
        <div className={styles.uploadImageContainer}>
          {userId ? (
            <DisplayImage
              uploadedImage={uploadImageURL}
              resultImage={resultImageURL}
            />
          ) : (
            <h1>Upload an Image</h1>
          )}
        </div>

        <div className={styles.showUploadsContainer}>
          <h3>Be The Change </h3>
          <h3>Uploads: </h3>
          {imageList.map((url, id) => {
            return (
              <div className={styles.uploadedImages} key={id}>
                <img
                  alt="uploaded"
                  src={url}
                  height={"250px"}
                  style={{ margin: 25 }}
                />
                <button onClick={() => handleDelete(url)}>Delete image</button>
                <button onClick={() => handleSelect(url)}>Select image</button>
              </div>
            );
          })}
        </div>
        <div className={styles.showUploadsContainer}>
          <h3>Be The Change </h3>
          <h3>Results: </h3>
          {resultList.map((url, id) => {
            return (
              <div className={styles.uploadedImages} key={id}>
                <img
                  alt="results"
                  src={url}
                  height={"250px"}
                  style={{ margin: 25 }}
                />
                <button onClick={() => handleDelete(url)}>Delete image</button>
                <button onClick={() => handleSelect(url)}>Select image</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
