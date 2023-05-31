import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  hideCategoria:boolean = true;
  categorie:{CCod:number, CDescr:string}[] = [];
  hideQueryD:boolean = true;
  queryD:{PDescr:string, OreErogate:number}[] = [];
  hideSocio:boolean = true;
  socio:{SCod:number, Cognome:string, nome:string, via:string, cap:string, citta:string, telefono:string, ZCod:number}[] = [];
  hideOfferta:boolean = true;
  offerta:{SCod:number, PCod:number}[] = [];
  hideQueryC:boolean = true;
  queryC:{Cognome:string, Nome:string, Via:string, Citta:string, Telefono:string}[] = [];
  hideZone:boolean = true;
  zone:{ZCod:number, ZDescr:string, ZMappa:string}[] = [];
  hidePrestazione:boolean = true;
  prestazione:{PCod:number, PDescr:string, CCod:number}[] = [];
  newPrestazione:{PDescr:string, CCod:number} = {PDescr:"", CCod: 0};
  hideQueryA:boolean = true;
  queryA:{Sri:number, Cognome:string, Nome:string, Via:string, OreDebito:number}[] = [];
  hidePrenotazione:boolean = true;
  prenotazione:{N:number, SRichiedente:string, PCod:number, DataDellaRich:string, DataP:string}[] = [];
  hideEffettua:boolean = true;
  effettua:{Num:number, Data:string, SocioErogante:number, SocioRicevente:number, PCod:number}[] = [];

  constructor(private http:HttpClient){}

  categoria() {
    if (!this.hideCategoria) {
      this.hideCategoria = true;
      return;
    }
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=categoria").subscribe( 
      res => {
        this.categorie = [];
        res.forEach(x => {
          this.categorie.push({CCod: x["CCod"], CDescr: x["CDescr"]});
        });
        this.hideCategoria = false;
      }
    );
  }

  query_D() {
    if (!this.hideQueryD) {
      this.hideQueryD = true;
      return;
    }
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=queryD").subscribe(
      res => {
        this.queryD = [];
        res.forEach(x => {
          this.queryD.push({PDescr: x["PDescr"], OreErogate: x["OreErogate"]});
        });
        this.hideQueryD = false;
      }
    );
  }

  soci() {
    if (!this.hideSocio) {
      this.hideSocio = true;
      return;
    }
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=socio").subscribe(
      res => {
        this.socio = [];
        res.forEach(x => {
          this.socio.push({SCod:x["SCod"], Cognome:x["Cogn"], nome:x["Nome"], via:x["Via"], cap:x["Cap"], citta:x["Citta"], telefono:x["Telefono"], ZCod:x["ZCod"]});
        });
        this.hideSocio = false;
      }
    );
  }

  offerte() {
    if (!this.hideOfferta) {
      this.hideOfferta = true;
      return;
    }
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=offerta").subscribe(
      res => {
        this.offerta = [];
        res.forEach(x => {
          this.offerta.push({SCod: x["SCod"], PCod:x["PCod"]});
        });
        this.hideOfferta = false;
      }
    );
  }

  query_C() {
    if (!this.hideQueryC) {
      this.hideQueryC = true;
      return;
    }
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=queryC").subscribe(
      res => {
        this.queryC = [];
        res.forEach(x => {
          this.queryC.push({Cognome:x["Cogn"], Nome:x["Nome"], Citta:x["Citta"], Telefono:x["Telefono"], Via: x["Via"]});
        });
        this.hideQueryC = false;
      }
    );
  }

  zona() {
    if (!this.hideZone) {
      this.hideZone = true;
      return;
    }
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=zona").subscribe(
      res => {
        this.zone = [];
        res.forEach(x => {
          this.zone.push({ZCod:x["ZCod"], ZDescr:x["ZDescr"], ZMappa:x["ZMappa"]});
        });
        this.hideZone = false;
      }
    );
  }

  prestazioni() {
    if (!this.hidePrestazione) {
      this.hidePrestazione = true;
      return;
    }
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=prestazione").subscribe(
      res => {
        this.prestazione = [];
        res.forEach(x => {
          this.prestazione.push({CCod:x["CCod"], PCod:x["PCod"], PDescr:x["PDescr"]});
        });
        this.hidePrestazione = false;
      }
    );
  }

  addPrestazione() {
    this.http.post("http://127.0.0.1:8080", {"azione": "insert", "tabella": "prestazione", "PDescr": this.newPrestazione.PDescr, "CCod": this.newPrestazione.CCod}).subscribe(
      res => {
        console.log(res);
        this.prestazioni();
      },
      err => {
        console.log(err);
      }
    );
  }

  query_A() {
    if (!this.hideQueryA) {
      this.hideQueryA = true;
      return;
    }
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=queryA").subscribe(
      res => {
        this.prestazione = [];
        res.forEach(x => {
          this.queryA.push({Cognome:x["Cogn"],Nome:x["Nome"],OreDebito:x["OreDebito"],Sri:x["Sri"],Via:x["Via"]});
        });
        this.hideQueryA = false;
      }
    );
  }

  prenotazioni() {
    if (!this.hidePrenotazione) {
      this.hidePrenotazione = true;
      return;
    }
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=prenotazione").subscribe(
      res => {
        this.prestazione = [];
        res.forEach(x => {
          this.prenotazione.push({N:x["N"],SRichiedente:x["SRichiedente"],PCod:x["PCod"],DataDellaRich:x["DataDellaRich"],DataP:x["DataP"]});
        });
        this.hidePrenotazione = false;
      }
    );
  }

  effettuazioni() {
    if (!this.hideEffettua) {
      this.hideEffettua = true;
      return;
    }
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=effettua").subscribe(
      res => {
        this.prestazione = [];
        res.forEach(x => {
          this.effettua.push({Num:x["Num"],Data:x["Data"],SocioErogante:x["SocioErogante"],SocioRicevente:x["SocioRicevente"],PCod:x["PCod"]});
        });
        this.hideEffettua = false;
      }
    );
  }
}
