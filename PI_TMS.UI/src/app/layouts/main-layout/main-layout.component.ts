import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-main-layout',
  imports: [SidebarComponent, RouterOutlet, NgIf,CommonModule,RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  isCollapsed = false;
  isMobile = false;
  isMobileMenuOpen = false;
  currentPageTitle = '';
  
  private wasCollapsedBeforeRegisterExpand: boolean = false; 
  
  private sidebarWasInitiallyCollapsed: boolean = false; 

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.checkScreenWidth(window.innerWidth);
    this.listenToRouteChanges();
    this.setPageTitle();
    
    if (this.isMobile) {
      this.isCollapsed = false;
    } 
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenWidth((event.target as Window).innerWidth);
  }

  private setPageTitle(): void {
    let currentRoute = this.activatedRoute;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    if (currentRoute.snapshot.data && currentRoute.snapshot.data['title']) {
      this.currentPageTitle = currentRoute.snapshot.data['title'];
    }
  }

  private listenToRouteChanges(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.currentPageTitle = data['title'] ;
      
      if (this.isMobile) {
        this.isMobileMenuOpen = false;
      }
      
      if (this.wasCollapsedBeforeRegisterExpand && !this.isMobile) {
        this.isCollapsed = true;
        this.wasCollapsedBeforeRegisterExpand = false; 
        this.sidebarWasInitiallyCollapsed = false; 
      }
    });
  }

  private checkScreenWidth(width: number): void {
    this.isMobile = width < 992;
    if (!this.isMobile) {
      this.isMobileMenuOpen = false;
      
    } else {
      
      this.isCollapsed = false;
    }
  }

  toggleCollapse(): void {
    if (!this.isMobile) {
      this.isCollapsed = !this.isCollapsed;
      
      this.wasCollapsedBeforeRegisterExpand = false; 
      this.sidebarWasInitiallyCollapsed = false; 
    }
  }

  toggleMobileMenu(): void {
    if (this.isMobile) {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
  }

  onSidebarCollapseChange(collapseState: boolean): void {
    if (!this.isMobile) {
      
      if (this.isCollapsed && !collapseState) { 
        this.sidebarWasInitiallyCollapsed = true;
      } else {
        this.sidebarWasInitiallyCollapsed = false;
      }
      this.isCollapsed = collapseState;
    }
  }

  onRegisterMenuInteracted(isOpeningRegisterMenu: boolean): void {
    if (!this.isMobile) {

      if (isOpeningRegisterMenu && this.sidebarWasInitiallyCollapsed) {
        this.wasCollapsedBeforeRegisterExpand = true;
      } else {
        this.wasCollapsedBeforeRegisterExpand = false;
      }

      this.sidebarWasInitiallyCollapsed = false; 
    }
  }
}