import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private logged:boolean = false;

  constructor() { }

  setLogged(l:boolean) {
    this.logged = l;
  }

  getLogged() {
    return this.logged;
  }
}
