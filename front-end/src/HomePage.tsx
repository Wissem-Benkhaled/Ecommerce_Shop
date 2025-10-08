import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './Authentification Space/AuthPage';
import ClientPage from './Client Space/ClientPage';
import AdminPage from './Admin Space/AdminPage/AdminPage';
import { useEffect, useState } from 'react';


export default function HomeContent() {
    const userInfo = localStorage.getItem("User");
    
    const AddCountInfo = localStorage.getItem("Activate");
    const [isActive, setIsActive] = useState(AddCountInfo ? true : false);

     useEffect(() => {
        console.log("isActive a changé :", isActive);
        // <Navigate to="/" />
    }, [isActive]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthPage isActive={isActive} setIsActive={setIsActive}/>} />
                <Route path="/client" element={userInfo != "Admin" ? <ClientPage /> : <Navigate to="/" />} />
                <Route path="/admin/*" element={userInfo === "Admin" ? <AdminPage /> : <Navigate to="/" />} />
            </Routes>
        </BrowserRouter>

    );
}


