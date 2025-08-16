import { Component, HostListener, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthTokenService } from '../../_guard/service/auth-token.service';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Output() collapseChange = new EventEmitter<boolean>();
  @Output() registerMenuInteracted = new EventEmitter<boolean>();

  isRegisterMenuOpen: boolean = false;
  activeSubMenuItem: string | null = null;
  isDashboardActive: boolean = false;
  isTravelsActive: boolean = false;
  isFreightActive: boolean = false;
  isNfStorageActive: boolean = false;
  isCteStorageActive: boolean = false;
  isRegisterParentActive: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private authTokenService: AuthTokenService, ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveState();
      if (!this.router.url.includes('/register')) {
        this.isRegisterMenuOpen = false;
      }
    });
    this.updateActiveState();
  }
  VerificationUserRole(): boolean {
    const userRole = this.authTokenService.getRole();
    if (userRole === 'ADM') {
      return true
    }
    return false;
  }
  
  toggleRegisterMenu(): void {
    if (this.isCollapsed && !this.isRegisterMenuOpen) {
      this.collapseChange.emit(false);
      this.isRegisterMenuOpen = true;
      this.registerMenuInteracted.emit(true);
    } else if (!this.isCollapsed) {
      this.isRegisterMenuOpen = !this.isRegisterMenuOpen;
      if (!this.isRegisterMenuOpen) {
        this.registerMenuInteracted.emit(false);
      }
    }
  }

  updateActiveState(): void {
    const currentUrl = this.router.url;
    this.isDashboardActive = false;
    this.isTravelsActive = false;
    this.isFreightActive = false;
    this.isNfStorageActive = false;
    this.isCteStorageActive = false;
    this.isRegisterParentActive = false;
    this.activeSubMenuItem = null;

    if (currentUrl === '/dashboard') {
      this.isDashboardActive = true;
    } else if (currentUrl.includes('/travels')) {
      this.isTravelsActive = true;
    } else if (currentUrl === '/freight-calculation') {
      this.isFreightActive = true;
    } else if (currentUrl === '/nf-storage') {
      this.isNfStorageActive = true;
    } else if (currentUrl.includes('/register')) {
    } else if (currentUrl === '/cte-storage') {
      this.isCteStorageActive = true;
    } else if (currentUrl.includes('/register')) {
      this.isRegisterMenuOpen = true;
      this.isRegisterParentActive = true;
      if (currentUrl.includes('/register/trucks')) {
        this.activeSubMenuItem = 'trucks';
      } else if (currentUrl.includes('/register/loads')) {
        this.activeSubMenuItem = 'loads';
      } else if (currentUrl.includes('/register/clients')) {
        this.activeSubMenuItem = 'clients';
      } else if (currentUrl.includes('/register/users')) {
        this.activeSubMenuItem = 'users';
      }
    }
    if (!currentUrl.includes('/register') && this.isRegisterMenuOpen) {
      this.isRegisterMenuOpen = false;
    }
  }

  private navigate(path: string[]): void {
    this.router.navigate(path);
  }

  goToDashboard(): void {
    this.navigate(['/dashboard']);
  }

  goToTravels(): void {
    this.navigate(['/travels']);
  }

  goToFreight(): void {
    this.navigate(['/freight-calculation']);
  }

  goToNfStorage(): void {
    this.navigate(['/nf-storage']);
  }
  goToCteStorage(): void {
    this.navigate(['/cte-storage']);
  }

  goToCaminhoes(): void {
    this.navigate(['/register/trucks']);
  }

  goToCargas(): void {
    this.navigate(['/register/loads']);
  }

  goToClientes(): void {
    this.navigate(['/register/clients']);
  }

  goToUsers(): void {
    this.navigate(['/register/users']);
  }
  LogOff(): void {
    this.authTokenService.LogOff();
    this.navigate(['/login']);
  }
}