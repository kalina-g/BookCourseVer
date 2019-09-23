import { Component, OnInit } from '@angular/core';
import { ReadingListService } from '../services/reading-list.service';
import { UserService } from '../services/user.service';
import { BookService } from '../services/book.service';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/models/book';
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {
  result$:Observable<IBook[]>;

  constructor(
    private bookService:BookService
    ) { }

  ngOnInit() {
    this.getMostAddedBooks();
  }

  getMostAddedBooks(){
    this.result$ = this.bookService.getBooks('?sort={"addedToListTimes":-1}&limit=4');
  }

}
