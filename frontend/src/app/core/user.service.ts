import { Injectable } from '@angular/core';
//import users
import * as usersData from './users.json';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any;
  currentUser$: any;
  users: any[] = usersData;
  constructor() {
    this.currentUser$ = new BehaviorSubject<any>(null);
    this.currentUser$.next(this.currentUser);
  }

  getCurrentUser() {
    return this.currentUser$.asObservable();
  }
  setCurrentUser(userId: any) {
    let user = this.users[userId - 1];
    this.currentUser$.next(user);
    console.log(this.currentUser$.value);
  }
}
