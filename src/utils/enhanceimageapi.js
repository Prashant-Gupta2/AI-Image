import axios from "axios";

const APIkey="wxghsuipabjgao4t9";
const base_URL="https://techhk.aoscdn.com";

export const enhanceImageAPI = async(file)=>{
  try{
         
       const taskid= await uploadImage(file);

       const enhancedImage= await poolForEnhancedImage(taskid); 
      //  console.log("Enhanced image data:", enhancedImage); 
       
       return enhancedImage;
  }
  catch (error){
   console.log("error enhancg image", error.message);       
  }
}

const uploadImage = async(file)=>{
  const formData= new FormData();
  formData.append("image_file", file);
  
 const {data} = await axios.post(`${base_URL}/api/tasks/visual/scale`, formData , {
        headers:{
          "Content-Type": "multipart/form-data",
          "X-API-KEY": APIkey,
        },
  });
  if(!data?.data?.task_id){
   throw new Error("Failed to upload image! task is not found"); 
  }
 
  return data.data.task_id;
}

const FetchedEnhancedImage = async(taskid)=>{
 const {data} = await axios.get(`${base_URL}/api/tasks/visual/scale/${taskid}`, {
        headers:{
          "X-API-KEY": APIkey,
        },
  });
  if(!data?.data){
   throw new Error("Falied to fetch enhanced image! Image not found:"); 
  }
  else{
    return data.data
  }
}

const poolForEnhancedImage= async(taskid, retries=0)=>{
   const result= await FetchedEnhancedImage(taskid);
   if(result.state === 4){
    console.log("processing...");
    if(retries >= 20){
      throw new Error("Max retires reached, please try after some time");
    }
    await new Promise((resolve)=> setTimeout(resolve, 2000));
    return poolForEnhancedImage(taskid, retries + 1);
   }
  //  console.log("enhanced image:", result);
   return result;
}