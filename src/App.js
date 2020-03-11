// info from https://stackoverflow.com/a/57781164/2487730
// see also https://stackoverflow.com/a/59661804/2487730
import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  // const [previewImage, setpreviewImage] = useState();

  // create a previewImage as a side effect, whenever selected file is changed
  // useEffect(() => {
  //   if (!selectedFile) {
  //     setpreviewImage(undefined);
  //     return;
  //   }

  //   const objectUrl = URL.createObjectURL(selectedFile);
  //   setpreviewImage(objectUrl);

  //   console.log("selectedFile: ", selectedFile, "  objectUrl: ", objectUrl);

  //   // free memory when ever this component is unmounted
  //   return () => URL.revokeObjectURL(objectUrl);
  // }, [selectedFile]);

  // const handleImageChange = e => {
  //   e.persist();
  //   // console.log("handleImageChange...");
  //   if (e.target.files) {
  //     const filesArray = Array.from(e.target.files);
  //     console.log("filesArray: ", filesArray); ///////// log 2
  //     filesArray.forEach(file => {
  //       const tempUrl = URL.createObjectURL(file);
  //       console.log("tempUrl: ", tempUrl); ////// log 3
  //       // setselectedFiles([...selectedFiles, tempUrl]);
  //       setSelectedFiles(prevImages => [...prevImages, tempUrl]);
  //       URL.revokeObjectURL(file); // avoid memory leak
  //     });
  //   }
  // };

  // method from: https://stackoverflow.com/a/59661804/2487730
  // I added URL.revokeObjectURL() below..
  const handleImageChange = e => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file =>
        URL.createObjectURL(file)
      );
      console.log(filesArray); ///////// log 2
      setSelectedFiles(prevImages => prevImages.concat(filesArray));
      const cleanMemory = Array.from(e.target.files).map(
        file => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const renderPhotos = source => {
    console.log(source); ////////log 1
    return source.map(photo => {
      return (
        <img
          src={photo}
          alt=""
          key={photo}
          style={{ height: "25vh", display: "inline-block" }}
        />
      );
    });
  };

  return (
    <>
      <h2>React Multiple Images Upload & Preview</h2>
      <div>
        <input type="file" multiple onChange={handleImageChange} />
        <p />
        <hr />
        {renderPhotos(selectedFiles)}
        {/* {selectedFile && (
          <img
            src={previewImage}
            alt=""
            style={{ height: "25vh", display: "block" }}
          />
        )} */}
      </div>
    </>
  );
};

export default App;
