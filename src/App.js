import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import BookShelf from './BookShelf.js'
import './App.css'
import SearchContacts from './SearchContacts.js'

class BooksApp extends React.Component {
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
    BooksAPI.getAll().then( (books)=> {
      this.setState( (state)=> {
        state.bshelves.map( (bshelf)=> {
          bshelf.books = []
          books.filter( (book)=> {
            if (bshelf.shelfName === book.shelf && bshelf.books.push(book)){}
          })
        })
      })
    })
  }
  onShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then( () =>
      this.getBooks()
    )
  }
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
                    <BookShelf
                      bshelves_names={bshelves_names}
                      bshelf={bshelf}
                      onShelfChange={this.onShelfChange}
                      key={idx}
                    />
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
