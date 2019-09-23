import { Component, OnInit } from '@angular/core';
import { IUser } from '../../user/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { IBook } from '../../../models/book';
import { BookService } from 'src/app/core/services/book.service';
import { Location } from '@angular/common';
import { FileHandlingService } from 'src/app/core/services/file-handling.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  book: IBook;
  originalBook: IBook;
  bookEditForm: FormGroup;
  id: string;
  loader: boolean;

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.bookEditForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      imgSrc: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(120)]]

    });
    this.loadorCreateBook();
  }

  private loadorCreateBook() {
    if (this.id == null) {

    } else {
      this.loader = true;

      this.bookService.getBook(this.id)
        .subscribe(book => {
          this.book = book;
          this.bookEditForm.get('title').setValue(book.title);
          this.bookEditForm.get('author').setValue(book.author)
          this.bookEditForm.get('description').setValue(book.description),
            this.bookEditForm.get('imgSrc').setValue(book.imgSrc)
        }, () => { }, () => { this.loader = false });
    }
  }

  saveData(): void {

    if (this.book != null) {
      this.bookService.updateBook(this.book._id, this.bookEditForm.value)
        .subscribe(book => { this.book = book },
          () => { }, () => this.goBack());
    }
    else {
      let newBook: IBook = this.bookEditForm.value;
      newBook.addedToListTimes = 0;
      this.bookService.addBook(newBook)
        .subscribe(book => { this.book = book },
          () => { }, () => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

}
