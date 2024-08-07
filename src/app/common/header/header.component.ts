import { CommonModule, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Component, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../sidebar/toggle.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgClass, MatMenuModule, MatButtonModule, RouterLink, RouterLinkActive, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    user$ = this.authService.user$;
    user: User | null = null;
    // isSidebarToggled
    isSidebarToggled = false;
      
    // isToggled
    isToggled = false;

    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        public authService: AuthService,
        private router: Router
    ) {
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }
    ngOnInit(): void {
        this.user$.subscribe(user => {
            console.log('user', user);
            this.user = user;
          });
    }

    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Header Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    async logoutGoogle() {
        try {
          await this.authService.logout();
          this.router.navigate(['/authentication']);
        } catch (error) {
          console.error('Logout failed', error);
        }
    }
}
