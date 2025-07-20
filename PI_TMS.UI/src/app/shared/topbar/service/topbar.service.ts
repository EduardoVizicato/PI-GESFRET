import { Injectable } from '@angular/core';
import { Breadcrumb } from '../model/breadcrumbs.model';
import { BehaviorSubject, filter } from 'rxjs';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { AuthTokenService } from '../../../_guard/service/auth-token.service';

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class TopbarService {
  name: string = '';
  // private breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(private router: Router,private authTokenService: AuthTokenService) {

    const userName = this.authTokenService.getUserName();
    if (userName) {
      this.name = userName;
    }

  //   this.router.events
  //     .pipe(filter(event => event instanceof NavigationEnd))
  //     .subscribe(() => {
  //       const root = this.router.routerState.snapshot.root;
  //       const breadcrumbs = this.buildBreadcrumbs(root);
  //       this.breadcrumbs$.next(breadcrumbs);
  //     });
  }

  // get breadcrumbs() {
  //   return this.breadcrumbs$.asObservable();
  // }

  // private buildBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
  //   const label = route.data['breadcrumb'];
  //   const path = route.routeConfig?.path ?? '';

  //   const nextUrl = path ? `${url}/${path}` : url;

  //   if (label) {
  //     breadcrumbs.push({ label, url: nextUrl });
  //   }

  //   if (route.firstChild) {
  //     return this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
  //   }

  //   return breadcrumbs;
  // }
}

