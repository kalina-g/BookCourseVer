import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { IBook } from '../../../models/book';


@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss']
})
export class BookPreviewComponent implements OnInit {

  isSupeArdmin: boolean;
  id: string;
  book: IBook;

  constructor(private bookService: BookService,
    private route: ActivatedRoute) {
    this.isSupeArdmin = localStorage.getItem('is_admin') == '1';
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadBookPreview()
  }

  private loadBookPreview() {
    if (this.id == null) return;
    this.bookService.getBook(this.id)
      .subscribe(book => {
        this.book = book;
      });

  }

}
