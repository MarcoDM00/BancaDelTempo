import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GestoreService {
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
  idSocio:number = 18;
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
  newPrestazione:{PDescr:string, CCod:number} = {PDescr:"", CCod: 1};
  hideQueryA:boolean = true;
  queryA:{Sri:number, Cognome:string, Nome:string, Via:string, OreDebito:number}[] = [];
  hidePrenotazione:boolean = true;
  prenotazione:{N:number, SRichiedente:string, PCod:number, DataDellaRich:string, DataP:string}[] = [];
  newPrenotazione:{SRichiedente:number, PCod:number, DataDellaRich:string, DataP:string} = {SRichiedente:1, PCod:1, DataDellaRich:"", DataP:""};
  hideEffettua:boolean = true;
  effettua:{Num:number, Data:string, SocioErogante:number, SocioRicevente:number, PCod:number}[] = [];

  constructor(private http:HttpClient, private router:Router) {
    this.categoria();
    this.query_D();
    this.soci();
    this.offerte();
    this.query_C();
    this.zona();
    this.prestazioni();
    this.query_A();
    this.prenotazioni();
    this.effettuazioni();
  }

  register() {
    this.http.post("http://127.0.0.1:8080", {"azione": "register", "cognome": this.cognome, "nome": this.nome, "via": this.via, "cap": this.cap, "citta": this.citta, "telefono": this.telefono, "ZCod": this.zcod, "usr": this.username, "psw": this.password}).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  login() {
    this.http.post("http://127.0.0.1:8080", {"azione": "login", "usr": this.username, "psw": this.password}).subscribe(
      res => {
        if (res["esito"] == 1) {
          this.idSocio = res["id"];
          this.router.navigate(["home"]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  categoria() {
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=categoria").subscribe( 
      res => {
        this.categorie = [];
        res.forEach(x => {
          this.categorie.push({CCod: x["CCod"], CDescr: x["CDescr"]});
        });
      }
    );
  }

  query_D() {
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=queryD").subscribe(
      res => {
        this.queryD = [];
        res.forEach(x => {
          this.queryD.push({PDescr: x["PDescr"], OreErogate: x["OreErogate"]});
        });
      }
    );
  }

  soci() {
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=socio").subscribe(
      res => {
        this.socio = [];
        res.forEach(x => {
          this.socio.push({SCod:x["SCod"], Cognome:x["Cogn"], nome:x["Nome"], via:x["Via"], cap:x["Cap"], citta:x["Citta"], telefono:x["Telefono"], ZCod:x["ZCod"]});
        });
      }
    );
  }

  offerte() {
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=offerta").subscribe(
      res => {
        this.offerta = [];
        res.forEach(x => {
          this.offerta.push({SCod: x["SCod"], PCod:x["PCod"]});
        });
      }
    );
  }

  query_C() {
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=queryC").subscribe(
      res => {
        this.queryC = [];
        res.forEach(x => {
          this.queryC.push({Cognome:x["Cogn"], Nome:x["Nome"], Citta:x["Citta"], Telefono:x["Telefono"], Via: x["Via"]});
        });
      }
    );
  }

  zona() {
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=zona").subscribe(
      res => {
        this.zone = [];
        res.forEach(x => {
          this.zone.push({ZCod:x["ZCod"], ZDescr:x["ZDescr"], ZMappa:x["ZMappa"]});
        });
      }
    );
  }

  prestazioni() {
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=prestazione").subscribe(
      res => {
        this.prestazione = [];
        res.forEach(x => {
          this.prestazione.push({CCod:x["CCod"], PCod:x["PCod"], PDescr:x["PDescr"]});
        });
        console.log(this.prestazione);
      }
    );
  }

  addPrestazione() {
    this.http.post("http://127.0.0.1:8080", {"azione": "insert", "tabella": "prestazione", "PDescr": this.newPrestazione.PDescr, "CCod": this.newPrestazione.CCod}).subscribe(
      res => {
        console.log(res);
        this.http.post("http://127.0.0.1:8080", {"azione": "insert", "tabella": "offerta", "SCod": this.idSocio, "CCod": res["id"]}).subscribe(
          res => {
            console.log(res);
            this.prestazioni();
          },
          err => {
            console.log(err);
          }
        );
        this.prestazioni();
      },
      err => {
        console.log(err);
      }
    );
  }

  query_A() {
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=queryA").subscribe(
      res => {
        this.queryA = [];
        res.forEach(x => {
          this.queryA.push({Cognome:x["Cogn"],Nome:x["Nome"],OreDebito:x["OreDebito"],Sri:x["Sri"],Via:x["Via"]});
        });
      }
    );
  }

  prenotazioni() {
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=prenotazione").subscribe(
      res => {
        this.prenotazione = [];
        res.forEach(x => {
          this.prenotazione.push({N:x["N"],SRichiedente:x["SRichiedente"],PCod:x["PCod"],DataDellaRich:x["DataDellaRich"],DataP:x["DataP"]});
        });
        console.log(this.prenotazione);
      }
    );
  }

  addPrenotazione() {
    this.http.post("http://127.0.0.1:8080", {"azione": "insert", "tabella": "prenotazione", "srichiedente": this.newPrenotazione.SRichiedente, "pcod": this.newPrenotazione.PCod, "datadellarich": this.newPrenotazione.DataDellaRich, "datap": this.newPrenotazione.DataP}).subscribe(
      res => {
        console.log(res);
        this.prenotazioni();
      },
      err => {
        console.log(err);
      }
    );
  }

  effettuazioni() {
    this.http.get<any[]>("http://127.0.0.1:8080?tabella=effettua").subscribe(
      res => {
        this.effettua = [];
        res.forEach(x => {
          this.effettua.push({Num:x["Num"],Data:x["Data"],SocioErogante:x["SocioErogante"],SocioRicevente:x["SocioRicevente"],PCod:x["PCod"]});
        });
      }
    );
  }
}
