import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import { Link, Route } from 'react-router-dom'
import BookShelf from './BookShelf.js'
import './App.css'
import SearchContacts from './SearchContacts.js'
// This is the main Component exported below
class BooksApp extends React.Component {
  //  state.bshelves is an array of data for each shelf
  state = {
    bshelves: [
      {
        shelfNameVerbose: "Currently Reading",
        shelfName: "currentlyReading",
        books: [],
      },
      {
        shelfNameVerbose: "Want To Read",
        shelfName: "wantToRead",
        books: [],
      },
      {
        shelfNameVerbose: "Read",
        shelfName: "read",
        books: [],
      }
    ],
  }
  getBooks = () => {
    /**
       get all books(objects) using BooksAPI, insert books into the state.bshelves
      if it has a shelf and it matches the shelfName
    */
    BooksAPI.getAll().then( (books)=> {
      this.setState( (state)=> {
        state.bshelves.map( (bshelf)=> {
          bshelf.books = []
          books.filter( (book)=> {
            bshelf.shelfName === book.shelf && bshelf.books.push(book)
          })
        })
      })
    })
  }
  onShelfChange = (book, shelf) => {
    /**
      This function is passed to the Book component, so when shelf changes on the
      dropdown, it will update the book on the backend and then
      get all the books again
    */
    BooksAPI.update(book, shelf).then( () =>
      this.getBooks()
    )
  };
  componentDidMount() {
    this.getBooks()
  }
  componentDidUpdate() {
    this.getBooks()
  }
  render() {
    // i dont want to pass the books along, just the bookshelve value names
    // and vebose names
    const bshelves_names = this.state.bshelves.map( (bshelf)=>
      bshelf = [bshelf.shelfName, bshelf.shelfNameVerbose]
    )
    return (
      <div className="app">
        <Route exact path="/" render={()=> (
          <div className="list-books">
            <div className="list-books-title">
              <h1>Kendull</h1>
            </div>
            <div className="list-books-content">
              <div>
                {
                  this.state.bshelves.map( (bshelf, idx) =>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">{bshelf.shelfNameVerbose}</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {
                            bshelf.books.map((book)=>
                              <Book
                                bshelves_names={bshelves_names}
                                book={book}
                                onShelfChange={this.onShelfChange}
                                key={book.id}
                              />
                            )
                          }
                        </ol>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" >Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={()=> (
          <SearchContacts
            bshelves_names={bshelves_names}
            bshelves = {this.state.bshelves}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
