import React from 'react'
import BookGrid from './BookGrid.js'

class BookShelf extends React.Component {
  render() {
    const { bshelf, onChange } = this.props
    // render bookshelf
    return  (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{bshelf.shelfNameVerbose}</h2>
          <div className="bookshelf-books">
            <BookGrid bshelf={bshelf} onChange={onChange}/>
          </div>
        </div>
      )
  }
}

export default BookShelf
