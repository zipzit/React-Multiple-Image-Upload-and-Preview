// info from https://stackoverflow.com/a/57781164/2487730
// see also https://stackoverflow.com/a/59661804/2487730
import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // method from: https://stackoverflow.com/a/59661804/2487730
  // I added URL.revokeObjectURL() below..
  const handleImageChange = e => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file =>
        URL.createObjectURL(file)
      );
      console.log("filesArray: ", filesArray);
      setSelectedFiles(prevImages => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        file => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const renderPhotos = source => {
    console.log("source: ", source);
    return source.map(photo => {
      return <img src={photo} alt="" key={photo} />;
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
      </div>
    </>
  );
};

export default App;
