import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import DebounceInput from "react-debounce-input";

class Search extends Component {
  state = {
    query: "",
    queriedBooks: []
  };

  updateQuery = query => {
    this.setState(() => ({
      query: query
    }));
    if (query === "") {
      this.setState(() => ({
        queriedBooks: []
      }));
    } else {
      this.getSearchBooks(query);
    }
  };

  clearQuery = () => {
    this.updateQuery("");
  };

  componentDidMount() {
    console.log("mounted");
  }

  getSearchBooks(query) {
    BooksAPI.search(query)
      .then(queriedBooks => {
        if (queriedBooks.error !== undefined) {
          console.log(queriedBooks.error);
          this.setState(() => ({
            queriedBooks: []
          }));
        } else {
          this.setState(() => ({
            queriedBooks
          }));
        }
      })
      .catch(err => {
        console.log("Books API cannot be reached");
      });
  }

  render() {
    const { query, queriedBooks } = this.state;
    const { onUpdateBook, addedBooks } = this.props;

    const addedIds = addedBooks.map(b => b.id)
    const showingBooks = queriedBooks
      .filter(({id}) => !addedIds.includes(id))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              debounceTimeout={500}
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks !== undefined &&
              showingBooks.map(book => (
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

export default Search;
