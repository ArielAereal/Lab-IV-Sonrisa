import { Component, OnInit } from '@angular/core';

import {AltaService} from '../../servicios/alta.service';

import {ActivadorService} from '../../servicios/activador.service';

import * as firebase from 'firebase/app';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {Turno} from '../../clases/turno';
import {Usuario} from '../../clases/usuario';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.css']
})

// traer usuairos, ya los tengo en el activaor, pedir todos loos esppecialistas

// y cargar el select

export class PedirTurnoComponent implements OnInit {  

  especActivos: Usuario[];

  turno: Turno;  

  especi:string;

  especialista = new FormControl('', [
    Validators.required,
   
  ]);


  fecha = new FormControl('', [
    Validators.required
  ]);

  TurnoForm: FormGroup = this.builder.group({

    especialista: this.especialista,
    fecha: this.fecha

  });

  // cargar el select con los especialistas que existan

  constructor(private as : AltaService,private act : ActivadorService, private builder: FormBuilder) {
  }
  
  ngOnInit() {
    this.especActivos = new Array();
    this.cargarSelect();
    this.turno = new Turno();
  }
  
  pedirTurno(){
    let usr = this.act.afAuth.auth.currentUser;

    if(usr){
      this.turno.correo =  usr.email;
    }


    this.turno.turno = firebase.firestore.Timestamp.fromDate(new Date(this.TurnoForm.get('fecha').value));   
    
    this.turno.especialista = this.TurnoForm.get('especialista').value;   

   // console.info(this.turno);

    this.as.altaTurno(this.turno);

  }

  cargarSelect(){
    
    this.especActivos = this.act.todosLosUsuarios.filter(espe=>{

      return espe.perfil == 'especialista';
    });

    console.info(this.especActivos);
  }

}
