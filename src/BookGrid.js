import React from 'react'
import Book from './Book.js'

class BookGrid extends React.Component {
  render() {
    const { bshelf, onShelfChange, bshelves_names } = this.props
    return(
      <ol className="books-grid">
        {
          bshelf.books.map((book)=>
            <Book
              bshelves_names={bshelves_names}
              book={book}
              onShelfChange={onShelfChange}
            />
          )
        }
      </ol>
    )
  }
}

export default BookGrid
