import React, { useState, useEffect, setFiles } from "react";
import { render } from "react-dom";
import { storage } from "./firebase";
const UploadImages = () => {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    let newImages = [];
    Array.prototype.forEach.call(e.target.files, (file) => {
      newImages.push(file);
    });
    setImages(newImages);
  };
  const handleUpload = () => {
    let newUrls = [];
    console.log("uploadimages", images);
    let uploadPromises = images.map((image) => {
      console.log("uploadimage", image);
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              newUrls.push(url);
            });
        }
      );
      return uploadTask;
    });
    Promise.all(uploadPromises).then(() => {
      setUrls(newUrls);
    });
  };
  console.log("urls: ", urls);
  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <input multiple="multiple" type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {urls.map((url) => {
        return (
          <React.Fragment key={url}>
            <a href={url} download>
              Download{" "}
            </a>
            <br />
            <img
              src={url || "http://via.placeholder.com/300"}
              alt="firebase-image"
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
render(<UploadImages />, document.querySelector("#root"));
