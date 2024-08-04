import React from 'react'
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
const BackNavbar = ({ path }) => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate(path);
    }
    return (
        <div>
            <HiArrowLeft size={25} style={{
                cursor: "pointer", margin: "1rem 1rem"
            }} onClick={handleBack} />
        </div>
    )
}

export default BackNavbar