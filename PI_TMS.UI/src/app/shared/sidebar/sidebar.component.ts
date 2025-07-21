import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthTokenService } from '../../_guard/service/auth-token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed: boolean = false;

  isRegisterMenuOpen: boolean = false;
  activeSubMenuItem: string | null = null;
  isDashboardActive: boolean = false;
  isTravelsActive: boolean = false;
  isFreightActive: boolean = false;
  isNfStorageActive: boolean = false;
  isRegisterParentActive: boolean = false;

  constructor(private router: Router, private authTokenService: AuthTokenService) {}
  
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveState();
    });
    this.updateActiveState();
  }

  toggleRegisterMenu(): void {
    this.isRegisterMenuOpen = !this.isRegisterMenuOpen;
  }

  updateActiveState(): void {
    const currentUrl = this.router.url;
    this.isDashboardActive = false;
    this.isTravelsActive = false;
    this.isFreightActive = false;
    this.isNfStorageActive = false;
    this.isRegisterParentActive = false;
    this.activeSubMenuItem = null;

    if (currentUrl === '/dashboard') { 
      this.isDashboardActive = true;
    } else if (currentUrl.includes('/travels')) {
      this.isTravelsActive = true;
    } else if (currentUrl === '/freight-calculation'){
      this.isFreightActive = true;
    } else if (currentUrl === '/nf-storage'){
      this.isNfStorageActive = true;
    } else if (currentUrl.includes('/register')) {
      this.isRegisterMenuOpen = true;
      this.isRegisterParentActive = true;
      if (currentUrl.includes('/register/trucks')) {
        this.activeSubMenuItem = 'trucks';
      } else if (currentUrl.includes('/register/loads')) {
        this.activeSubMenuItem = 'loads';
      } else if (currentUrl.includes('/register/clients')) {
        this.activeSubMenuItem = 'clients';
      }
    }
  }

  goToDashboard(): void { this.router.navigate(['/dashboard']); }
  goToTravels(): void { this.router.navigate(['/travels']); }
  goToFreight(): void { this.router.navigate(['/freight-calculation']); }
  goToNfStorage(): void { this.router.navigate(['/nf-storage']); }
  goToCaminhoes(): void { this.router.navigate(['/register/trucks']); }
  goToCargas(): void { this.router.navigate(['/register/loads']); }
  goToClientes(): void { this.router.navigate(['/register/clients']); }
  LogOff(): void {
    this.authTokenService.LogOff();
    this.router.navigate(['/login']);
  }
}
