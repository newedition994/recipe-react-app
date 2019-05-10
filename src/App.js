import React, { Component } from 'react';
import './App.css';

import Recipe from './Recipe';

// call from env instead pasting on the app page
const API_KEY = process.env.REACT_APP_API_KEY

const API_ID = process.env.REACT_APP_API_ID


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      setSearch: "banana"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchRecipes();
  }


  fetchRecipes = () => {
    fetch(`https://api.edamam.com/search?q=${this.state.setSearch}&app_id=${API_ID}&app_key=${API_KEY}`)
      .then(response => response.json())
      .then(data =>
        this.setState({ recipes: data.hits }, () => {
          return { data };
        })
      );
  }

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({ setSearch: value })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.fetchRecipes();
  }


  render() {

    const recipes = this.state.recipes

    console.log(this.state)

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} className="search-form">
          <input className="search-bar" type="text" value={this.state.setSearch} onChange={this.handleChange} />
          <button className="search-button" type="submit">Search</button>
        </form>
        <div className="recipes">
          {recipes.map(recipe => (
            <Recipe key={recipe.recipe.shareAs} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
          ))}
        </div>
      </div>
    )
  }
}

export default App;
