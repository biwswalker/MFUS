import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { AcUser } from '../../models/ac-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../pages.component.css']
})
export class LoginComponent implements OnInit {

  group: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })
  failReson = ''
  logedinFalse = false;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onLogingIn() {
    if (this.group.valid) {
      const username = this.group.value.username;
      const password = this.group.value.password;
      let user = new AcUser();
      user.user_id = username;
      user.password = password;
      this.auth.login(user)
        .then((user) => {
          this.logedinFalse = false;
          localStorage.setItem('token', user.auth_token);
          this.router.navigateByUrl('/status');
        })
        .catch((err) => {
          this.logedinFalse = true;
          this.failReson = 'เกิดข้อผิดพลาด'
          console.log(err);
        });
    }
  }
}
