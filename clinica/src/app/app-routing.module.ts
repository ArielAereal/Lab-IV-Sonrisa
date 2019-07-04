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

//{path:'', component:},
const routes: Routes = [
  {path:'', redirectTo: 'principal', pathMatch: 'full'},
  {path: 'principal', component: PrincipalComponent, children:[
    {path:'ingreso', component: IngresoComponent}
  ]},
  {path:'recepcionista', component: RecepcionistaComponent, canActivate: [ActivadorService]},
  {path:'especialista', component: EspecialistaComponent, canActivate: [ActivadorService]},
  {path:'cliente', component: ClienteComponent, canActivate: [ActivadorService]},
  {path:'administrador', component:AdminComponent, canActivate: [ActivadorService]},

  {path:'error', component: ErrorComponent},
  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
