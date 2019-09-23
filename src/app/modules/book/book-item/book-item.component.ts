import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBook } from '../../../models/book';

import { ReadingListService } from 'src/app/core/services/reading-list.service';
import { IBookInList } from '../../../models/book-in-list';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
  isSupeArdmin: boolean;
  userId: string;
  bookData: IBookInList = {} as any;
  addToReadingListMsg: string = 'Add';
  btnDisable: boolean;

  @Input()
  book: IBook;

  @Output() viewDetailsEvent: EventEmitter<string> = new EventEmitter<string>();

  @Output() deleteBookEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private readingListService: ReadingListService,
    private bookService: BookService) { }

  ngOnInit() {
    this.isSupeArdmin = localStorage.getItem('is_admin') == '1';
    this.userId = localStorage.getItem('_id');
  }

  viewDetailsClick() {
    this.viewDetailsEvent.emit(this.book._id);
  }

  deleteBook() {
    this.deleteBookEvent.emit(this.book._id);
  }

  addToUserList(book) {
    this.book.addedToListTimes += 1;

    this.addToReadingListMsg = 'Added';
    this.btnDisable = true;
    this.bookData.userId = this.userId;
    this.bookData.bookTitle = book.title;
    this.bookData.bookImgSrc = book.imgSrc;
    this.bookData.bookDescription = book.description;
    this.bookData.bookAuthor = book.author;
    this.bookData.isRead = false;

    this.readingListService.addBook(this.bookData)
      .subscribe(value => this.bookData = value);

    this.bookService.updateBook(this.book._id, this.book).subscribe(value => this.book = value);


  }


}
