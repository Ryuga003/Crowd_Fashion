import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ image, title, id }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/query/${id}`)} className="card">
            <img src={image} alt={title} className="card__image" />
            <h3 className="card__title">{title}</h3>
        </div>
    );
};

export default Card;
