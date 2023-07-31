import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css";
const BASE_URL = "https://skillop.onrender.com";
const About = () => {
    const [userType, setUserType] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState("");


    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('auth');
        const user = localStorage.getItem('user');
        const userData = JSON.parse(user);
        let userType = JSON.parse(localStorage.getItem("userType"));
        
        // console.log(authData.step1);
        if (auth) {
            if (!userData.step1) {
                navigate('/expertise');
            }
            else if (!userData.step2 && userType) {
                navigate('/slots');
            } else if (!userData.step3) {
                navigate('/about');
            } else {
                // console.log(auth);
                navigate('/main')
            }
        }
    }, [])

    const collectData = async () => {
        if (!userType || !email || !password) {
            alert("Fill all info!")
            return
        };
        console.warn(userType, email, password);
        let result = await fetch(`${BASE_URL}/login`, {
            method: 'post',
            body: JSON.stringify({ email, password, userType}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("userType", JSON.stringify(userType));
            localStorage.setItem("auth", JSON.stringify(result.auth));
            
            navigate('/signup');
        } else{
            alert("Wrong email or password")
        }
    }

    return (
        <div className="register login">

            <form action="#" className="form">
                <h1 className="text-center">Login</h1>
                <hr />
                <div className="redio">
                    <div>
                        <input type="radio" value="mentor" name="class" required
                            onChange={(e)=>{setUserType(e.target.value)}} />
                        <label htmlFor="remember">Mentor</label>
                    </div>
                    <div>
                        <input type="radio" value="mentee" name="class" required 
                             onChange={(e)=>{setUserType(e.target.value)}} />
                        <label htmlFor="remember">Mentee</label>
                    </div>
                </div>
                <div className="form-step form-step-active">

                    <div className="input-group">
                        {/* <!-- <label for="email">username/email</label> --> */}
                        <input type="email" name="email" placeholder="example@gamil.com" id="em" required pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" 
                             onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                    </div>

                    <div className="input-group">
                        {/* <!-- <label for="password">Password</label> --> */}
                        <input type="password" name="password" placeholder="Password" id="password" required 
                            onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                    </div>
                    <div className="subcontainer">
                        <input type="checkbox" checked="checked" name="remember" 
                            onChange={(e)=>{setRememberMe(e.target.value)}} value={rememberMe}/>
                        <label htmlFor="remember"> Remember me </label>
                    </div>

                    
                </div>

                <div className="login" id="login">
                    <button type="button" onClick={collectData}>Login</button>
                    <p className="register">Not a member? <a href="/signup">Register here!</a></p>

                </div>
                <p className="forgotpsd"> <a href="/forgetPassword">Forgot Password?</a></p>


        {/* </div> */}
            </form >
        </div >
    )
}
export default About;
