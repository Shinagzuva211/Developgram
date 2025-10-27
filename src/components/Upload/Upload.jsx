import React, { useContext, useRef, useState } from "react";
import Header from "../../Header.jsx"
export default function ProjectUpload() {

  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles([...files, ...Array.from(e.dataTransfer.files)]);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  return (

    <>
    <Header/>
    <div style={{ padding: "20px", maxWidth: "600px", margin: " auto" }}>
      <h2 style={{color: 'white', padding: '50px 0 20px'}}>📂 Proekt yuklash</h2>

      <div
     
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #8414ff",
          borderRadius: "10px",
          padding: "40px",
          textAlign: "center",
          color: "white",
          marginBottom: "15px",
          background: "#000045",
        }}
      >
        Fayllarni shu yerga tashlang yoki{" "}
        <span
          onClick={handleClick}
          style={{ color: "#8414ff", cursor: "pointer", fontWeight: "bold" }}
        >
          fayl tanlang
        </span>
      </div>

      <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {files.length > 0 && (
        <div className="">
        <div
        className="upload"
          style={{
          border: "2px solid #8414ff",
          borderRadius: "10px",
          color: "white",
          marginBottom: "15px",
          background: "#000045",
          paddingTop:'20px'
          }}
        >
          
          <h4>Tanlangan fayllar:</h4>
          <ul style={{ display: 'flex', flexWrap:'wrap', gap:'0px' }}>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
          
        </div>
        
        <div className="upload-btn">
          <button>Yuklash</button>
        </div>
        
        </div>

      )}

       
    </div>
    </>
  );
}
