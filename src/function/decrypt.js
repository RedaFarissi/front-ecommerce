import axios from 'axios';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';


const secretKey = 'your-secret-key';


async function hundeleRequestPost( url ,  data , ContentType="application/json") {
  
  const decryptedToken = AES.decrypt(localStorage.getItem('auth_token'), secretKey).toString(CryptoJS.enc.Utf8);

  const headers = { 'Content-Type': ContentType, };

  if (decryptedToken) headers.Authorization = `Token ${decryptedToken}`;
  
  try {
    const  response = await axios({ url , method: 'POST' , headers , data });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default hundeleRequestPost;