import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  errors: any = {
    username: '',
    name: '',
    password: ''
  };
  dupError: any;

  user = {
    username: "",
    name: "",
    password: ""
  };

  constructor(
    private _httpService: HttpService,
    private _router: Router
    ) { }

  ngOnInit() {

  }

  onSubmit() {
    let observable = this._httpService.newUser(this.user)
    observable.subscribe(data => {
      if (data['dupError']) {
        this.dupError = data['dupError'];
      }
      if(data['errors']){
        console.log(data['errors']);
        this.errors = data['errors'];
      }
      if (data['success']) {
        console.log(data); 
        this._router.navigate(['/login']);
      }
    });

    this.dupError = null;
    this.errors = null;
    this.user = {
      username: "",
      name: "",
      password: ""
    };

  }

}