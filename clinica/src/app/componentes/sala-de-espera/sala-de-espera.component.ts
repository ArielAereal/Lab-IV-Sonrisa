import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-sala-de-espera',
  templateUrl: './sala-de-espera.component.html',
  styleUrls: ['./sala-de-espera.component.css']
})
export class SalaDeEsperaComponent implements OnInit {

  constructor(private ruter :Router,  private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  Salir() :void{

this.afAuth.auth.signOut()
.then(function(){
  console.log("gracias por su tiempo");
  
})
.catch(function(error){
  
  console.log("gracias por su tiempo, pero algo dudoso pasó");
  console.info(error.message);
});


this.ruter.navigate(['principal']);

  }

}
