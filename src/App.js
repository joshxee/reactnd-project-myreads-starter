import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import ListBooks from "./ListBooks";
import { Route } from "react-router-dom";
import Search from "./Search";

class BooksApp extends React.Component {
  state = {
    fullBooksList: []
  };

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll()
    .then(fullBooksList => {
      this.setState(() => {
        return { 
          fullBooksList: fullBooksList
         };
      });
    })
    .catch(err => {
      console.log("Books API cannot be reached");
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(updatedBooks => {
      book["shelf"] = shelf
      this.getAllBooks();
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              onUpdateBook={this.updateBook}
              getSearchBooks={this.getSearchBooks}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              fullBooksList={this.state.fullBooksList}
              listUpdateBook={this.updateBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
