import React from 'react'
import Book from "./Book";
import PropTypes from "prop-types";

function BookShelf(props) {
  const { bookList, name, onUpdateBook } = props;
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

BookShelf.propTypes = {
  bookList: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired
}

export default BookShelf;