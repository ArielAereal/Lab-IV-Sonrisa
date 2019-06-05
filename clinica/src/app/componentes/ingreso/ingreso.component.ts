import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

//incorporar el JWT auth y eso, etc.

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  usuario= new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ]);

  clave= new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ]); 

  ingresoForm: FormGroup = this.builder.group({

    usuario:this.usuario,
    clave: this.clave
    
  });


  constructor( private builder: FormBuilder, private ruter : Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

 
  Ingresar(): void{

    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    console.log("Adentro");

    this.ruter.navigate(['sala-de-espera']);

  }

}
