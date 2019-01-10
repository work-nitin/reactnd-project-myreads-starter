import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
//import { Route } from 'react-router-dom';
import { Route } from 'react-router-dom';
import BookPages from './components/BookPages';
import SearchPage from './components/SearchPage';


class BooksApp extends React.Component {
  render() {
    return (
      <div>
              <Route exact path="/" component={ BookPages } />
              <Route exact path="/search" component={ SearchPage } />
            </div>
          );
        }
      }
      export default BooksApp
