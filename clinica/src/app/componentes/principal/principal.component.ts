import { Component, OnInit } from '@angular/core';

import {ActivadorService} from '../../servicios/activador.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

// principal navbar con las rutas 

// ingreso ajustar template (navbar)

// servicio canActivate y rutas
// error de logueo

// esconder el boton ingresar cuando clickea en la ruta

export class PrincipalComponent implements OnInit {


  constructor(private pas:ActivadorService) { }

  ngOnInit() {

    this.pas.quienEsta();

    
  }

}
