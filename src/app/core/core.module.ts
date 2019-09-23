import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { HomeComponent } from './home/home.component';
import { AppErrorInterceptor } from './interceptors/app-error.interceptor';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    HttpClientModule,FormsModule, ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    NavigationComponent,
    NgbModule,
    HttpClientModule,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppErrorInterceptor,
      multi:true
    }
  ]
})
export class CoreModule { }
