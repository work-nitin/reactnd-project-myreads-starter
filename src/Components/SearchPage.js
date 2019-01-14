import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';

/* Add a search page componet extends from main page*/
class SearchPage extends Component {
    state = {
    searchData:'',
    searchedBooks: [] //declare an empty array for searchedBook
  }

/***********************************************************************************************/
  /* Function to update according to the search searchData text and look for the best possible match
  and if searchData doesnt exist , set state an empty array for Books*/
  updatesearchData = (searchData) =>{
    this.setState({
    searchData:searchData
    })
    this.updateSearchedBooks(searchData);
  }

  updateSearchedBooks = (searchData) =>{
    if(searchData)
    {
      BooksAPI.search(searchData).then((searchedBooks) => {
        if (searchedBooks.error){
          this.setState({searchedBooks: []}); // For pass empty error to be passed to map method used in Rendering UI
        } else {
          this.setState({searchedBooks: searchedBooks});
        }
    })
  }

/* if no book matched the searchData set the empty array*/
  else {
      this.setState({searchedBooks: []});
    }
  }
/***********************************************************************************************/
/* render view to UI*/
  render(){
return(
  <div className="search-books">
    <div className="search-books-bar">
    <Link className="close-search" to="/">Close</Link>
      <div className="search-books-input-wrapper">
        <input type="text"
        placeholder="Search by title or author"
          value={this.state.searchData}
          onChange={(event) => this.updatesearchData(event.target.value)}
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
      {
        this.state.searchedBooks.map(searchedBook => {
          let shelf="none";

          this.props.books.map(book => (

            book.id===searchedBook.id ?
            shelf= book.shelf : ''
          ));
return(
  <li key={searchedBook.id}>
  <Book
  book={searchedBook}
  ChangeShelf={this.props.ChangeShelf}
  currentShelf={shelf} // Search page books should be under NONE Category. move the current shelf to shelf var
  />
  </li>
);
})
}
      </ol>
    </div>
  </div>

);

  }

}
  export default SearchPage
