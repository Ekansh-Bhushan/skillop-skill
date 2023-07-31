import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
// import mentor from "../../../server/db/mentor";
const BASE_URL = "https://skillop.onrender.com";
const SignUp = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('auth');
        const user = localStorage.getItem('user');
        const userData = JSON.parse(user);
        // console.log(authData.step1);
        if (auth) {
            if (!userData.step1) {
                navigate('/expertise');
            }
            else if (!userData.step2 && userType==="mentor") {
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
        if ((!email) || (!password) || (!fullname) || (!userType) || !phoneNumber) return;
        console.warn(userType, fullname, email, password, phoneNumber);

        let result = await fetch(`${BASE_URL}/${userType}/signup`, {
            method: 'post',
            body: JSON.stringify({ fullname, email, password, phoneNumber, userType }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("userType", JSON.stringify(userType));
            localStorage.setItem("auth", JSON.stringify(result.auth));


            navigate('/expertise');
        }

        // localStorage.setItem("user", JSON.stringify(result.result))
        // localStorage.setItem("token", JSON.stringify(result.auth))


    }

    return (
        <div className="register login">

            <form action="#" className="form">
                <h1 className="text-center">Registration Form</h1>

                <div className="redio">
                    <div>
                        <input type="radio" value="mentor" name="userType" required onClick={(e) => { setUserType(e.target.value) }} />
                        <label htmlFor="mentor">Mentor</label>
                    </div>
                    <div>
                        <input type="radio" value="mentee" name="userType" required onClick={(e) => { setUserType(e.target.value) }} />
                        <label htmlFor="Mentee">Mentee</label>
                    </div>
                </div>

                <div className="form-step form-step-active">
                    <div className="input-group">
                        <label htmlFor="fullname">Full name</label>
                        <input type="text" name="name" placeholder="Enter your full name" id="username"
                            value={fullname} onChange={(e) => setFullname(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" placeholder="email@username.com" id="email"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" name="phoneNumber" placeholder="+919348xxxxxx" id="phoneNumber"
                            value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="********" id="password"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="">
                        <button type="button" className="btn-next width-50 ml-auto" onClick={collectData}>Next</button>
                    </div>
                    <p>Already have a account <a href="/login">Login</a></p>
                </div>
            </form>
        </div>
    )
}
export default SignUp
