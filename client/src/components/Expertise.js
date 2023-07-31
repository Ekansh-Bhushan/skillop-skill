import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
const BASE_URL = "https://skillop.onrender.com";
const Expertise = () => {
    const [expertise, setExpertise] = useState("");
    const [pastExp, setPastExp] = useState("");
    const [futurePlans, setFuturePlans] = useState("");
    const [about, setAbout] = useState("");
    const navigate = useNavigate();
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    const email = user.email;
    let auth = JSON.parse(localStorage.getItem("auth"));
    let userType = JSON.parse(localStorage.getItem("userType"));
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
    }, []);

    const collectData = async () => {
        console.warn(expertise, pastExp, futurePlans, about);

        if (userType === "mentor") {
            let resultUpdateExpertise = await fetch(`${BASE_URL}/mentor/update/expertise`, {
                method: 'post',
                body: JSON.stringify({ expertise, email, userType }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            resultUpdateExpertise = await resultUpdateExpertise.json();
            console.warn(resultUpdateExpertise);

            let resultUpdatePastExp = await fetch(`${BASE_URL}/mentor/update/pastExp`, {
                method: 'post',
                body: JSON.stringify({ pastExp, email, userType }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            resultUpdatePastExp = await resultUpdatePastExp.json();
            console.warn(resultUpdatePastExp);

            let resultUpdateAbout = await fetch(`${BASE_URL}/mentor/update/about`, {
                method: 'post',
                body: JSON.stringify({ about, email, userType }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            resultUpdateAbout = await resultUpdateAbout.json();
            console.warn(resultUpdateAbout);

            let resultUpdateFuturePlans = await fetch(`${BASE_URL}/mentor/update/futurePlans`, {
                method: 'post',
                body: JSON.stringify({ futurePlans, email, userType }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            resultUpdateFuturePlans = await resultUpdateFuturePlans.json();
            console.warn(resultUpdateFuturePlans);

            let notifyingStep1Completed = await fetch(`${BASE_URL}/mentor/update/step1`, {
                method: 'post',
                body: JSON.stringify({ email, userType }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            notifyingStep1Completed = await notifyingStep1Completed.json();
            console.warn(notifyingStep1Completed);

            if (notifyingStep1Completed.acknowledged) {
                user.step1 = true;
                localStorage.setItem("user", JSON.stringify(user));
            }
        navigate('/slots');

        } else if (userType === "mentee") {
            let resultUpdateExpertise = await fetch(`${BASE_URL}/mentee/update/expertise`, {
                method: 'post',
                body: JSON.stringify({ expertise, email, userType }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            resultUpdateExpertise = await resultUpdateExpertise.json();
            console.warn(resultUpdateExpertise);

            let resultUpdatePastExp = await fetch(`${BASE_URL}/mentee/update/pastExp`, {
                method: 'post',
                body: JSON.stringify({ pastExp, email, userType }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            resultUpdatePastExp = await resultUpdatePastExp.json();
            console.warn(resultUpdatePastExp);

            let resultUpdateAbout = await fetch(`${BASE_URL}/mentee/update/about`, {
                method: 'post',
                body: JSON.stringify({ about, email, userType }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            resultUpdateAbout = await resultUpdateAbout.json();
            console.warn(resultUpdateAbout);

            let resultUpdateFuturePlans = await fetch(`${BASE_URL}/mentee/update/futurePlans`, {
                method: 'post',
                body: JSON.stringify({ futurePlans, email, userType }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            resultUpdateFuturePlans = await resultUpdateFuturePlans.json();
            console.warn(resultUpdateFuturePlans);

            let notifyingStep1Completed = await fetch(`${BASE_URL}/mentee/update/step1`, {
                method: 'post',
                body: JSON.stringify({ email, userType }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `sdf ${auth}`
                }
            });
            notifyingStep1Completed = await notifyingStep1Completed.json();
            console.warn(notifyingStep1Completed);

            if (notifyingStep1Completed.acknowledged) {
                user.step1 = true;
                localStorage.setItem("user", JSON.stringify(user));
            }
            navigate("/about");
        }

        // localStorage.setItem("token", JSON.stringify(result.auth))
        // localStorage.setItem("user", JSON.stringify(result.result))
    }

    return (
        <div className="register">

            <form action="#" className="form">
                <h1 className="text-center">Registration Form</h1>

                <div className="progressbar">
                    <div className="progress" id="progress"></div>

                    <div className="progress-step progress-step-active" data-title="Intro"></div>
                    <div className="progress-step progress-step-active" data-title="Expertise"></div>
                    {userType === "mentor" ? <div className="progress-step " data-title="Slots"></div> : ""}
                    <div className="progress-step" data-title="Contact"></div>
                </div>

                <div className="form-step form-step-active">
                    <div className="input-group">
                        <label htmlFor="fullname">Expertises</label>
                        <input type="text" name="name" placeholder="C, C++, Python, Data Structure" id="username"
                            value={expertise} onChange={(e) => setExpertise(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="about">About</label>
                        <textarea type="text" name="about" placeholder="From Delhi Technical University..." id="pastExp"
                            value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                    </div>

                    <div className="input-group">
                        <label htmlFor="pastExperience">Past Experience</label>
                        <textarea type="text" name="pastExperience" placeholder="Teaching at ABC university ..." id="pastExp"
                            value={pastExp} onChange={(e) => setPastExp(e.target.value)}></textarea>
                    </div>
                    <div className="input-group">
                        <label htmlFor="futurePlans">Future Plans</label>
                        <textarea type="text" name="futurePlans" placeholder="Be best mentor at skillop ..." id="futurePlans"
                            value={futurePlans} onChange={(e) => setFuturePlans(e.target.value)}></textarea>
                    </div>
                    <div className="btns-group">

                        <button type="button" className="btn-next" onClick={collectData}>Next</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Expertise;
