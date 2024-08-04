import React from 'react'
import NavBar from '../components/navbar'
import { useSelector } from 'react-redux'
import Grid from '../components/grid'
import Banner from '../components/banner'
import Footer from '../components/footer'

const Home = () => {
    const user = useSelector((state) => state.user.user)
    const images = [
        "../images/bannerImage1.png",
        "../images/bannerImage2.png",
        "../images/bannerImage3.png",
    ]

    return (
        <div className='HomeContainer'>
            <NavBar />
            <Banner images={images} />
            <div className="Heading-container">
                <h1 className="animated-heading">Hi, <span className="username">{user?.username ? user.username : "There"}</span></h1>
            </div>
            <div>
                <h2>Queries</h2>
            </div>
            <div className='grid-container'>
                <Grid />
            </div>
            <Footer />
        </div>
    )
}

export default Home