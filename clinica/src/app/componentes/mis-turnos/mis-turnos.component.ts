import { Component, OnInit } from '@angular/core';

import {TurnosService}from '../../servicios/turnos.service';

import {Turno} from '../../clases/turno';

import {timer, Subscription} from 'rxjs';

import {ActivadorService} from '../../servicios/activador.service';

// el boton encuesta habilita la encuesta arriba del listado de turnos

// cuando finaliza la encuesta, modifico el turno en la base y 
        // seteo la encuesta en true

        // guardo los resultados de la encuesta para mostrarlo en algun lado

        // si hace falta, y si quiero un componente aparte para la encuesta
  // le paso el turno input

  // para la encuesta, donde la muestro?

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})

export class MisTurnosComponent implements OnInit {

  

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

        // cuando finaliza la encuesta, modifico el turno en la base y 
        // seteo la encuesta en true

        // guardo los resultados de la encuesta para mostrarlo en algun lado
       
        if(turno.encuesta != true){

          this.habilitarEnc = true;
        }
      }

     console.info('Ve la encuesta?',this.habilitarEnc);
    }

   
  }

  verE(){
    this.ver = true;
  }

} // componente
