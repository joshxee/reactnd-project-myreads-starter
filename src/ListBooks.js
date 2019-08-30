import React, { Component } from "react";
import BookShelf from "./BookShelf";
import PropTypes from "prop-types";

class ListBooks extends Component {
  static propTypes = {
    fullBooksList: PropTypes.array.isRequired,
    listUpdateBook: PropTypes.func.isRequired
  };
  render() {
    const { fullBooksList, listUpdateBook } = this.props;
    const currentlyReadingList = fullBooksList.filter(
      b => b.shelf === "currentlyReading"
    );
    const wantToReadList = fullBooksList.filter(b => b.shelf === "wantToRead");
    const readList = fullBooksList.filter(b => b.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              onUpdateBook={listUpdateBook}
              bookList={currentlyReadingList}
              name="Currently Reading"
            />
            <BookShelf
              onUpdateBook={listUpdateBook}
              bookList={wantToReadList}
              name="Want to Read"
            />
            <BookShelf
              onUpdateBook={listUpdateBook}
              bookList={readList}
              name="Read"
            />
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default ListBooks;
