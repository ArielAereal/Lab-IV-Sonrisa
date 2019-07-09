import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import {TurnosService}from '../../servicios/turnos.service';

import {Turno} from '../../clases/turno';

import {timer, Subscription} from 'rxjs';

import {ActivadorService} from '../../servicios/activador.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})

export class MisTurnosComponent implements OnInit {

  turnoEncuesta:Turno;

  @ViewChild('cierraPop') cierraPop : ElementRef; 

  encuesta:string;

  ver:boolean = false;

  habilitarEnc:boolean = false;

  reseniaActiva:string = 'Solamente se ven reseñas de turnos en estado finalizado';

  private susc : Subscription;

  tic : number;

  turnosDelCliente:Turno[];

  constructor(private tuse:TurnosService, private pas:ActivadorService) { }


  ngOnInit() {
    this.turnosDelCliente = new Array();
    this.timerSuscribe();
  }

  timerSuscribe(){

    this.tic = 0;
    let timers = timer(200, 50);

    this.susc = timers.subscribe(t=>{
      
      this.tic = this.tic + 1;
      
      switch (this.tic) {
        case 5:
          console.log("esperando loturnos");
        //  console.info(this.tuse.todosLosTurnos);        
            break;            
        
        case 60: 
            console.log("aver aver");
          //  console.info(this.tuse.todosLosTurnos);        
            let alguien = this.pas.quienEsta();

            if(alguien){
              console.log("logueado: ",alguien.email);
            }else{
              console.log("todavia no");
            }

            this.turnosDelCliente = this.tuse.todosLosTurnos.filter(turno=>{
              return turno.correo == alguien.email;
            });

            this.susc.unsubscribe();
            break;      
        default:
          break;
      }

    });

  }

  // no se, anda bien...
  verRes(turno:Turno){   

    this.habilitarEnc = false;
    
    this.reseniaActiva = 'Solamente se ven reseñas de turnos en estado finalizado';

    if(turno.res != undefined)
    {
      if(turno.estado != 'finalizado'){
        this.reseniaActiva = 'Solamente se ven reseñas de turnos en estado finalizado';

      }else{
        
        this.reseniaActiva = turno.res;

        console.log(turno);

        // cuando finaliza la encuesta, modifico el turno en la base y 
        // seteo la encuesta en true

        // guardo los resultados de la encuesta para mostrarlo en algun lado
       
        if(turno.encuesta != true){
          this.turnoEncuesta = turno;
          this.habilitarEnc = true;
        }
      }

     console.info('Ve la encuesta?',this.habilitarEnc);
    }

   
  }

  verE(){
    this.cierraPop.nativeElement.click();
    this.ver = true;
  }

  guardarEncuesta(){

    this.turnoEncuesta.encuesta = true;
    console.info(this.turnoEncuesta);
   // console.info(this.encuesta);

    let rat = parseInt(this.encuesta);

    console.info(rat);

    this.tuse.subirEncuesta(this.turnoEncuesta.especialista, rat);
    this.tuse.modificarRes(this.turnoEncuesta);

    // guardo el resultado de la encuesta
  }

  cancelarEnc(){
    this.encuesta = undefined;
    this.ver = false;
    this.turnoEncuesta = undefined;
  }
} // componente
