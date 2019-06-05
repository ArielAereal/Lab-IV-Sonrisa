import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable} from 'rxjs';

import * as firebase from 'firebase/app';

//auth
import * as firebaseui from 'firebaseui';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import {Router} from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

// ver/seguir

// firebaseui-web
// google-signin#before-you-begin

// google-signin
// web/start

//firebase.auth.Auth

export class PrincipalComponent implements OnInit {

  loQueViene : Observable<any[]>;

  elmensaje:string ="";

  unaLista:any[];  

  // se entiende
  gprov : auth.GoogleAuthProvider;

  constructor(private db:AngularFirestore, private afAuth: AngularFireAuth, private ruter : Router) {
    this.unaLista = new Array();
    this.loQueViene = this.db.collection('pruebas').valueChanges();
   }

  ngOnInit() {

    this.gprov = new auth.GoogleAuthProvider();
    
    this.iniciarAlgo();
  }

  iniciarAlgo() :void{

    
    this.loQueViene.forEach(elemento=>{        

    this.elmensaje = elemento[0].mensaje;

    elemento.forEach(element=>{
      console.log(element.mensaje);
    })
  
    });
    
  }

  ingresoGoogle():void{
    
    this.afAuth.auth.signInWithPopup(this.gprov);

    this.ruter.navigate(['../sala-de-espera']);
  }

}
