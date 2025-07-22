import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopbarService } from './service/topbar.service';
import { Breadcrumb } from './model/breadcrumbs.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  name: string = '';
  
  // breadcrumbs: Breadcrumb[] = [];

  constructor(private topbarService: TopbarService) {
    this.name = this.topbarService.name;
  }

  // ngOnInit(): void {
  //   this.topbarService.breadcrumbs.subscribe((bc) => this.breadcrumbs = bc);
  // }
}
