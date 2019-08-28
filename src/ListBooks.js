import React, { Component } from 'react'
import BookShelf from './BookShelf'

class ListBooks extends Component {
    render() {
      const { fullBooksList } = this.props
      const currentlyReadingList = fullBooksList.filter((b) => (
        b.shelf === 'currentlyReading'
      ))
      const wantToReadList = fullBooksList.filter((b) => (
        b.shelf === 'wantToRead'
      ))
      const readList = fullBooksList.filter((b) => (
        b.shelf === 'read'
      ))

        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf 
                  bookList={currentlyReadingList}
                  name='Currently Reading'
                />
                <BookShelf 
                  bookList={wantToReadList}
                  name='Want to Read'
                />
                <BookShelf 
                  bookList={readList}
                  name='Read'
                />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )
    }
}

export default ListBooks