import { Component, OnInit } from '@angular/core';

import {ActivadorService} from '../../servicios/activador.service';

import {Usuario} from '../../clases/usuario';

import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-listar-u',
  templateUrl: './listar-u.component.html',
  styleUrls: ['./listar-u.component.css']
})
export class ListarUComponent implements OnInit {

 usuarioYfoto:Usuario[];

  constructor(private as :ActivadorService, public storage : AngularFireStorage) {
  
   }

  ngOnInit() {

    this.usuarioYfoto = new Array();

    this.habilitarFoto();
   // console.info(this.as.todosLosUsuarios);

   console.info(this.usuarioYfoto);
  }

  habilitarFoto(){

    this.as.todosLosUsuarios.forEach(element => {

      let newUsr:Usuario = new Usuario();

      let fotoRef : any;
      
      if(typeof(element.rutaF) == 'string'){

        if(element.rutaF == ''){

          fotoRef = '';
        }else {

          fotoRef = this.storage.ref(element.rutaF);
          newUsr.rutaF = fotoRef.getDownloadURL();
        }
      }

      newUsr.correo = element.correo;
      newUsr.perfil = element.perfil;
      

      this.usuarioYfoto.push(newUsr);



      
    });

  //  console.info(this.usuarioYfoto);

  }

}
