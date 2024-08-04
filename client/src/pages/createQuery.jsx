import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BackNavbar from '../components/backNavbar';

const CreateQuery = () => {

    const [image, setImage] = useState(null);
    const user = useSelector(state => state.user.user);
    const [formData, setFormData] = useState({
        title: "",
        description: "",

    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value,
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const FORMDATA = new FormData();
        FORMDATA.append("title", formData.title);
        FORMDATA.append("description", formData.description);
        if (image) {
            FORMDATA.append("photo", image);
        }
        FORMDATA.append("createdBy", user?.id);
        console.log(FORMDATA);
        const res = await axios.post("http://localhost:5000/query/new", FORMDATA);
        if (res.data.success) {
            alert("Query Posted Successfully")
            setFormData({
                title: "",
                description: ""
            })
            setImage(null);
        }
    }

    return (
        <>
            <BackNavbar path={"/"} />
            <div className="LoginContainer">

                <img src="https://logowik.com/content/uploads/images/woman-and-man-silhouette9062.logowik.com.webp" />

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input id="title" placeholder="title" value={formData.title} name="title" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea style={{ width: "100%", height: "20vh" }} id="description" placeholder="description" value={formData.description} name="description" onChange={handleChange} />
                    </div>
                    <div>
                        <input type='file' onChange={(e) => {
                            const files = e.target.files;
                            if (files)
                                setImage(files[0]);
                        }} />
                    </div>
                    <button>Create</button>
                </form>
            </div>
        </>
    )
}

export default CreateQuery