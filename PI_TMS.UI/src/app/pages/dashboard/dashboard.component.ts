import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import html2pdf from 'html2pdf.js';
import { dashboard } from './models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true, // ESSENCIAL!
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: {
        echarts: () => import('echarts')
      }
    }
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  dashboard: dashboard = {};

  currentDashboard: any;

  dashboardSets = [
    {
      title: 'Visão Financeira',
      cards: [
        { label: 'Ganhos Mensais', value: 25000 },
        { label: 'Ganhos Anuais', value: 180000 },
        { label: 'Media de Ganhos', value: 15000 },
        { label: 'Viagens', value: 132 }
      ],
      chartOptions1: {
        title: { text: 'Ganhos ao Longo do Ano' },
        tooltip: {},
        xAxis: { type: 'category', data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'] },
        yAxis: { type: 'value' },
        series: [
          {
            data: [30000, 4000, 15000, 0, 7000, 8000],
            type: 'bar'
          }
        ]
      },
      chartOptions2: {
        title: { text: 'Quantidade de Viagem Por Mês' },
        tooltip: { trigger: 'item' },
        legend: { bottom: '0%', left: 'center' },
        series: [
          {
            name: 'Quantidade de Viagem Por Mês',
            type: 'pie',
            radius: '55%',
            data: [
              { value: 130, name: 'Jan' },
              { value: 2, name: 'Fev' },
              { value: 50, name: 'Mar' },
              { value: 0, name: 'Abr' },
              { value: 20, name: 'Mai' },
              { value: 30, name: 'Jun' }
            ]
          }
        ]
      }
    },
    {
      title: 'Visão Operacional',
      cards: [
        { label: 'Quantidade de Veículos', value: 14 },
        { label: 'Viagens no Ano', value: 230 },
        { label: 'Viagens no Mês', value: 20 },
        { label: 'Motoristas Ativos', value: 8 }
      ],
      chartOptions1: {
        title: { text: 'Distâncias Percorridas ao Longo do Ano' },
        tooltip: {},
        xAxis: { type: 'category', data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'] },
        yAxis: { type: 'value' },
        series: [
          {
            data: [400, 600, 1000, 40, 2000, 500],
            type: 'bar'
          }
        ]
      },
      chartOptions2: {
        title: { text: 'Quantidade de Viagem Por Categoria de Caminhão' },
        tooltip: { trigger: 'item' },
        legend: { bottom: '0%', left: 'center' },
        series: [
          {
            name: 'Quantidade de Viagem Por Categoria de Caminhão',
            type: 'pie',
            radius: '55%',
            data: [
              { value: 130, name: 'Caminhão truck (3-4 eixos)' },
              { value: 2, name: 'Caminhão toco (2 eixos)' },
              { value: 50, name: 'Cavalo (2-3 eixos)' },
              { value: 0, name: 'VAN' },
              { value: 20, name: 'Fechada/Baú' },
              { value: 30, name: 'Granelera' }
            ]
          }
        ]
      }
    }
  ];
  ngOnInit() {
    const saved = localStorage.getItem('dashboardIndex');
    let index = saved ? parseInt(saved) : Math.floor(Math.random() * this.dashboardSets.length);

    this.currentDashboard = this.dashboardSets[index];

    const nextIndex = (index + 1) % this.dashboardSets.length;
    localStorage.setItem('dashboardIndex', nextIndex.toString());

    // const index = Math.floor(Math.random() * this.dashboardSets.length);
    // this.currentDashboard = this.dashboardSets[index];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }

  downloadPDF() {
    const element = document.getElementById('print-section');
    const options = {
      margin: 5,
      filename: 'dashboard.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3 }, // 3x mais nítido
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    if (element) {
      html2pdf().set(options).from(element).save();
    } else {
      console.error('Elemento print-section não encontrado.');
    }
  }
}
