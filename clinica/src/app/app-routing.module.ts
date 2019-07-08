import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalComponent } from './componentes/principal/principal.component';
import { IngresoComponent } from './componentes/ingreso/ingreso.component';
import { EspecialistaComponent } from './componentes/especialista/especialista.component';
import { RecepcionistaComponent } from './componentes/recepcionista/recepcionista.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { ErrorComponent } from './componentes/error/error.component';

import {ActivadorService} from './servicios/activador.service';

import { AltaMComponent } from './componentes/alta-m/alta-m.component';

import { PedirTurnoComponent } from './componentes/pedir-turno/pedir-turno.component';

import { ListarUComponent } from './componentes/listar-u/listar-u.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { TurnosEspComponent } from './componentes/turnos-esp/turnos-esp.component';

// {path:'', component:}
const routes: Routes = [
  {path:'', redirectTo: 'ingreso', pathMatch: 'full'}, 
  {path:'ingreso', component: IngresoComponent}, 
  {path:'recepcionista', component: RecepcionistaComponent, canActivate: [ActivadorService]},
  {path:'especialista', component: EspecialistaComponent, canActivate: [ActivadorService], children:[
    {path:'turnos', component: TurnosEspComponent}
  ]},
  {path:'cliente', component: ClienteComponent, canActivate: [ActivadorService], children:[
    {path:'pedir-turno', component: PedirTurnoComponent},
   {path:'mis-turnos', component: MisTurnosComponent}
  ]},
  {path:'administrador', component:AdminComponent, canActivate: [ActivadorService], children:[
    {path:'alta', component:AltaMComponent},
    {path: 'listado', component: ListarUComponent}
  ]},

  {path:'error', component: ErrorComponent},
  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
