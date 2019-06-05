import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable} from 'rxjs';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  loQueViene : Observable<any[]>;

  elmensaje:string ="";

  unaLista:any[];

  constructor(private db:AngularFirestore) {
    this.unaLista = new Array();
    this.loQueViene = this.db.collection('pruebas').valueChanges();
   }

  ngOnInit() {
    
    this.iniciarAlgo();
  }

  iniciarAlgo() :void{

    
    this.loQueViene.forEach(elemento=>{        

    this.elmensaje = elemento[0].mensaje;

  // ver mas tarde el for si hace falta, y eso etc.
   /* 
    for (let index = 0; index < elemento.length; index++) {
        const element = elemento[index];        
     //   console.log(element);       
    }
    */   
    });
    
  }

}
