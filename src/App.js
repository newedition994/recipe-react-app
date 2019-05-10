import React, { Component } from 'react';
import './App.css';

import Recipe from './Recipe';

// call from env instead pasting on the app page
const API_KEY = 'da80a547ee17ae8ee482e96a5f9abbb9';

const API_ID = 'e645cbf6';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      setSearch: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`https://api.edamam.com/search?q=banana&app_id=${API_ID}&app_key=${API_KEY}`)
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
    this.setState({ value: e.target.value })
    // submit problems
  }


  render() {

    const recipes = this.state.recipes

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} className="search-form">
          <input className="search-bar" type="text" value={this.state.setSearch} onChange={this.handleChange} />
          <button className="search-button" type="submit">Search</button>
        </form>
        <div className="recipes">
          {recipes.map(recipe => (
            <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
          ))}
        </div>
      </div>
    )
  }
}

export default App;
