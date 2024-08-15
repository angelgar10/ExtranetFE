import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, user, User } from '@angular/fire/auth';
import { jwtDecode } from "jwt-decode";
import * as fromAuth from '../models'
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { dictionaryRoutes } from '@app/shared/dictionaries/dictionary.routes';
import { dictionaryCommon } from '@app/shared/dictionaries/dictionary.common';
import { dictionaryAuth } from '../../auth/dictionaries/dictionary.auth';
import { NotificationService } from '@app/shared/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  
  constructor(
    private auth: Auth,
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.user$ = user(this.auth);
  }

  async loginWithGoogle() { //Observable<any> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider)
    const token = await result.user.getIdToken();
    this.setToken(token);
    if(this.domainValid) {
      this.router.navigate([dictionaryRoutes.home]);
    } else {
      this.notificationService.showErrorMessage(dictionaryAuth.messages.error.domainNotValid);
      this.logout();
    }
    
    // return from(signInWithPopup(this.auth, provider));
  }

  // getToken(): Observable<string> {
  //   const user = this.auth.currentUser;
  //   if (user) {
  //     return from(user.getIdToken());
  //   } else {
  //     // this.router.navigate(['/login']); // Redirigir al login si no hay un usuario autenticado
  //     return from(Promise.reject('No user logged in'));
  //   }
  // }

  refreshToken(): Observable<string> {
    const user = this.auth.currentUser;
    if (user) {
      return from(user.getIdToken(true));
    } else {
      this.logout();
      return from(Promise.reject('No user logged in'));
    }
  }

  logout() {
    signOut(this.auth).then(() => {
      this.removeSession();
      this.router.navigate([dictionaryRoutes.authentication]);
    });
  }

  removeSession(): void {
    localStorage.removeItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  get domainValid(): boolean {
    if(this.currentUser && this.currentUser.email.indexOf(dictionaryCommon.domain) > -1) {
      return true
    }
    return false;
  }

  get currentUser(): fromAuth.GoogleUser | null {
    const tokenString = this.token;
    if(!tokenString)
      return null;
    return jwtDecode<fromAuth.GoogleUser>(tokenString);
  }

  get token(): string  {
    return localStorage.getItem('token') || '';
  }

  //ToDo:Remove this method;
  getTestData() {
    return this.http.get('http://localhost:5000/api/v1/test');
  }

  // async logout() {
  //   try {
  //     await signOut(this.auth);
  //     this.removeSession();
  //   } catch (error) {
  //     console.error('Error during logout', error);
  //     throw error;
  //   }
  // }

  // getToken(): Observable<string> {
  //   return from(this.auth.currentUser?.getIdToken() ?? Promise.reject('No user logged in'));
  // }

  // refreshToken(): Observable<string> {
  //   return from(this.auth.currentUser?.getIdToken(true) ?? Promise.reject('No user logged in'));
  // }

  // isLogged(): boolean {
  //   if(!this.currentUser)
  //     return false;

  //   return true;
  // }

  // async loginWithGoogle() {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     const result = await signInWithPopup(this.auth, provider);
  //     const token = await result.user.getIdToken();
  //     this.setToken(token);
  //     return result.user;
  //   } catch (error) {
  //     console.error('Error during Google login', error);
  //     throw error;
  //   }
  // }
  
}
