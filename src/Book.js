import React from 'react'

class Book extends React.Component {
  render() {
    const {
      book,
      bshelves_names,
      onShelfChange,
     } = this.props

    return (
        <li>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
              <div className="book-shelf-changer">
                <select onChange={(event)=>{
                    onShelfChange(book, event.target.value)
                  }}>
                  <option value="none" disabled>Move to...</option>
                  {
                    // dynamically add options based on shelf names
                    // also select shelf in the options
                    bshelves_names.map( (bshelfn)=> {
                      const selected = book.shelf === bshelfn[0] ? true : false
                      return <option key={bshelfn[0]} value={bshelfn[0]} defaultValue={selected}>{bshelfn[1]}</option>
                    }
                    )
                  }
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors ? book.authors.join("/") : ""}</div>
          </div>
        </li>
    )
  }
}

export default Book
