import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CommentCard = ({ image, showAccepted, createdBy, queryId, createdByName }) => {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    const handleAccept = async () => {
        // sending confirmation message of acceptance ...
        const response = await axios.post("http://localhost:5000/message/new", {
            senderId: user?.id,
            receiverId: createdBy,
            message: `Hi There , ${user?.username} this side . Thank You for response and help. `

        });

        const res = await axios.delete(`http://localhost:5000/query/${queryId}`);
        if (res.data.success) {
            navigate("/")
        }

    }
    return (
        <div className="card">
            {/* {createdBy === user?.id && <button>X</button>} */}
            <img src={image} alt="" className="card__image" />
            {showAccepted && <div>
                <button onClick={handleAccept}>Accept</button>
                <button style={{ backgroundColor: "blue" }} onClick={() => navigate('/chat')}>Message to {createdByName}</button>
            </div>}
        </div>
    )
}

export default CommentCard