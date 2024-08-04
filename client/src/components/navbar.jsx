import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { setUser } from "../store/userSlice"
import { BsFillChatLeftDotsFill } from "react-icons/bs";
const NavBar = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const navigate = useNavigate();
    const handleLogout = async () => {
        const res = await axios.get("http://localhost:5000/user/logout");
        if (res.data.success) {
            dispatch(setUser({
                id: "",
                username: "",
                email: "",

            }))
            navigate("/login")
        }
    }
    return (
        <nav className="navbar">
            <main>
                <h2>CROWD FASHION</h2>
            </main>
            <aside>
                {
                    user?.username ? <>
                        <BsFillChatLeftDotsFill size={30} color='green' onClick={() => navigate("/chat")} style={{ backgroundColor: "transparent", cursor: "pointer" }} />
                        <button style={{ backgroundColor: "purple" }} onClick={() => navigate("/create")} >Create</button>
                        <button onClick={handleLogout}>Logout</button>
                    </> :
                        <button onClick={() => navigate("/login")}>Login</button>
                }

            </aside>
        </nav>
    );
};
export default NavBar