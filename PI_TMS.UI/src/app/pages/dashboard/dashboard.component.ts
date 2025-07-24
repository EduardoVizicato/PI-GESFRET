import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
// import { NgChartsModule } from 'ng2-charts';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true, // ESSENCIAL!
  imports: [
    CommonModule,
    // NgChartsModule,
    NgxEchartsModule
  ],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: {
        echarts: () => import('echarts') // 🔥 aqui resolvemos o problema
      }
    }
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  options = {
    title: {
      text: 'Exemplo de Pizza'
    },
    tooltip: {},
    series: [
      {
        name: 'Acesso',
        type: 'pie',
        radius: '55%',
        data: [
          { value: 235, name: 'Google' },
          { value: 274, name: 'Facebook' },
          { value: 310, name: 'Twitter' }
        ]
      }
    ]
  };
   ngAfterViewInit(): void {
    // Espera o DOM montar, depois força um resize
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }
}
