import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
const BASE_URL = "https://skillop.onrender.com";
const About = () => {
    const [linkedinId, setLinkedinId] = useState("");
    const [upiId, setUpiId] = useState("");
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    const email = user.email;
    let auth = JSON.parse(localStorage.getItem("auth"));
    let userType = JSON.parse(localStorage.getItem("userType"));

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
            else if (!userData.step2 && userType === "mentor") {
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
        // if (userType === "mentor" && (!linkedinId || !upiId)) return;
        console.warn(linkedinId, upiId);

        if (userType === "mentor") {
            let updateLinkedinId = await fetch("http://localhost:4000/mentor/update/linkedinId", {
                method: 'post',
                body: JSON.stringify({ email, userType, linkedinId }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            updateLinkedinId = await updateLinkedinId.json();
            console.warn(updateLinkedinId);

            let updateUpiId = await fetch("http://localhost:4000/mentor/update/upiId", {
                method: 'post',
                body: JSON.stringify({ email, userType, upiId }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            updateUpiId = await updateUpiId.json();
            console.warn(updateUpiId);

            let step3Done = await fetch("http://localhost:4000/mentor/update/step3", {
                method: 'post',
                body: JSON.stringify({ email, userType, upiId }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            step3Done = await step3Done.json();
            console.warn(step3Done);

            if (step3Done.acknowledged) {
                user.step3 = true;
                localStorage.setItem("user", JSON.stringify(user))

                navigate('/')
            }
        } else if (userType === "mentee") {
            let updateLinkedinId = await fetch("http://localhost:4000/mentee/update/linkedinId", {
                method: 'post',
                body: JSON.stringify({ email, userType, linkedinId }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            updateLinkedinId = await updateLinkedinId.json();
            console.warn(updateLinkedinId);

            let updateUpiId = await fetch("http://localhost:4000/mentee/update/upiId", {
                method: 'post',
                body: JSON.stringify({ email, userType, upiId }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            updateUpiId = await updateUpiId.json();
            console.warn(updateUpiId);

            let step3Done = await fetch("http://localhost:4000/mentee/update/step3", {
                method: 'post',
                body: JSON.stringify({ email, userType, upiId }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            step3Done = await step3Done.json();
            console.warn(step3Done);

            if (step3Done.acknowledged) {
                user.step3 = true;
                localStorage.setItem("user", JSON.stringify(user))

                navigate('/')
            }
        }

        // localStorage.setItem("token", JSON.stringify(result.auth))


    }

    return (
        <div className="register">

            <form action="#" className="form">
                <h1 className="text-center">Registration Form</h1>

                <div className="progressbar">
                    <div className="progress" id="progress"></div>

                    <div className="progress-step progress-step-active" data-title="Intro"></div>
                    <div className="progress-step progress-step-active" data-title="Expertise"></div>
                    {userType === "mentor" ? <div className="progress-step progress-step-active" data-title="Slots"></div> : ""}
                    <div className="progress-step progress-step-active" data-title="Contact"></div>
                </div>

                <div className="form-step form-step-active">

                    {
                        userType === "mentor" ? <div className="input-group">
                            <label htmlFor="fullname">LinkedIn ID</label>
                            <input type="id" name="name" placeholder="https://www.linkedin.com/in/xyz-5b5162218" id="username"
                                onChange={(e) => { setLinkedinId(e.target.value) }} value={linkedinId} required />
                        </div> : <div className="input-group">
                            <label htmlFor="fullname">LinkedIn ID</label>
                            <input type="id" name="name" placeholder="https://www.linkedin.com/in/xyz-5b5162218" id="username"
                                onChange={(e) => { setLinkedinId(e.target.value) }} value={linkedinId} />
                        </div>
                    }

                    {
                        userType === "mentor" ? <div className="input-group">
                            <label htmlFor="fullname">UPI ID</label>
                            <input type="id" name="name" placeholder="9348xxxxxx@abc" id="username"
                                onChange={(e) => { setUpiId(e.target.value) }} value={upiId} required />
                        </div> : <div className="input-group">
                            <label htmlFor="fullname">UPI ID</label>
                            <input type="id" name="name" placeholder="9348xxxxxx@abc" id="username"
                                onChange={(e) => { setUpiId(e.target.value) }} value={upiId} />
                        </div>
                    }

                </div>
                <div className="submit" id="smt">
                    <button type="button" onClick={collectData}>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default About;
