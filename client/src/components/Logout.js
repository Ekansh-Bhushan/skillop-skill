import React from "react";
import {
    useNavigate
} from 'react-router-dom';
const Logout = ()=>{


    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = ()=>{
        localStorage.clear();
        navigate('/login');
    }
    
    return <h1>{auth?logout():"First Login"}</h1>
}

export default Logout;