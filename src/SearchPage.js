import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';


class SearchPage extends Component {
    state = {
    query:'',
     searchedBooks: []
  }
  updateQuery = (query) =>{
    this.setState({
      query:query
    })

    this.updateSearchedBooks(query);
  }

  updateSearchedBooks = (query) =>{
    if(query)
    {
      BooksAPI.search(query).then((searchedBooks) => {
        if (searchedBooks.error){
          this.setState({searchedBooks: []}); // For pass empty error to be passed to map method used in Rendering UI
        } else {
          this.setState({searchedBooks: searchedBooks});
        }
    })
  }
/* if no book matched the searched query*/
  else {
      this.setState({searchedBooks: []});
    }
  }

  render(){

return(
  <div className="search-books">
    <div className="search-books-bar">
    <Link className="close-search" to="/">Close</Link>

      <div className="search-books-input-wrapper">

        <input type="text" placeholder="Search by title or author"
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
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
  moveShelf={this.props.moveShelf}
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
