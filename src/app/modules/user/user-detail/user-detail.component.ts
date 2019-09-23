import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: IUser;
  userEditForm: FormGroup;
  id: string;
  loader: boolean;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder) {

    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.userEditForm = this.formBuilder.group({
      username: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.loadUser();
  }

  private loadUser() {
    if (this.id == null)
      return;
    this.loader = true;
    this.userService.getUser(this.id)
      .subscribe(user => {
        this.user = user;
        this.userEditForm.get('username').setValue(user.username);
        this.userEditForm.get('email').setValue(user.email)
        this.userEditForm.get('firstName').setValue(user.firstName)
        this.userEditForm.get('lastName').setValue(user.lastName)
        this.userEditForm.get('address').setValue(user.address)
        this.userEditForm.get('phone').setValue(user.phone)

      }, () => { }, () => { this.loader = false; });

  }

  saveData(): void {

    this.userService.updateUser(this.user._id, this.userEditForm.value)
      .subscribe(user => { this.user = user },
        () => { }, () => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
