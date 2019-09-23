import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

//import { AlertService, AuthenticationService } from '@/_services';

@Component({ selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss']})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private loginService: AuthenticationService 
    ) {
        

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {

        this.loginService.login(this.loginForm.value).subscribe(data => {
            
            localStorage.setItem('token',  data['_kmd']['authtoken']);
            localStorage.setItem('_id',  data['_id']);
            localStorage.setItem('username', data['username']);
            localStorage.setItem('is_admin', data['superAdmin']);
            

            this.router.navigate(['']);
        })

        // this.submitted = true;
        // if (this.loginForm.invalid) {
        //     return;
        // }

        // this.loading = true;
    }
}