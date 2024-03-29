import images from "../images";
import { Link , useNavigate} from "react-router-dom";
import './Login.css';
import languages from '../language.js';
import { useState } from "react";
import axios from "axios";
//import AES from 'crypto-js/aes';

export default function Login(props){

  const [login , setLogin] = useState({ username:"redaesskouni" , password:"reda0606705646" });
  const navigate = useNavigate();
  
  const hundlelogin =(e)=>{
    setLogin({...login , [e.target.name]: e.target.value});
  }

  const hundleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.post(`${props.url}rest-auth/login/`, login);
      localStorage.setItem('auth_token', response.data.key );
      setLogin({ username:"" , password:"" });
      navigate('/');
      window.location.reload();
    }catch(err){
      alert(err);
    }
  }


  return (
    
    <div className="container"   style={{marginTop:"4rem"}}>
    
        <div className="row">
            <div className="col-md-6 d-flex  justify-content-center align-items-center">
                <img src={images.signinImage} alt="img" className="w-75"/>
            </div>
          
            <div className="col-md-6">
                <div className="row">
                      <div className="col-md-8">
                            <div className="mb-4">
                                <h3>{languages.login.h3}</h3>
                                <p className="mb-4"> { languages.login.p }</p>
                            </div>
                            <form method="POST" onSubmit={hundleSubmit}>
                                
                                <div className="form-group first">
                                  <label htmlFor="username">{languages.login.username}</label>
                                  <input type="text" name="username" onChange={hundlelogin} value={login.username} className="form-control mt-3" id="user_name"/>
                                </div>
                                
                                <div className="form-group last mb-4">
                                  <label htmlFor="password">{languages.login.password}</label>
                                  <input type="password" name="password" value={login.password} onChange={hundlelogin} className="form-control mt-3" id="password"/>
                                </div>

                                <div className="d-flex mb-3 align-items-center">
                                    <span className="ml-auto">
                                        <Link to="/forgot_password">{languages.login.forgot_password}</Link>
                                    </span> 
                                </div>
                                
                                <input type="submit" value={languages.login.h3} className="btn text-white btn-block btn-primary"/>
                                
                                <Link to="/create_account" style={{marginTop:"0.8rem"}}> {languages.login.Create_account} </Link>

                                <span className="d-block text-left my-4 text-muted"> {languages.login.sign_in_with} </span>
                                
                                <div className="d-flex">
                                  <div className="facebook">
                                    <i className="fa-brands fa-facebook-f"></i>
                                  </div>  
                                  <div className="twitter">
                                    <i className="fa-brands fa-twitter"></i>
                                  </div>
                                </div>
                            </form>
                      </div>
                </div>
            </div>   

        </div> 
    </div>
  )
}