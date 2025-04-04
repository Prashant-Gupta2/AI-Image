import React, { useState } from 'react'
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'
import { enhanceImageAPI } from '../utils/enhanceimageapi';

export default function Home() {
     const [uploadimage,setuploadimage]=useState(null);
     const [enhance,setenhance]=useState(null);
     const [loading,setloading]=useState(false); 
     
     const UploadImageHandler = async(file)=>{
      setuploadimage(URL.createObjectURL(file));
      setloading(true);
      // calling api to enhance image
      try{
       const enhanceURL= await enhanceImageAPI(file);
       setenhance(enhanceURL.image);
       setloading(false);
      }
      catch (error){
         console.log(error);
         alert("Error while enhancing the image");
      }
     };
  return (
    <div>
     <ImageUpload UploadImageHandler={UploadImageHandler}/>

     <ImagePreview loading={loading} 
       uploadimage={uploadimage}
       enhance={enhance}/>
    </div>
  )
}
