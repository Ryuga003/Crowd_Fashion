import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice"
import BackNavbar from "../components/backNavbar";
axios.defaults.withCredentials = true;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, setLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value,
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();



        if (!login) {
            // registering the user 
            await axios.post("http://localhost:5000/user/register", formData);
        }

        // logging In 
        const res = await axios.post("http://localhost:5000/user/login", {
            email: formData.email,
            password: formData.password,
        })
        if (res.data.success) {
            // storing the current user 
            const response = await axios.get("http://localhost:5000/user/me",
                { withCredentials: true }
            );
            if (response.data.success) {
                const user = response.data.data;
                dispatch(setUser({
                    id: user._id,
                    username: user.username,
                    email: user.email
                }))
                // localStorage.setItem("id", JSON.stringify(user?._id));
                // localStorage.setItem("email", JSON.stringify(user?.email));
                // localStorage.setItem("username", JSON.stringify(user?.username));
            }
            navigate("/")
        }


    }
    return (
        <>
            <BackNavbar path={"/"} />
            <div className="LoginContainer">

                <img src="https://logowik.com/content/uploads/images/woman-and-man-silhouette9062.logowik.com.webp" />

                <form onSubmit={handleSubmit}>
                    {
                        !login && <>
                            <div>
                                <label htmlFor="username">Name</label>
                                <input id="username" placeholder="username" value={formData.username} name="username" onChange={handleChange} />
                            </div></>
                    }
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" placeholder="email" value={formData.email} name="email" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" placeholder="password" value={formData.password} name="password" onChange={handleChange} />
                    </div>
                    <p onClick={() => setLogin(!login)}>{login === true ? "Don't have an account ? Register" : "Already have an account ?Login"}</p>
                    <button>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login