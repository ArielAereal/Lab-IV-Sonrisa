import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Usuario} from '../clases/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Turno} from '../clases/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  dbTurnos:Observable<any[]>;

  todosLosTurnos: Turno[];

  constructor(public afAuth: AngularFireAuth, private db :AngularFirestore) { 

    this.dbTurnos = this.db.collection('turnos').valueChanges();
    this.todosLosTurnos = new Array();
    this.ObtenerTurnos();
  }

  ObtenerTurnos(){

    this.dbTurnos.forEach(element => {

      this.todosLosTurnos = [];     

      element.forEach(turno => {

        let unTurno = new Turno();

        unTurno.correo = turno.correo;
        unTurno.especialista = turno.especialista;         
        unTurno.estado = turno.estado;
        unTurno.turno = turno.turno;
        unTurno.res = turno.res;

        this.todosLosTurnos.push(unTurno);
        
      });
      
      console.info(this.todosLosTurnos);
      
    });

  }

  modificarRes(turno:Turno){

    let documento = turno.correo + turno.turno.toMillis().toString();

    this.db.collection('turnos').doc(documento).update({      
            
      'estado' : turno.estado,
      'res' : turno.res,
      'encuesta' : turno.encuesta

    })
    .then(ref=>{
      console.log('turno hecho');
     // console.info(ref.id);
    })
    .catch(err=>{
  
      // revisar este error (si hace falta)
      Promise.reject(err);
    });
  }
}
