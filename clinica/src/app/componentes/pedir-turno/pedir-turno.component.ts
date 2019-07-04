import { Component, OnInit } from '@angular/core';

import {AltaService} from '../../servicios/alta.service';

import {ActivadorService} from '../../servicios/activador.service';

import * as firebase from 'firebase/app';


@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.css']
})
export class PedirTurnoComponent implements OnInit {

  tt: firebase.firestore.Timestamp;

  turno:any;

  mail:string;

  constructor(private as : AltaService,private act : ActivadorService) {

    
    
    
    
    
  }
  
  ngOnInit() {
  }
  
  pedirTurno(){
    let usr = this.act.afAuth.auth.currentUser;

    if(usr){

      this.mail =  usr.email;
    }


    this.tt = firebase.firestore.Timestamp.fromDate(new Date(this.turno));

   // console.info(this.tt);

   let turn : any = {'turno' : this.tt, 'correo' : this.mail};

   //console.info(turn);
    this.as.altaTurno(turn);

  }

}
