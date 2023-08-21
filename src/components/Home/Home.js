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
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function Home({ userId }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);

  const [uploadImageURL, setUploadImgURL] = useState("");
  const [resultImageURL, setResultImgURL] = useState("");

  const [imageList, setImageList] = useState([]);
  const [imageListRef, setImageListRef] = useState(null);


  const handleUpload = () => {
    setResultImgURL("");
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `https://storage.googleapis.com/plastic-detection-598e8.appspot.com/${userId}/uploads/${imageUpload.name}`
    );
    setLoading(true);
    uploadBytes(imageRef, imageUpload).then((snapShot) => {
      getDownloadURL(snapShot.ref).then((url) => {
        setUploadImgURL(url);
        setLoading(false);
      });
    });
  };

  const handleGenerate = (url, userId) => {
    setLoading(true);
    const str = new URL(url);
    const fetchURL = url.includes(
      "/v0/b/plastic-detection-598e8.appspot.com/o/"
    )
      ? str.pathname.replace(
          "/v0/b/plastic-detection-598e8.appspot.com/o/",
          "https://storage.googleapis.com/plastic-detection-598e8.appspot.com/"
        )
      : url;
    try {
      setLoading(true);
      fetch(
        `https://plastic-detection.eastus.cloudapp.azure.com/?imgz=${fetchURL}&uuid=${userId}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Request-Method": "GET",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //extract your results here. i.e after your cloud function runs
          setResultImgURL(() => `${data.public_url}`);
          setLoading(false);
          return data;
        });
    } catch (error) {
      setLoading(false);
      console.error("Error: ", error);
    }
  };

  const handleDelete = async (url) => {
    const uploadFileRef = ref(storage, url);
    const resultFileRef = ref(storage, url.replace("uploads", "results"));
    setLoading(true);
    setUploadImgURL("");
    setResultImgURL("");
    //delete file from uploads folder
    const indexOfURL = imageList.indexOf(url);
    await deleteObject(uploadFileRef)
      .then(() => {
        // File deleted successfully
        setImageList((imageList) => imageList.splice(indexOfURL, 1));
        console.warn("file deleted", uploadFileRef);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.error("ERROR: ", error);
      });

    //delete file from results folder
    await deleteObject(resultFileRef)
      .then(() => {
        // File deleted successfully
        console.warn("file deleted", resultFileRef);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.error("ERROR: ", error);
      });
    setLoading(false);
  };

  const handleSelect = (url) => {
    setUploadImgURL(url);
    setResultImgURL(url.replace("uploads", "results"));
  };

  useEffect(() => {
    if (!userId) return;
    setImageListRef(ref(storage, `${userId}/uploads/`));
  }, [userId, uploadImageURL]);

  useEffect(() => {
    if (!imageListRef) return;
    setLoading(true);
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (imageList.includes(url)) return;
          setImageList([...imageList, url]);
        });
      });
      setLoading(false);
    });
  }, [imageList, imageListRef]);


  return (
    <>
      {loading && <LoadingSpinner />}
      <div
        className={styles.homeContainer}
        style={loading ? { overflow: "hidden" } : {}}
      >
        <div className={styles.buttonsContainer} for = "upl">
          <div className={styles.ChooseFile}>
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={(e) => setImageUpload(e.target.files[0])}
            ></input>
            <label for="upload">Choose File</label>
          </div>
          <button onClick={handleUpload} disabled={userId ? false : true} className = {styles.uploadbtn}>
            Confirm & Upload <br></br> your Image
          </button>

          
          <button
            className= {styles.pid}
            onClick={() => {
              handleGenerate(uploadImageURL, userId);
            }}>
            <div className={styles.left}></div>
            Detect Plastic!   
            <div className={styles.right}></div>
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
          <h3>Uploads: </h3>
          <div>
            {imageList.map((url, id) => {
              return (
                <div className={styles.uploadedImages} key={id}>
                  <img
                    alt="uploaded"
                    src={url}
                    height={"250px"}
                    style={{ margin: 25 }}
                  />
                  <button onClick={() => handleDelete(url)}>
                    Delete image
                  </button>
                  <button onClick={() => handleSelect(url)}>
                    Select image
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
