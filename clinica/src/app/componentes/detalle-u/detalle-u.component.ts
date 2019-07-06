import { Component, OnInit } from '@angular/core';

import {ActivadorService} from '../../servicios/activador.service';

import {Usuario} from '../../clases/usuario';

import { AngularFireStorage } from '@angular/fire/storage';

import {timer, Subscription} from 'rxjs';



@Component({
  selector: 'app-detalle-u',
  templateUrl: './detalle-u.component.html',
  styleUrls: ['./detalle-u.component.css']
})
export class DetalleUComponent implements OnInit {

  usr: Usuario;

  private susc : Subscription;

  tic : number;


  constructor(private as : ActivadorService, public storage : AngularFireStorage) { }

  ngOnInit() {

    this.usr = new Usuario();

    // en el onInit no esta logueado todavia

    // pequeño timer
    this.obtenerTodo();
  }

  obtenerTodo(){

    // el delay para que el logueo esté presente

    let fotoRef : any;

    this.tic = 0;
    let timers = timer(200, 50);

    this.susc = timers.subscribe(t=>{
      
      this.tic = this.tic + 1;
      
      switch (this.tic) {
        case 5:
          console.log("recopilando informacion");          
            break;            
        
        case 60: 
            

        let elUs;
    
        elUs = this.as.afAuth.auth.currentUser;
    
        if(elUs){
          this.usr.correo =  elUs.email;
          

          // primero necesito el usuario
          this.as.todosLosUsuarios.forEach(element => {

            if(element.correo == this.usr.correo)
            {
              // foto

              if(typeof(element.rutaF) == 'string'){

                if(element.rutaF == ''){
        
                  fotoRef = '';
                }else {
        
                  fotoRef = this.storage.ref(element.rutaF);
                  this.usr.rutaF = fotoRef.getDownloadURL();
                }
              }

            }
            
          });

        }
            this.susc.unsubscribe();


        break;      
        default:
          break;
      }


    });

    

  } // obtenerTodo

} // componente
