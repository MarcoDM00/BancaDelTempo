import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  cognome:string = "";
  nome:string = "";
  via:string = "";
  cap:string = "";
  citta:string = "";
  telefono:string = "";
  codiciZona:number[] = [];
  zcod:number = 0;
  username:string = "";
  password:string = "";

  constructor(private http:HttpClient){
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=zona").subscribe(
      res => {
        res.forEach(x => {
          this.codiciZona.push(x["ZCod"]);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

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
