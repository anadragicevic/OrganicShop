import { AuthService } from './../services/auth.service';
import { User } from 'firebase/auth';

import { AngularFireAuth,  } from '@angular/fire/compat/auth'
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import * as firebase from 'firebase/compat/app'


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent  {
  
  
 
  constructor(public auth:AuthService) {
   
   }

  logout(){ 
    
    this.auth.logout();
 
  }
}
