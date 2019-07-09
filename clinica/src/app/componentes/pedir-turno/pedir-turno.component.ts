import { Component, OnInit } from '@angular/core';

import {AltaService} from '../../servicios/alta.service';

import {ActivadorService} from '../../servicios/activador.service';

import * as firebase from 'firebase/app';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {Turno} from '../../clases/turno';
import {Usuario} from '../../clases/usuario';

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.css']
})

//ordenar lista

// borrar los campos luego del alta
// y o navegar, o pop up, etc.

// los ingresos de turnos van con nombre del documento
// para poder modificar su reseña luego

// correo+fecha.tomillis.tostring


export class PedirTurnoComponent implements OnInit {  

  listaPulida: any[];

  ver:boolean=false;

  listadoPuntajesMostrar:any[];

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

    this.listaPulida = new Array();
    this.especActivos = new Array();
    this.cargarSelect();
    this.turno = new Turno();

    this.listadoPuntajesMostrar = new Array();

    console.info(this.act.todosLosPuntajes);

    this.manipularObjetos();
  }
  
  pedirTurno(){
    let usr = this.act.afAuth.auth.currentUser;

    if(usr){
      this.turno.correo =  usr.email;
    }


    this.turno.turno = firebase.firestore.Timestamp.fromDate(new Date(this.TurnoForm.get('fecha').value));   
    
    this.turno.especialista = this.TurnoForm.get('especialista').value;      

   this.turno.estado = 'solicitado';

   this.turno.encuesta = false;

    this.as.altaTurno(this.turno);
    
  }

  cargarSelect(){
    
    this.especActivos = this.act.todosLosUsuarios.filter(espe=>{

      return espe.perfil == 'especialista';
    });

    console.info(this.especActivos);
  }

  mostrarPuntaje(){
    //console.info(this.act.todosLosPuntajes);

  }

  manipularObjetos(){
    
    this.listadoPuntajesMostrar = [];
    this.act.todosLosPuntajes.forEach(element => {
      
      this.listadoPuntajesMostrar.push(element);
    });

    this.ordenoYpromedio(this.listadoPuntajesMostrar);


  }

  ordenoYpromedio(puntajes:any){

    this.listaPulida = [];

    let listaDeProf:any[] = new Array();

    
    this.especActivos.forEach(element => {
      
      let acum:number = 0;
      let cont:number = 0;

      // creo un tr por cada uno de estos
      // console.info(puntajes);
      let propios = puntajes.filter(pts=>{                
        
        return element.correo == pts.correo;
      });
      
      // console.info(propios);
      
      propios.forEach(element => {
        acum = acum + element.puntaje;
        cont = cont + 1;
      });

      if(cont == 0){
        cont = 1;
      }
      
      listaDeProf.push({'correo':element.correo,'promedio': (acum/cont),'total': cont});

      
    });



    this.listaPulida = listaDeProf;
    
    //this.listaPulida.sort();
    
    // listado de profesionales
    // console.info(listaDeProf);




    // de cada uno promedio y cantidad de encuestas recibidas
  }

}
