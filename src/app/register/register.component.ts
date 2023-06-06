import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GestoreService } from '../gestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public gestore:GestoreService){}
}
