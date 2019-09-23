import { Component, OnInit } from '@angular/core';
import { ReadingListService } from 'src/app/core/services/reading-list.service';
import { IBookInList } from '../../../models/book-in-list';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit {

  books$: Observable<IBookInList[]>;
  id = localStorage.getItem('_id');

  constructor(private readingListService: ReadingListService) {
  }

  ngOnInit() {
    this.loadList()
  }

  loadList() {
    this.books$ = this.readingListService.getBooks(this.id);
  }

  toggleRead(book) {
    book.isRead = true;
    this.readingListService.updateBook(book._id, book).subscribe();
  }

  remove(id) {
    this.readingListService.deleteFromReadingList(id)
      .subscribe(
        () => this.books$ = this.books$.pipe(map(result => result.filter(p => p._id != id)))
      );
  }



}
