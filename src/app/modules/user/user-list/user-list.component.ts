import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: IUser[];
  loader: boolean;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.displayUsers()
  }

  displayUsers() {
    this.loader = true;
    this.userService.getUsers().subscribe(data => {
      this.users = data;

    }, () => { }, () => { this.loader = false; });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(

      () => this.users = this.users.filter(p => p._id != id)
    );
  }

}
