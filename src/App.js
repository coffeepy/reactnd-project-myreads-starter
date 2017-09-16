import React from 'react'
import * as BooksAPI from './BooksAPI'
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
    // remove this, ADD in React Router
    showSearchPage: false
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
  render() {
    // i dont want to pass the books along, just the bookshelve value names
    // and vebose names
    const bshelves_names = this.state.bshelves.map( (bshelf)=>
      bshelf = [bshelf.shelfName, bshelf.shelfNameVerbose]
    )
    return (
      <div className="app">
         {/*  NAV like header */}
         {
           (!this.state.showSearchPage) ?
              <div className="list-books">
                <div className="list-books-title">
                  <h1>Readem</h1>
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
                  <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
              </div>
          :
            <SearchContacts
              goBack={()=> {this.setState({showSearchPage: false}); this.getBooks()} }
              bshelves_names={bshelves_names}
            />
         }
      </div>
    )
  }
}

export default BooksApp
