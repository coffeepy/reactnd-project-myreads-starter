import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf.js'
import './App.css'
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
    // remove this, ADD in React Router
    showSearchPage: false
  }
  getBooks = () => {
    BooksAPI.getAll().then( (books)=> {
      this.setState( (state)=> {
        books.map( (book)=> {
          state.bshelves.filter( (bshelf)=> {
            if (bshelf.shelfName === book.shelf && book.publisher !== "Simon and Schuster" &&
            bshelf.books.push(book)){}
          })
        })
      })
    })
  }
  componentDidMount() {
    this.getBooks()
  }
  render() {
    return (
      <div className="app">
         {/*  NAV like header */}
          <div className="list-books">
            <div className="list-books-title">
              <h1>Readem</h1>
            </div>
            <div className="list-books-content">
              <div>
                {
                  this.state.bshelves.map( (bshelf) =>
                    <BookShelf bshelf={bshelf} onChange={this.getBooks}/>
                  )
                }
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
      </div>
    )
  }
}

export default BooksApp
