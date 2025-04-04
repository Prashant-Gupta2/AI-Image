import React from 'react'

export default function ImageUpload(props) {
     const ShowImageHandler = (e)=>{
        const file= e.target.files[0];
        if(file){
         props.UploadImageHandler(file); 
        }
     }     
  return (
    <div className='upload'>
     <label htmlFor='fileInput'>
     <input id="fileInput" type='file' onChange={ShowImageHandler} />
     <span>Click and drag to upload your image</span>
     </label>
    </div>
  )
}
