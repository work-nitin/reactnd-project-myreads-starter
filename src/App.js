import React from 'react';
import './App.css';
//import SearchPage from './SearchPage';
//import MainPage from './MainPage';

import SearchPage from './Components/SearchPage';
import MainPage from './Components/MainPage';

import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
state = {
books: []
}

/* separate function which will be used again
to get all the books using BooksAPI getALL method */
getAllBooks() {
      BooksAPI.getAll().then((books) => {
      this.setState({ books })
      })
  }

componentDidMount()
{
  this.getAllBooks()
}

ChangeShelf = (book,shelf) =>{
  BooksAPI.update(book,shelf).then(() => {
    this.getAllBooks()
  })
}

  render() {
    return (
      <div className="app">
<Route exact path="/" render={() => (
  <MainPage
      books={this.state.books}
      ChangeShelf={this.ChangeShelf}
  />
)} />

<Route path="/search" render={() => (
  <SearchPage
      ChangeShelf={this.ChangeShelf}
      books={this.state.books}
          />
        )} />
      </div>
    )
  }
}
export default BooksApp
