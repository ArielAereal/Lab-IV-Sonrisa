import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {AltaService}from '../../servicios/alta.service';

import {Usuario} from '../../clases/usuario';

import { AngularFireStorage } from '@angular/fire/storage';

import {finalize} from 'rxjs/operators';

import {Observable } from 'rxjs';

import {Router} from '@angular/router';

import {timer, Subscription} from 'rxjs';

// borrar los campos luego del alta
// y o navegar, o pop up, etc.



@Component({
  selector: 'app-alta-m',
  templateUrl: './alta-m.component.html',
  styleUrls: ['./alta-m.component.css']
})

export class AltaMComponent implements OnInit {

  @ViewChild('btnError') btnError : ElementRef; 
  @ViewChild('btnErrorb') btnErrorb : ElementRef; 

  private susc : Subscription;

  tic : number;

  unUsuario:Usuario;

  downloadURL: Observable<string>;  

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

  constructor(private ruter: Router, private builder: FormBuilder,private as : AltaService,public storage : AngularFireStorage) { }

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

    this.tic = 0;
    let timers = timer(200, 50);

    this.susc = timers.subscribe(t=>{
      
      this.tic = this.tic + 1;
      
      switch (this.tic) {
        case 5:
          console.log("calentando motores");          
          this.mostrarError();

          // pop up
            break;            
        
        case 60:     
            this.cerrarPup();
          	this.ruter.navigate(['./administrador/listado']);
            this.susc.unsubscribe();

        break;      
        default:
          break;
      }


    });

    
  }

  uploadFile(event){

    // el archivo
    const file = event.target.files[0];
    this.archivo = file;
  }

  mostrarError(){

    console.log('el alta de usuario fue joya');
    
    this.btnError.nativeElement.click();
    
    // mostrar modal de error
    }

  cerrarPup(){    
    
    this.btnErrorb.nativeElement.click();
  }

} // componente