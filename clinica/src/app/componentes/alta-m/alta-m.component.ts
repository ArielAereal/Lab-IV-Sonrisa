import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {AltaService}from '../../servicios/alta.service';

import {Usuario} from '../../clases/usuario';

import { AngularFireStorage } from '@angular/fire/storage';

import {finalize} from 'rxjs/operators';

import {Observable } from 'rxjs';

// borrar los campos luego del alta
// y o navegar, o pop up, etc.



@Component({
  selector: 'app-alta-m',
  templateUrl: './alta-m.component.html',
  styleUrls: ['./alta-m.component.css']
})

export class AltaMComponent implements OnInit {

  unUsuario:Usuario;

  downloadURL: Observable<string>;

  @Output() tabla :EventEmitter<any> = new EventEmitter<any>();

  perfil = new FormControl('', [
    Validators.required
  ]);

  correo = new FormControl('',[
    Validators.required,
    Validators.email
  ]);
 
  
  clave = new FormControl('',[
    Validators.required,
    Validators.minLength(6)
  ]);

  foto = new FormControl('',[
    Validators.required    
    
  ]);  
 

  altaForm: FormGroup = this.builder.group({
    
    correo : this.correo,
    clave : this.clave,
    foto : this.foto,
    perfil: this.perfil
    
  
  });

  archivo:any;

  constructor(private builder: FormBuilder,private as : AltaService,public storage : AngularFireStorage) { }

  ngOnInit(){

  }

  AltaU(){

    console.log("El alta ...");

    this.unUsuario = new Usuario();

    this.unUsuario.correo = this.altaForm.get('correo').value;

    this.unUsuario.clave = this.altaForm.get('clave').value;

    this.unUsuario.perfil = this.altaForm.get('perfil').value;
    
    // transformar la foto en la ruta y la subida al storage
    this.unUsuario.rutaF = this.altaForm.get('correo').value;

    const fileRef = this.storage.ref(this.unUsuario.correo);

    // on file change
    
    if(typeof(this.unUsuario.rutaF)=='string'){

      const task = this.storage.upload(this.unUsuario.rutaF, this.archivo);
      task.snapshotChanges().pipe(
        finalize(() => {this.downloadURL = fileRef.getDownloadURL();
        console.info(this.downloadURL);} )
     )
    .subscribe();
  
      this.as.altaUsuario(this.unUsuario); 
    }






    // ver output
//   this.tabla.emit();

  }

  uploadFile(event){

    // el archivo
    const file = event.target.files[0];
    this.archivo = file;
  }

} // componente