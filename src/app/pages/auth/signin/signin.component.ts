import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  // isToggled
  isToggled = false;

  constructor(
    private authService: AuthService,
      private router: Router,
      public themeService: CustomizerSettingsService
  ) {
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }

  // Password Hide
  hide = true;

  async login() {
    try {
      await this.authService.loginWithGoogle();
    } catch (error) {
      console.error('Login failed', error);
    }
    // this.authService.loginWithGoogle().subscribe({
    //   next: async (result) => {
    //     //ToDo:Validate cecytech domain
    //     console.log('User signed in successfully:', result);
    //     const token = await result.user.getIdToken();
    //     this.authService.setToken(token);
    //     this.router.navigate(['/']);
    //   },
    //   error: (error) => {
    //     console.error('Login error:', error);
    //   }
    // });
  }
}
