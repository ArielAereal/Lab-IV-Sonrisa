import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import {Usuario} from '../clases/usuario';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Router }  from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//habilitar todas las rutas

// la barra de navegacion para las rutas

export class ActivadorService implements CanActivate  {

  dbUsuarios: Observable<any[]>;

  todosLosUsuarios : Usuario[];

  constructor(public afAuth: AngularFireAuth, private ruter:Router, private db :AngularFirestore) { 

    this.dbUsuarios = this.db.collection('usuarios').valueChanges();
    this.todosLosUsuarios = new Array();
    this.ObtenerUsuarios();

  }

  ingreso(usuario:Usuario):void{

    this.afAuth.auth.signInWithEmailAndPassword(usuario.correo,usuario.clave)
    .then(res=>{
      console.log('adentro', res.user.email);      
     
      // ahí va
      this.redirigir(this.ObtenerPerfil(res.user.email));
    })
    .catch(err=>{
      console.log('algo malo, ',err.message);
    });

  }

  salida(){

    this.afAuth.auth.signOut();

    console.log("sin usuario");

  }

  quienEsta():any | void{

    let usr = this.afAuth.auth.currentUser;

    if(usr){
      console.log("está ", usr.email);
      return usr;
    }else{
      console.log('no hay nadie');
    }
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean>{  

    /*
    console.log(route);
    console.log(state);
    //  console.log('url dentro de canActivate', url);
    */    

    
   let puede : boolean = false;

   let user = this.afAuth.auth.currentUser; 
   let rutaOk:string = route.url.toString();
   
   // a veces aparece vacía, si tipeo en la barra
   // ni idea. Uso botones siempre    

   //console.info(route.url.toString());

   if(user){

    let perf: string = this.ObtenerPerfil(user.email);
    
    // falla, ver
    console.info(perf);

    puede = this.dividirAguas(perf,rutaOk);
    

   }else{

    // entró por acá
    console.log("a loguearse");
    return false;
  }

  return puede;
   
  } // canActivate

  dividirAguas(perfil:string, ruta:string):boolean{
  
   
  switch (perfil) {
    case 'admin':      
               // this.ruter.navigate(['administrador']);
                return true;
  
    case 'cliente':

          if(ruta == 'cliente'){
         //   this.ruter.navigate(['cliente']);
            return true;
          }else{

            return false;
          }        
        
    case 'recepcionista':
        
        if(ruta == 'recepcionista'){
       //   this.ruter.navigate(['recepcionista']);
          return true;
        }else{

          return false;
        }
      
    case 'especialista':
        if(ruta == 'especialista'){
     //     this.ruter.navigate(['especialista']);
          return true;
        }else{

          return false;
        }
      
    default:
       this.ruter.navigate(['error']);
      return false;     
  }
  
  } // redirecciona dividirAguas

  ObtenerUsuarios(){
    this.dbUsuarios.forEach(element => {

      this.todosLosUsuarios = [];

      //console.info(element);

      element.forEach(usuario => {

        let unUsr = new Usuario();

        unUsr.correo = usuario.correo;
        unUsr.perfil = usuario.perfil;

        this.todosLosUsuarios.push(unUsr);
        
      });

      // repite los usuarios ? 
      console.info(this.todosLosUsuarios);
      
    });
  }

  ObtenerPerfil(correo:string):string{    

    let elPerfil:string = '';

    this.todosLosUsuarios.forEach(element => {

      if(correo == element.correo){

        console.log(element.perfil);        
        elPerfil = element.perfil;

      }
      
    });

    return elPerfil;
  }

  redirigir(perfil:string){

    switch (perfil) {
      case 'admin':      
                  this.ruter.navigate(['administrador']);
                  break;
                      
      case 'cliente':
            
              this.ruter.navigate(['cliente']);
              break;            
          
      case 'recepcionista':         
          
            this.ruter.navigate(['recepcionista']);
            break;          
      case 'especialista':
            this.ruter.navigate(['especialista']);
          
            break;
      default:
          this.ruter.navigate(['error']);
          break;
    }
    
  }

}// servicio
