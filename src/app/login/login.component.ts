import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username:string = "";
  password:string = "";

  constructor(private http:HttpClient, private glb:GlobalService){}

  login() {
    this.http.post("http://127.0.0.1:8080", {"azione": "register", "usr": this.username, "psw": this.password}).subscribe(
      res => {
        if (res["esito"] == 1) {
          this.glb.setLogged(true);
          console.log(true);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
