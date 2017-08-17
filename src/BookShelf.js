import React from 'react'
import BookGrid from './BookGrid.js'

class BookShelf extends React.Component {
  render() {
    const { bshelf } = this.props
    // render bookshelf
    return  (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{bshelf.shelfNameVerbose}</h2>
          <div className="bookshelf-books">
            <BookGrid />
          </div>
        </div>
      )
  }
}

export default BookShelf
