import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import Book from './Book.js'
class SearchContacts extends React.Component {
  state = {
    query: '',
    results: [],
  }
  render() {
      const { query, results } = this.state
      const onShelfChange = (book, shelf) => {
        BooksAPI.update(book, shelf).then( () =>
          this.setState({query: query})
        )
      }
      const set_shelf = (results) => {
        // unfortunately the search results are just books that dont retain
        // the shelf state after we update, so we have to work around this by checking
        // the current bshelves prop passed in, and see if we can find the book in a shelf
        // loop results
        results.map( (result)=> {
          this.props.bshelves.map( (bshelf)=> {
            // loop through all shelves
            // see if i can filter and find a matched book
            const matched_book = bshelf.books.filter((book)=> book.id === result.id)
            if (matched_book.length) {
              // if so, set this result's shelf so we can know what shelf this book from
              // the search result belongs to
              result.shelf = bshelf.shelfName
            }
          })
          return result
        })
        return results
      }
      const updateQuery = (q)=> {
        // console.log("updateQ", q);
        q ?
        BooksAPI.search(q).then((data)=> {
          // data will be an array or an object if there is an error
          // so we catch the error and default it
          if (data.error == null) {
            return this.setState({query: q, results: set_shelf(data)})
          }
          this.setState({query: q, results: []})
        })
        :
        this.setState({query:q, results: []})
      }
      const search = (event) => {
        // console.log(event.target.value);
        const q = event.target.value
        updateQuery(q)
      }
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={search}
                value={query}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {/* {console.log(results)} */}
              {
                results.map((book)=> {
                  return <Book
                    book={book}
                    bshelves_names={this.props.bshelves_names}
                    onShelfChange={onShelfChange}
                    key={book.id}
                  />
                })
              }
            </ol>
          </div>
        </div>
      )
  }
}

export default SearchContacts
