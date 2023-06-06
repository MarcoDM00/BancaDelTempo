import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GestoreService } from '../gestore.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public gestore:GestoreService){}  
}
