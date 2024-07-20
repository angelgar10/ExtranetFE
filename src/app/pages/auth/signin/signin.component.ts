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
      private fb: FormBuilder,
      private router: Router,
      public themeService: CustomizerSettingsService
  ) {
      this.authForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(8)]],
      });
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }

  // Password Hide
  hide = true;

  // Form
  authForm: FormGroup;
  onSubmit() {
      if (this.authForm.valid) {
          this.router.navigate(['/']);
      } else {
          console.log('Form is invalid. Please check the fields.');
      }
  }

  async loginWithGoogle() {
    try {
      const user = await this.authService.loginWithGoogle();
      console.log('User logged in:', user);
      // Send the token to your backend
    } catch (error) {
      console.error('Login failed', error);
    }
  }
}
