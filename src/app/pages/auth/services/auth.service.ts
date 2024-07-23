import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: Auth,
    private http: HttpClient
  ) { }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
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

  isLogged(): boolean {
    //ToDo:implement correctly
    const token = localStorage.getItem('token');
    if(token)
      return true;
    return false;
    // if(this.currentUser === null) {
    //   return false;
    // }

    // const now = new Date().getTime();
    // const dateExpiration = new Date(this.currentUser.expiration);
    // if (now >= dateExpiration.getTime()) {
    //   this.removeLocalStorage();
    //   return false;
    // } else {
    //   return true;
    // }
  }

  getSecureData() {
    return this.http.get(`${environment.url}weatherforecast`);
  }
}
