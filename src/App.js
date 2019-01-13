import React from 'react';
import './App.css';
import SearchPage from './SearchPage';
import MainPage from './MainPage';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
state = {
books: []
}
componentDidMount()
{
  BooksAPI.getAll().then((books) =>{
    this.setState({books: books})
})
}

moveShelf = (book,shelf) =>{
  BooksAPI.update(book,shelf);
}
  render() {
    return (
      <div className="app">
<Route exact path="/" render={() => (
  <MainPage
      books={this.state.books}
      moveShelf={this.moveShelf}
  />
)} />

<Route path="/search" render={() => (
  <SearchPage
      moveShelf={this.moveShelf}
      books={this.state.books}
          />
        )} />
      </div>
    )
  }
}
export default BooksApp
