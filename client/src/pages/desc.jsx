import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import Comment from '../components/comment';
import BackNavbar from '../components/backNavbar';
const Desc = () => {
    const { id } = useParams();

    const [data, setData] = useState({});
    const user = useSelector((state) => state.user.user)
    const fetchData = async () => {
        const res = await axios.get(`http://localhost:5000/query/${id}`);
        // console.log(res.data)
        if (res.data.success) {
            setData(res.data.data);
        }

    }
    useEffect(() => {
        fetchData();
    }, [])
    const navigate = useNavigate();
    const handleDelete = async () => {
        const res = await axios.delete(`http://localhost:5000/query/${id}`);
        if (res.data.success) {
            navigate("/")
        }
    }
    return (
        <>
            <BackNavbar path={"/"} />

            <div className='DescContainer'>
                {/* <img src={data.coverImage} /> */}
                <img src={`../public/images/${data.coverImage}`} />
                <h2>{data.title}</h2>
                <div><p>{data.description}</p>
                </div>
                <div style={{ alignSelf: 'flex-end', fontStyle: "italic" }}>
                    <span>-{data?.createdBy?.username}</span>
                    {(user?.id === data?.createdBy?._id) && <button onClick={handleDelete} >Delete</button>}
                </div>
            </div>
            <div>
                <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>Images</h2>
            </div>
            <Comment queryId={id} queryCreatedBy={data?.createdBy?._id} />
        </>
    )
}

export default Desc