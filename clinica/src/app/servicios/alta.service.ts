import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';

import {Usuario} from '../clases/usuario';

import { AngularFirestore } from '@angular/fire/firestore';

import {Turno} from '../clases/turno';

@Injectable({
  providedIn: 'root'
})
export class AltaService {

  constructor(private afAuth : AngularFireAuth, private db: AngularFirestore) { }

  altaUsuario(unUsuario:Usuario){

    return this.afAuth.auth.createUserWithEmailAndPassword(unUsuario.correo,unUsuario.clave)
    .then(res=>{
      console.log("Usuario creado");

      // crear el reflejo en el firestore
      this.altaCloud(unUsuario);
    })
    .catch(err=>{

      Promise.reject(err);
    });

  }

  altaCloud(unUsuario :Usuario){
 
 this.db.collection('usuarios').doc(unUsuario.correo).set({
  'correo' :  unUsuario.correo,
  'perfil' : unUsuario.perfil,
  'foto' : unUsuario.rutaF
  })
  .then(ref=>{
    console.log('cloud actualizada');   
  })
  .catch(err=>{

    // revisar este error (si hace falta)
    Promise.reject(err);
  });
  }  
 
  altaTurno(turno:Turno){

    // el nombre del documento
    // fecha en millis y en string
    // + paciente

    let documento = turno.correo + turno.turno.toMillis().toString();

    this.db.collection('turnos').doc(documento).set({

      'correo' : turno.correo,
      'turno' : turno.turno,
      'especialista' : turno.especialista,
      'estado' : turno.estado

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


}// servicio
