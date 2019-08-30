import React, { Component } from "react";
import Book from "./Book";
import PropTypes from 'prop-types'

class BookShelf extends Component {
  static propTypes = {
    bookList: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    value: ""
  };

  render() {
    const { bookList, name, onUpdateBook } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {bookList.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBook={(book, shelf) => {
                    onUpdateBook(book, shelf);
                  }}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
