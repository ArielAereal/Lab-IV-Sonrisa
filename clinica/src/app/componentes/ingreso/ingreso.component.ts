import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';

import {Router} from '@angular/router';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {Usuario} from '../../clases/usuario';

import {ActivadorService} from '../../servicios/activador.service';

import {timer, Subscription} from 'rxjs';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})

// alta de usuario con foto OK

// pedir turno OK

// el profesional finaliza los turnos y deja su reseña OK

// el cliente puede ver la reseña del profesional OK

// el cliente completa una encuesta de satisfacción OK

// habilitar el captcha con el ng build
// el minimo deberia estar

// prueba en la web

/**
 * listado de usuario y contraseña
 * 
 * admin
 * 
 * cliente2
 * miguel 
 * ramon recepcionista
 * 
 * (abajo)
 * 
 * miguel@utn.com especialista, pass miNuevoSer
 * bruno@utn.com especialista, pass elPeleSer
 * 
 * cliente2@utn.com cliente, pass elverCerveza
 * 
 * cliente1 
 * cliente1@utn.com
    nuevaguinea
 */



// ver de meter algun otro reporte

// mejora del estilo

// ingreso ajustar template (navbar)
// ordenar lista de rankings
// ordenar turnos pedidos por fecha

// ultima prueba web

export class IngresoComponent implements OnInit {

  @ViewChild('btnError') btnError : ElementRef; 

  private susc : Subscription;

  tic : number;

  myRecaptcha :FormControl = new FormControl('',[
    Validators.required
    ]);

  elUsuario:Usuario;

  correo= new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  clave= new FormControl('',[
    Validators.required,
    Validators.minLength(6)
  ]); 

  ingresoForm: FormGroup = this.builder.group({

    correo:this.correo,
    clave: this.clave,

    // en el localhost me molesta
    
    myRecaptcha:this.myRecaptcha
    
  });

 

  constructor(private ruter :Router, private builder: FormBuilder, private pas:ActivadorService) { }

  ngOnInit() {
  }

  // pido el current user

  Ingresar(): void{  

    this.tic = 0;
    let timers = timer(200, 50);
    
    this.elUsuario = new Usuario();

    this.elUsuario.correo = this.ingresoForm.get('correo').value;
    this.elUsuario.clave = this.ingresoForm.get('clave').value;

    //console.info(this.elUsuario);

    
    this.susc = timers.subscribe(t=>{
      
      this.tic = this.tic + 1;
      
      switch (this.tic) {
        case 5:
          console.log("intento de logging");
          this.pas.ingreso(this.elUsuario);
            break;            
        
        case 90: 
            console.log("aver aver");
            let alguien = this.pas.quienEsta();

            if(alguien){
              console.log("logueado: ",alguien.email);
            }else{

              // muestro el modal
              console.log("confirma el error de logueo");
              this.mostrarError();

              this.correo.setValue('');
              this.clave.setValue('');
            }

            this.susc.unsubscribe();


        break;      
        default:
          break;
      }


    });

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
  //  console.log(`Resolved captcha with response: ${captchaResponse}`);
}

  conAd(){
    this.correo.setValue('admin@utn.com');
    this.clave.setValue('yavaapasar');
  }

  conCli(){
    
    this.correo.setValue('cliente2@utn.com');
    this.clave.setValue('elverCerveza');
      }

  conEs(){

    
    this.correo.setValue('miguel@utn.com');
    this.clave.setValue('miNuevoSer');

  }

  conRe(){

    this.correo.setValue('ramon@utn.com');
    this.clave.setValue('nuevoSerViejo');

  }

mostrarError(){

console.log('el intento de inicio de sesion fue fallido');

this.btnError.nativeElement.click();

// mostrar modal de error
}


} // ingreso
