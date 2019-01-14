import React from 'react';
import { Route } from 'react-router-dom';
import Switch from 'react-router-dom/Switch'

import './App.css';
import SearchPage from './Components/SearchPage';
import MainPage from './Components/MainPage';
import * as BooksAPI from './BooksAPI';


class BooksApp extends React.Component {
	state = {
		books: []
	}
	/* separate function which will be used again
	to get all the books using BooksAPI getALL method */
	getAllBooks() {
		BooksAPI.getAll().then( ( books ) => {
			this.setState( {
				books
			} )
		} )
	}
	componentDidMount() {
		this.getAllBooks()
	}
	ChangeShelf = ( book, shelf ) => {
		BooksAPI.update( book, shelf ).then( () => {
			this.getAllBooks()
		} )
	}

	render() {
		return (
			< div className = "app" >
		{/* implemented Switch as per	https://tylermcginnis.com/react-router-handling-404-pages/ */}
		<Switch>

		/* render Main page at root to the UI */
		< Route exact path = "/"
			render = { () => (
				< MainPage books = {
				this.state.books
					}
					ChangeShelf = { this.ChangeShelf }
					/> )
			}
			/>

/* render Search page to the UI */
	< Route path = "/search"
	render = {() => (
		< SearchPage
		books = { this.state.books }
		ChangeShelf = { this.ChangeShelf}
		/>
		)
	}
	/>

/* If page doesnt exist, throw an error to the user that Page doesn't exist */
			<Route render={() => (
                                <div>
                                    <h1>404 Error : Page not found</h1>
                                    <p>Page doesn't exist.</p>
                                </div>
															)} />
			</Switch>

			< /div>
		)
	}
}
export default BooksApp
