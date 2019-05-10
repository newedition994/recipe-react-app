import React from 'react';
import style from './recipe.module.css';

const Recipe = ({ title, calories, image, ingredients }) => {
    return (
        <div className={style.recipe}>
            <h1>{title}</h1>
            <img className={style.image} src={image} alt="" />
            <p>{calories}</p>
            <ol>
                {ingredients.map(ingredient => (
                    <li key={ingredient.text}>{ingredient.text}</li>
                ))}
            </ol>
        </div>
    );
}

export default Recipe;