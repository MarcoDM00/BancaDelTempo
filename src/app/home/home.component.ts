import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GestoreService } from '../gestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public gestore:GestoreService){}
}
