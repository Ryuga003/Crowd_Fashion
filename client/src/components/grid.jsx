import { useEffect, useState } from "react"
import Card from "./card"
import axios from "axios"
const Grid = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/query/all");
            if (res.data.success) {
                setData(res.data.data);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="card-grid">

            {
                data.map((item, index) => (
                    <Card key={index} image={`../images/${item.coverImage}`} title={item.title} id={item._id} />

                ))
            }
        </div>
    )
}

export default Grid