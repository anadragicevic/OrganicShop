import { User } from 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFireDatabase) { }

  save(user: any){
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }
}
