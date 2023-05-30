import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username:string = "";
  password:string = "";

  constructor(private http:HttpClient){}

  register() {
    this.http.post("http://127.0.0.1:8080", {"azione": "register", "usr": this.username, "psw": this.password}).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

}
