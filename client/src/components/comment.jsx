import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CommentCard from './commentCard';
import axios from 'axios';

const Comment = ({ queryId, queryCreatedBy }) => {
    const user = useSelector(state => state.user.user);
    const [posts, setPosts] = useState([]);
    const [file, setFile] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        const FORMDATA = new FormData();
        FORMDATA.append("queryId", queryId);
        FORMDATA.append("photo", file);
        const res = await axios.post("http://localhost:5000/comment/new", FORMDATA);
        if (res.data.success) {
            setFile(null);
            setOpenDialog(false)

        }
        fetchData();
    }
    const fetchData = async () => {
        const res = await axios.get(`http://localhost:5000/comment/${queryId}`);
        // console.log(res.data.data)
        if (res.data.success) {
            setPosts(res.data.data);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <div className='CommentContainer'>
            <main>
                {
                    (user?.id !== queryCreatedBy && user?.username) &&
                    <form onSubmit={handleSubmit}>
                        {!openDialog && <button onClick={() => setOpenDialog(!openDialog)} > Add a Image  </button>}
                        <dialog open={openDialog} >

                            <button onClick={() => setOpenDialog(!openDialog)}>X</button>

                            <input id='productImage' name='productImage' type='file' onChange={(e) => {
                                if (e.target.files) {
                                    setFile(e.target.files[0]);
                                }
                            }} />
                            <button type='submit'>Upload</button>
                        </dialog>
                    </form>
                }
            </main>
            <aside>
                {/* fetch all commentcards */}
                <div className='card-grid'>
                    {
                        posts.map((item, index) => (
                            <CommentCard key={index} queryId={queryId} showAccepted={user?.id === queryCreatedBy ? true : false} createdBy={item?.createdBy?._id} image={`../images/${item?.productImage}`} createdByName={item?.createdBy?.username} />
                        ))
                    }


                </div>
            </aside>
        </div>
    )
}

export default Comment