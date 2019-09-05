import React, { Component } from "react";

class Book extends Component {
  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks !== undefined && book.imageLinks.smallThumbnail}")`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf !== undefined ? book.shelf : "none"}
              onChange={e => {
                this.props.onUpdateBook(book, e.target.value);
              }}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors !== undefined &&
            book.authors.map(author => <div key={author}>{author}</div>)}
        </div>
      </div>
    );
  }
}

export default Book;
