import { Component, OnInit } from '@angular/core';

import {ActivadorService} from '../../servicios/activador.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private pas:ActivadorService, private ruter:Router) { }

  ngOnInit() {
  }

  out(){
    this.pas.salida();

    this.ruter.navigate(['']);
  }

}
