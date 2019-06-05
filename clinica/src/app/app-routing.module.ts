import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalComponent } from './componentes/principal/principal.component';
import { ErrorComponent } from './componentes/error/error.component';
import { IngresoComponent } from './componentes/ingreso/ingreso.component';
import { SalaDeEsperaComponent } from './componentes/sala-de-espera/sala-de-espera.component';

const routes: Routes = [
  {path: '', redirectTo : 'principal', pathMatch : 'full'},
  {path: 'principal', component : PrincipalComponent},
 // {path: 'ingreso', component : IngresoComponent},
  {path: 'error', component : ErrorComponent},
  {path: 'sala-de-espera', component : SalaDeEsperaComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
