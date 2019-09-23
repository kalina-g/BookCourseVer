import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBook } from '../../../models/book';
import { BookService } from 'src/app/core/services/book.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReadingListService } from 'src/app/core/services/reading-list.service';
import { IBookInList } from '../../../models/book-in-list';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class BookListComponent implements OnInit, OnDestroy {

  books: IBook[];
  books$: Observable<IBook[]>;
  sid: string;
  isSupeArdmin: boolean = localStorage.getItem('is_admin') == '1';
  sb: Subscription;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.displayBooks()
  }

  ngOnDestroy(): void {
    if (this.sb != null) {
      this.sb.unsubscribe();
    }
  }

  displayBooks() {
    this.books$ = this.bookService.getBooks();
  }

  deleteBook(id: string) {
    this.sb = this.bookService.deleteBook(id).subscribe(
      () => this.books$ = this.books$.pipe(map(result => result.filter(p => p._id != id)))
    );
  }

  fromChild(event) {
    this.sid = event;
  }

}

