import React, { useEffect } from 'react';
import "../App.css";
import Loading from './Loading';

export default function ImagePreview(props) {
  useEffect(() => {
    const btn = document.getElementById("downloadbtn");

    function handleClick() {
      if (props.enhance) {
        const link = document.createElement('a');
        link.href = props.enhance; // URL of the enhanced image
        link.download = 'enhanced-image.jpg'; // The filename that will be used for the download
        link.click(); // Trigger the download
      }
    }

    if (btn) {
      btn.addEventListener("click", handleClick);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      if (btn) {
        btn.removeEventListener("click", handleClick);
      }
    };
  }, [props.enhance]); // Only re-run if `props.enhance` changes

  return (
    <div className='img-box'>
      <div className='left'>
        <h3>Original image</h3>
        {props.uploadimage ? (
          <img src={props.uploadimage} width={100} alt="Original" />
        ) : (
          <div>
            <p style={{ textAlign: "center", marginTop: '130px' }}>No image selected</p>
          </div>
        )}
      </div>

      <div className='right'>
        <h3>Enhanced image</h3>
        {props.loading ? (
          <Loading />
        ) : props.enhance ? (
          <img src={props.enhance} width={100} alt="Enhanced Image" />
        ) : (
          <div>
            <p style={{ textAlign: "center", marginTop: "130px" }}>No Enhanced Image</p>
          </div>
        )}
        {props.enhance ? (
          <button id="downloadbtn" className='btn'>Download image</button>
        ) : ""}
      </div>
    </div>
  );
}
