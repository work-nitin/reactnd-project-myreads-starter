import React from 'react';
import './App.css';
//import SearchPage from './SearchPage';
import MainPage from './MainPage';
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
        <MainPage
        books={this.state.books}
        moveShelf={this.moveShelf}
        />

      </div>
    )
  }
}
export default BooksApp
