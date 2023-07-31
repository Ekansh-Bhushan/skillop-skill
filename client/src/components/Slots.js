import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
const style = {
    "overflow": "scroll"
    // "margin": '0',
    // 'padding': '0',
    // 'height': '100%',
    // 'width': '100%',
    // 'overflow': 'hidden',
    // 'font-family': 'Poppins, sans-serif',
    // 'background-color': 'var(--app-bg)',
    // '-webkit-font-smoothing': 'antialiased',
    // '-moz-osx-font-smoothing': 'grayscale',
    // 'font-family': 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    // 'background': '#fff',
    // 'color': '#000',
    // 'font-size': '15px',
    // 'line-height': '1.5',
}
const Slots = () => {
    const [saturday, setSaturday] = useState("");
    const [sunday, setSunday]           = useState("");
    const [monday, setMonday]           = useState("");
    const [tuesday, setTuesday]         = useState("");
    const [wednesday, setWednesday]     = useState("");
    const [thursday, setThursday]       = useState("");
    const [friday, setFriday]           = useState("");
    const logout = ()=>{
        localStorage.clear();
        navigate('/login');
    }
    let userType = JSON.parse(localStorage.getItem("userType"));

    const navigate = useNavigate();
    useEffect(() => {
        for (var key in style) {
            window.document.body.style[key] = style[key];
        }
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
        return () => {
            window.document.body.style[key] = '';
        }
    },[])

    const collectData = async () => {
        // if((!email)||(!password)||(!fullname)||(!userType)) return;
        console.warn(saturday, sunday, monday, tuesday, wednesday, thursday, friday);

        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        const email = user.email;
        let auth = JSON.parse(localStorage.getItem("auth"));

        

        let result = await fetch("http://localhost:4000/mentor/update/slots", {
            method: 'post',
            body: JSON.stringify({ email, userType, availabilityString:{
                saturday, sunday, monday, tuesday, wednesday, thursday, friday
            } }),
            headers: {
                'Content-Type': 'application/json',
                "authorization": `sdf ${auth}`
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.result === 'Invalid Token'){
            alert("Session Ended");
            logout();

            return;
        }
        let step2Complition = await fetch("http://localhost:4000/mentor/update/step2", {
            method: 'post',
            body: JSON.stringify({ email, userType }),
            headers: {
                'Content-Type': 'application/json',
                "authorization": `sdf ${auth}`
            }
        });
        step2Complition = await step2Complition.json();
        console.warn(step2Complition);


        if(step2Complition.acknowledged){
            user.step2 = true;
            localStorage.setItem("user", JSON.stringify(user));
            
        }
        // localStorage.setItem("token", JSON.stringify(result.auth))

        navigate('/about')
    }

    return (
        <div className="register">

<form action="#" className="form">
        <h1 className="text-center">Registration Form</h1>

        <div className="progressbar">
            <div className="progress" id="progress"></div>

            <div className="progress-step progress-step-active" data-title="Intro"></div>
            <div className="progress-step progress-step-active" data-title="Expertise"></div>
            <div className="progress-step progress-step-active" data-title="Slots"></div>
            <div className="progress-step " data-title="Contact"></div>
        </div>

        <div className="form-step form-step-active">
            <div className="checkbox">
                <label htmlFor="saturday">Saturday</label>
                <input type="text" name="saturday" placeholder="09:00-10:00,17:00-19:00,15:00-16:00"
                    value={saturday} onChange={(e) => setSaturday(e.target.value)}/>

            </div>
            <div className="checkbox">
                <label htmlFor="sunday">Sunday</label>
                <input type="text" name="sunday" placeholder="09:00-10:00,17:00-19:00"
                    value={sunday} onChange={(e) => setSunday(e.target.value)}/>

            </div>
            <div className="checkbox">
                <label htmlFor="monday">Monday</label>
                <input type="text" name="monday" placeholder="07:30-09:30"
                    value={monday} onChange={(e) => setMonday(e.target.value)}/>

            </div>
            <div className="checkbox">
                <label htmlFor="tuesday">Tuesday</label>
                <input type="text" name="tuesday" placeholder="07:30-09:30"
                    value={tuesday} onChange={(e) => setTuesday(e.target.value)}/>

            </div>
            <div className="checkbox">
                <label htmlFor="wednesday">Wednesday</label>
                <input type="text" name="wednesday" placeholder="07:30-09:30"
                    value={wednesday} onChange={(e) => setWednesday(e.target.value)}/>

            </div>
            <div className="checkbox">
                <label htmlFor="thursday">Thursday</label>
                <input type="text" name="thursday" placeholder="07:30-09:30"
                    value={thursday} onChange={(e) => setThursday(e.target.value)}/>

            </div>
            <div className="checkbox">
                <label htmlFor="friday">Friday</label>
                <input type="text" name="friday" placeholder="07:30-09:30"
                    value={friday} onChange={(e) => setFriday(e.target.value)}/>

            </div>
            <br/>
            <div className="">
                <button type="button" className="btn-next width-50 ml-auto" onClick={collectData}>Next</button>
            </div>
        </div>
    </form>
        </div>
    )
}
export default Slots;