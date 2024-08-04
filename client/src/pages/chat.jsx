import axios from "axios"
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import BackNavbar from "../components/backNavbar";
const Chat = () => {
    // message type senderId , receiverId , message 
    const user = useSelector(state => state.user.user);
    const [formData, setFormData] = useState({
        senderId: user?.id,
        receiverId: "",
        message: "",
    })
    const [allUser, setAllUser] = useState([]);
    const [messages, setMessages] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value,
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const res = await axios.post("http://localhost:5000/message/new", formData);
        if (res.data.success) {
            alert("message send successfully");
            fetchMessage();
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/user/all");
            if (res.data.success) {
                setAllUser(res.data.data);
            }
        }
        fetchData();
    }, [])
    useEffect(() => {
        const fetchMessage = async () => {
            const res = await axios.get("http://localhost:5000/message/all");
            if (res.data.success) {
                setMessages(res.data.data);
            }
        }
        fetchMessage();
    }, [])

    return (
        <>
            <BackNavbar path={"/"} />
            <div className='ChatContainer'>
                <main>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='message'>Message</label>
                            <textarea type='text' id='message' name='message' value={formData?.message} onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='receiverId'>To</label>
                            <select id='receiverId' name='receiverId' onChange={handleChange}>
                                {
                                    allUser.map((item, index) => (
                                        <option key={index} value={`${item?._id}`}>{item?.username}</option>
                                    ))}

                            </select>
                        </div>
                        <div className='form-group'>
                            <button type='submit'>Send</button>
                        </div>
                    </form>
                </main>
                <aside>
                    <h2>My Messages</h2>
                    <div className='messageBox'>
                        {
                            messages.map((item, index) => (
                                <div key={index}>
                                    {
                                        (user?.id === item?.receiverId) &&
                                        <div>
                                            <div>
                                                <p>{item?.message}</p>
                                            </div>
                                            <span>-{item?.senderId?.username}</span>
                                        </div>
                                    }
                                    {(user?.id === item?.senderId?._id) &&

                                        <div style={{ backgroundColor: "lightgreen" }}>
                                            <div >
                                                <p>{item?.message}</p>
                                            </div>

                                        </div>

                                    }
                                </div>
                            ))
                        }
                    </div>
                </aside>
            </div >
        </>
    )
}

export default Chat