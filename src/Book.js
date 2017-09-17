import React from 'react'

class Book extends React.Component {
  render() {
    const {
      book,
      bshelves_names,
      onShelfChange,
     } = this.props

    if (book.title === "Android") {

      console.log(book, book.title, book.shelf);
    }
    return (
        <li>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
              <div className="book-shelf-changer">
                <select
                  onChange={ (event) => {
                    onShelfChange(book, event.target.value)
                  }}
                  defaultValue={book.shelf}
                >
                  <option value="none" disabled>Move to...</option>
                  {
                    // dynamically add options based on shelf names
                    bshelves_names.map( (bshelfn)=> {
                      return <option key={bshelfn[0]} value={bshelfn[0]} >{bshelfn[1]}</option>
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
