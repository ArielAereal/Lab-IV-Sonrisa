import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PrincipalComponent } from './componentes/principal/principal.component';
import { ErrorComponent } from './componentes/error/error.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IngresoComponent } from './componentes/ingreso/ingreso.component';
import { VolverInicioComponent } from './componentes/volver-inicio/volver-inicio.component';
import { SalaDeEsperaComponent } from './componentes/sala-de-espera/sala-de-espera.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    ErrorComponent,
    IngresoComponent,
    VolverInicioComponent,
    SalaDeEsperaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, "Clinica Buena Sonrisa"),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
