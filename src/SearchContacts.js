import React from 'react'
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
      const updateQuery = (q)=> {
        // console.log("updateQ", q);
        q ?
        BooksAPI.search(q).then((data)=> {
          // data will be an array or an object if there is an error
          // so we catch the error and default it
          if (data.error == null) {
            return this.setState({query: q, results: data})
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
            <a className="close-search" onClick={this.props.goBack}>Close</a>
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
              {console.log(results)}
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
