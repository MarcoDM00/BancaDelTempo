import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username:string = "";
  password:string = "";

  constructor(private http:HttpClient, private router: Router){}

  login() {
    this.http.post("http://127.0.0.1:8080", {"azione": "login", "usr": this.username, "psw": this.password}).subscribe(
      res => {
        if (res["esito"] == 1) {
          this.router.navigate(["home"]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
