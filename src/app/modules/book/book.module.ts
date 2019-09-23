import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookItemComponent } from './book-item/book-item.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookPreviewComponent } from './book-preview/book-preview.component';
import { ReadingListComponent } from './reading-list/reading-list.component';

@NgModule({
  declarations: [BookItemComponent, BookDetailComponent, BookListComponent, BookPreviewComponent, ReadingListComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule
  ]
})
export class BookModule { }



