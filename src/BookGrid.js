import React from 'react'
import Book from './Book.js'

class BookGrid extends React.Component {
  render() {
    const { bshelf, onChange } = this.props
    return(
      <ol className="books-grid">
        {
          bshelf.books.map((book)=>
            <Book book={book} onChange={onChange} />
          )
        }
      </ol>
    )
  }
}

export default BookGrid
