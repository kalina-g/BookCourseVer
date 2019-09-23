import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements DoCheck{
 
  userId:string;
  userName:string;
  isSuperAdmin:boolean;

  constructor(private router: Router) { 
    
  }

  ngDoCheck():void {
    this.userId = localStorage.getItem('_id');
    this.userName = localStorage.getItem('username');
    this.isSuperAdmin = localStorage.getItem('is_admin') == '1';
  }

  isAuthenticated(){
    return localStorage.getItem('token') !== null;
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('_id');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('userId');

    this.router.navigate(['']);
  }


}
