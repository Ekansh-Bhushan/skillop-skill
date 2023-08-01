import React, { useEffect, useState } from "react";
import mainLogo from'./logo.png';
import { useNavigate ,useParams} from 'react-router-dom'
const BASE_URL = "https://skillop.onrender.com";
const style = {
    "display": "unset",
    "overflow": "hidden"
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

const SeeMentor = () => {
    // const [mentorsList, setMentorsList] = useState("");
    const navigate = useNavigate()
    const params = useParams();
    const [mentorDetail, setMentorDetail] = useState(" ");
    const logout = ()=>{
        localStorage.clear();
        navigate('/login');
    }
    const getMentorDetail = async ()=>{
        let result = await fetch(`${BASE_URL}/mentor/${params.id}`);
        result = await result.json();
        setMentorDetail(result);
    }
    const auth = localStorage.getItem('auth');
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user);
    let userType = JSON.parse(localStorage.getItem("userType"));

    const handleBooking = async ()=>{
        console.warn({ mentee: userData._id, mentor: params.id, 
                slot : mentorDetail.availabilityString[["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][(new Date()).getDay()]].split(",")[0],
                day: ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][(new Date()).getDay()]
            });
        let response = await fetch("${BASE_URL}/order", {
            method: 'post',
            body: JSON.stringify({ mentee: userData._id, mentor: params.id, 
                slot : mentorDetail.availabilityString[["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][(new Date()).getDay()]].split(",")[0],
                day: ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][(new Date()).getDay()]
            }),
            headers: {
                'Content-Type': 'application/json',
                "authorization": `sdf ${auth}`
            }
        });
        response = response.json();
        if(response){
            alert("Order Placed We will contact you soon");
        }
        
    }
    // const mentors = [];
    // const getMentors = async () => {
    //     let result = await fetch("${BASE_URL}/getMentors", {
    //         headers: {
    //             "authorization": `sdf ${auth}`
    //         }
    //     });
    //     result = await result.json();
    //     setMentorsList(result);
    // }
    // setTimeout(()=>{
    //     console.log(mentorsList);
    // }, 5000)
    // mentors = fillMentor();
    useEffect(() => {
        if (userType === "mentee") {
            getMentorDetail();
        }
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
            else if (!userData.step2 && userType==="mentor") {
                navigate('/slots');
            } else if (!userData.step3) {
                navigate('/about');
            } 
        } 
        return () => {
            window.document.body.style[key] = '';
        }
    }, [style])
    return (
        <div className="app-container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="app-icon">
                        <img src={mainLogo} alt="Skillop" className="logo" width="180" height="50" />
                    </div>
                </div>
                <ul className="sidebar-list">
                    <li className="sidebar-list-item active">
                        <a href="/" style={{marginLeft:10, fontWeight:500}}>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg> */}
                            {userType==="mentee"?<span>All Mentors</span>:<span>Request</span>}
                        </a>
                    </li>
                    {/* <li className="sidebar-list-item">
                        <a href="#">
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg> -->
                            <!-- <span>Slot</span> -->
                        </a>
                    </li>
                    <li className="sidebar-list-item">
                        <a href="#">
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg> -->
                            <!-- <span>Date</span> -->
                        </a>
                    </li>
                    <li className="sidebar-list-item">
                        <a href="#">
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> -->
                            <!-- <span>Notifications</span> -->
                        </a>
                    </li> */}
                </ul>


                <div className="account-info">
                    <div className="account-info-picture">
                        <img src="https://miro.medium.com/v2/resize:fit:720/1*_ARzR7F_fff_KI14yMKBzw.png" alt="Account" />
                    </div>
                    <div className="account-info-name" onClick={logout}>Logout {user.fullname}</div>
                    {/* <button className="account-info-more"> */}
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg> */}
                    {/* </button> */}
                </div>
            </div>
            <div className="app-content">
                {/* <!-- <div className="app-content-header">
                    <h1 className="app-content-headerText">sdf</h1>
                    <button className="mode-switch" title="Switch Theme">
                        <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24">
                            <defs></defs>
                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                        </svg>
                    </button>
                    <button className="app-content-headerButton">Add Product</button>
                </div> --> */}

                <nav className="main-nav">
                    {/* <!-- <img src="img/logo.png" alt="Skillop" className="logo"> --> */}

                    <ul className="main-menu">
                        <li><a href="/">Profile</a></li>
                        <li><a href="/">Message</a></li>
                        {userType==="mentor"?<li><a href="/">Wallet</a></li>:""}
                        <li><a href="/">About</a></li>
                        <li><a href="/">Contact</a></li>
                        <li><a href="/">Help</a></li>
                    </ul>

                    <ul className="right-menu">
                        <li>
                            <a href="/">
                                <i className="fas fa-search"></i>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <i className="fas fa-shopping-cart"></i>
                            </a>
                        </li>
                    </ul>
                </nav>


                <div className="app-content-actions">
                    <input className="search-bar" placeholder="Search..." type="text" />
                    <div className="app-content-actions-wrapper">
                        <div className="filter-button-wrapper">
                            <button className="action-button filter jsFilter"><span>Filter</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg></button>
                            <div className="filter-menu">
                                <label>Category</label>
                                <select>
                                    <option>All Categories</option>
                                    <option>fgdhd</option>                     <option>Dgfdgf</option>
                                    <option>gfdgfd</option>
                                    <option>fdfgd</option>
                                </select>
                                <label>Status</label>
                                <select>
                                    <option>All Status</option>
                                    <option>fggfddf</option>
                                    <option>Ddfggd</option>
                                </select>
                                <div className="filter-menu-buttons">
                                    <button className="filter-button reset">
                                        Reset
                                    </button>
                                    <button className="filter-button apply">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <button className="action-button list active" title="List View">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                        </button>
                        <button className="action-button grid" title="Grid View">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                        </button> */}
                    </div>
                </div>



                <div className={userType === "mentee" ? "products-area-wrapper tableView" : "products-area-wrapper tableView"}>
                    <div className="products-header">
                    


                    </div>
                        <ul>
                    <li>Mentor Name: {mentorDetail.fullname}</li><br/>
                    <li>Email: {mentorDetail.email}</li><br/>
                    <li>Phone Number: {mentorDetail.phoneNumber}</li><br/>
                    <li>About: {mentorDetail.about}</li><br/>
                    <li>pastExp: {mentorDetail.pastExp}</li><br/>
                    <li>futurePlans: {mentorDetail.futurePlans}</li><br/>
                    <li><button onClick={handleBooking} style={{width:"200px"}}>Book Slot</button></li><br/>
                    
                    </ul>
                </div>
                
            </div>
        </div>
    )
}

export default SeeMentor;
