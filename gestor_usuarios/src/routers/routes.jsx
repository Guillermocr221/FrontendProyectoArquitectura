import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Principal } from "../pages/Home/Principal";
import { Register } from "../pages/register/register";



export function MyRoutes() {
    return(
        <BrowserRouter>
        <Routes>
           
            <Route path="/" element={<Principal/>} />
            <Route path="/register" element={<Register/>} />
            
        </Routes>
        </BrowserRouter>
    )
}
