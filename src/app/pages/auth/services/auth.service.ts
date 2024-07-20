import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) { }

  async loginWithGoogle() {
    try {
      console.log('entro al servicio');
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
}
