import React, { useEffect, useState } from 'react'

const Banner = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(slideInterval);
    }, [images.length]);

    return (
        <div className="banner">
            <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {images.map((image, index) => (
                    <div key={index} className="slide">
                        <img src={image} alt={`Slide ${index}`} />
                    </div>
                ))}
            </div>
            <div className="indicators">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    )
}

export default Banner