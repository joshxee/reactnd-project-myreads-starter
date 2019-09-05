import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";


class Search extends Component {
  state = {
    query: "",
    queriedBooks: []
  };

  updateQuery = query => {
    this.setState(() => ({
      query: query
    }));
    this.debounce(this.getSearchBooks(query), 250);
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

  // Debounce function from Kfir Zuberi
  // https://medium.com/walkme-engineering/debounce-and-throttle-in-real-life-scenarios-1cc7e2e38c68
  debounce(func, interval) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, interval || 200);
    };
  }

  render() {
    const { query, queriedBooks } = this.state;
    const { onUpdateBook } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {queriedBooks !== undefined &&
              queriedBooks.map(book => (
                <li key={book.id}>
                  <Book book={book} onUpdateBook={(book, shelf) => {
                    onUpdateBook(book, shelf);
                  }} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
