import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, user, getIdToken } from '@angular/fire/auth';
import { jwtDecode } from "jwt-decode";
import * as fromAuth from '../models'
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: Auth
  ) { }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const token = await result.user.getIdToken();
      this.setToken(token);
      return result.user;
    } catch (error) {
      console.error('Error during Google login', error);
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error during logout', error);
      throw error;
    }
  }

  getToken(): Observable<string> {
    return from(this.auth.currentUser?.getIdToken() ?? Promise.reject('No user logged in'));
  }

  refreshToken(): Observable<string> {
    return from(this.auth.currentUser?.getIdToken(true) ?? Promise.reject('No user logged in'));
  }

  isLogged(): boolean {
    if(!this.currentUser)
      return false;

    const now = new Date().getTime();
    const dateExpiration = new Date(0);
    dateExpiration.setUTCSeconds(this.currentUser.exp);
    if (now >= dateExpiration.getTime()) {
      this.removeSession();
      return false;
    } else {
      return true;
    }
  }

  removeSession(): void {
    localStorage.removeItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
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
  
}
