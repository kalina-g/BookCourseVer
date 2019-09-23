import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookPreviewComponent } from './book-preview/book-preview.component';
import { ReadingListComponent } from './reading-list/reading-list.component';


const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: 'edit',
    component: BookDetailComponent
  },
  {
    path: 'edit/:id',
    component: BookDetailComponent
  },
  {
    path: 'preview/:id',
    component: BookPreviewComponent
  },
  {
    path: 'reading-list/:id',
    component: ReadingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
