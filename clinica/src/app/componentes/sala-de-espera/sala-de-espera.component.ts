import { Component, OnInit, Directive } from '@angular/core';
import {Router} from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import {AngularFireStorage} from '@angular/fire/storage';

import {FileSelectDirective, FileDropDirective,FileUploader} from 'ng2-file-upload/ng2-file-upload';

const URL:string = 'https://clinicabuenas.firebaseapp.com';

// todavia no sube el archivo...

@Component({
  selector: 'app-sala-de-espera',
  templateUrl: './sala-de-espera.component.html',
  styleUrls: ['./sala-de-espera.component.css']
})

// intentar hacer andar el file uploader

//ver directivas y si sale con eso

@Directive({selector: '[ng2FileDrop]'})
@Directive({selector: '[ng2FileSelect]'})

export class SalaDeEsperaComponent implements OnInit {

  public uploader :FileUploader = new FileUploader({url: URL});

  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  //, private storage: AngularFireStorage
  constructor(private ruter :Router,  private afAuth: AngularFireAuth
    ) { }

  ngOnInit() {
  }

  Salir() :void{

this.afAuth.auth.signOut()
.then(function(){
  console.log("gracias por su tiempo");
  
})
.catch(function(error){
  
  console.log("gracias por su tiempo, pero algo dudoso pasó");
  console.info(error.message);
});


this.ruter.navigate(['principal']);

  }

subirArchivo(item:any):void{

  console.info(item);

  item.upload();

  // this.storage.ref("primera imagen");
  // this.storage.upload("primera imagen", item.upload());

}

}
