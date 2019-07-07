import { Component, OnInit } from '@angular/core';

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

  verRes(turno:Turno){

    console.info(turno);

    if(turno.res != undefined)
    {
      this.reseniaActiva = turno.res;
    }

    //sino disparar el pop up correspondiente desde acá
  }

}
