import { Component, OnInit } from '@angular/core';

import {ActivadorService} from '../../servicios/activador.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent implements OnInit {


  constructor(private pas:ActivadorService) { }

  ngOnInit() {

  //  this.pas.quienEsta();

    
  }

}
