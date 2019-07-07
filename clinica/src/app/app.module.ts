import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { IngresoComponent } from './componentes/ingreso/ingreso.component';
import { EspecialistaComponent } from './componentes/especialista/especialista.component';
import { RecepcionistaComponent } from './componentes/recepcionista/recepcionista.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { ErrorComponent } from './componentes/error/error.component';
import { VolverComponent } from './componentes/volver/volver.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LogoutComponent } from './componentes/logout/logout.component';

import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import {ActivadorService} from './servicios/activador.service';

import { AltaMComponent } from './componentes/alta-m/alta-m.component';

import {AltaService} from './servicios/alta.service';
import { PedirTurnoComponent } from './componentes/pedir-turno/pedir-turno.component';
import { ListarUComponent } from './componentes/listar-u/listar-u.component';
import { DetalleUComponent } from './componentes/detalle-u/detalle-u.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    IngresoComponent,
    EspecialistaComponent,
    RecepcionistaComponent,
    ClienteComponent,
    AdminComponent,
    ErrorComponent,
    VolverComponent,
    LogoutComponent,
    AltaMComponent,
    PedirTurnoComponent,
    ListarUComponent,
    DetalleUComponent,
    MisTurnosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'Trabajo Práctico 2'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [ActivadorService,AltaService, { provide: StorageBucket, useValue: 'clinicabuenas.appspot.com' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
