import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors: any = {
    username: '',
    password: ''
  };
    user = {
      username: "",
      password: ""
    }
  logged_in_user: any = []
  constructor(
    private _httpService: HttpService,
    private _router: Router
    ) { }

  ngOnInit() {
  }
  
  LogIn() {
    console.log("component ts", this.user)
    this._httpService.getUserByUsername(this.user)
      .subscribe(data => {
        console.log(data);        
        if(data){
          sessionStorage.setItem('user', data['username']);
          console.log("This is ", data);
          console.log("This is the current user name ", sessionStorage.getItem('user'));
          this._router.navigate(['/home']);
        } else {
          this._router.navigate(['/login']);
        }
      })
  }
}
