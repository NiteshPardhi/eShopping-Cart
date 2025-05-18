import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.scss']
})
export class MainLoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  loginData: any;

  loginCrediential: any = {
    userName: 'nitesh.pardhi',
    password: 'Nitesh@123',
  };

  constructor(private authService: AuthService, private router: Router) {
    localStorage.setItem('main-loginCrediential', JSON.stringify(this.loginCrediential));
  }

  ngOnInit(): void { }

  submitForm() {
    this.loginData = this.loginForm.value;
    // console.log(this.loginData);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.onMainLogin(this.loginData);

  }

  onSubmit() {
    this.loginData = this.loginForm.value;
    console.log(this.loginData);

    if (!this.loginForm.valid) {
      return;
    }
    this.authService.onMainLogin(this.loginData);
  }


}
