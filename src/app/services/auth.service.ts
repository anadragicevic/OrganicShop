import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: UserService) {
    afAuth.authState.subscribe(x => {
      this.user = x;
      if (x) 
      { userService.save(x) }
      else
       { console.log('error') }
    });
  }
  
  login() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider).then(
      res => {
        this.router.navigate(['/shopping-cart']);
        localStorage.setItem('token', JSON.stringify(res.user));
      }, err => {
        alert(err.message);
      })
  }

   logout() {
    this.afAuth.signOut();
  }
}
