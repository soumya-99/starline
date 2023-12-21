import axios from 'axios';
import { BASE_URL } from '../../../src/config';




function loginController() {
    const register = async (userName,userMobile,userPassword,userRefCode) => {
        console.log("test_____",userName,userMobile,userPassword,userRefCode)
   const response =   await axios.post(`${BASE_URL}/create-account`, 
      {
        name: userName,
        mobile: userMobile,
        password: userPassword,
        userRefCode
      }) 
      
      // .then(res => {
      //   return res.data;
      // }).catch(er => {
        
      //   console.log("Error:", er.message); // Log the error message
      //   console.log("Error config:", er.config); // Log the request configuration (optional)
      //   return er
      // })
  
     return response
    };
  
    return {register};
  }


  

  export default loginController;