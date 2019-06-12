import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable} from 'rxjs';

import * as firebase from 'firebase/app';

//auth
import * as firebaseui from 'firebaseui';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import {Router} from '@angular/router';

/*
 creé otro proyecto de prueba en 

 https://segundaprueba2p.firebaseapp.com/

 mis pocos progresos:

 algún tipo de control sobre el usuario equivocado 
 recaptcha es parte del formcontrol de ingreso

 falta mucho

 los usuarios están linkeados entre Cloud Firestore y los Auntenticados

 el AuthGuard lo uso para que nadie que NO esté logueado acceda a las páginas sensibles

 encontré el JWT del currentUser

 pero todavía no integro todo, no redirecciona a cada usuario donde corresponde

 ... casi.


*/


// el token o la identificacion permiten al usuario entrar o no a determinados lugares, etc. hacerlo

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

// ver/seguir

// manage-users (o manejar usuaries)

// firebaseui-web ( te manda al before you begin)

// google-signin
// web/start

//firebase.auth.Auth

export class PrincipalComponent implements OnInit {

  loQueViene : Observable<any[]>;

  elmensaje:string ="";

  unaLista:any[];    

  // el auth.provider es un atributo o va como parametro al constructor,
  // como todas las cosas raras?
  

  constructor(private db:AngularFirestore, private afAuth: AngularFireAuth, private ruter : Router, private gprov:auth.GoogleAuthProvider) {
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

    // this.afAuth.auth().getRedirectResult(this.gprov);
    // this.afAuth.auth().signInWithRedirect(this.gprov);

    this.afAuth.auth.signInWithPopup(this.gprov)
    .then(function(result){

      
      // alcanza con este token ? 

      // cast a 
      // OAuthCredential

      // no es un JWT
      let token = (<any>result).credential.accessToken;      
      
      console.info(token);

      let user = result.user;
      
      console.info(user.displayName);
      
      console.info(user.email);


    })
    .catch(function (error){
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
    });

    this.ruter.navigate(['../sala-de-espera']);
  }

}
