import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {Usuario} from '../../clases/usuario';

import {ActivadorService} from '../../servicios/activador.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})

// habilitar el captcha con el ng build

// error de logueo
// canActivate y rutas

// nav bar volver e ingresar

export class IngresoComponent implements OnInit {

  myRecaptcha :FormControl = new FormControl(false);

  elUsuario:Usuario;

  correo= new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ]);

  clave= new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ]); 

  ingresoForm: FormGroup = this.builder.group({

    correo:this.correo,
    clave: this.clave,

    // en el localhost me molesta
   // myRecaptcha:this.myRecaptcha
    
  });

 

  constructor(private ruter :Router, private builder: FormBuilder, private pas:ActivadorService) { }

  ngOnInit() {
  }

  Ingresar(): void{  
    
    this.elUsuario = new Usuario();

    this.elUsuario.correo = this.ingresoForm.get('correo').value;
    this.elUsuario.clave = this.ingresoForm.get('clave').value;

    //console.info(this.elUsuario);

    this.pas.ingreso(this.elUsuario);

    /*
    this.pas.ingresoUsuario(this.elUsuario)
    .then(user=>{
      console.log("trata de ingresar usuario");

      // undefined
      // console.info(user);
     
    })
    .catch(err=>{

      console.info(err.message);

    });

    */
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
}

  conAd(){
    console.log("completo con Admin");

    this.correo.setValue('admin@utn.com');
    this.clave.setValue('yavaapasar');
  }

  conCli(){
    console.log("completo con Cliente");
      }

  conEs(){

    console.log("completo con Especialista");

  }

  conRe(){

    console.log("completo con Recepcionista");

  }

  onScriptLoad() {
    console.log('Google reCAPTCHA loaded and is ready for use!');    
   
}

onScriptError() {
    console.log('Something went long when loading the Google reCAPTCHA')
}


} // ingreso
