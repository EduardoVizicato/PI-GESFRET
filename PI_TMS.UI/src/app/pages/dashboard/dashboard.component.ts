import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import html2pdf from 'html2pdf.js';
import { Travel } from './models/dashboard.model';
import { DashboardService } from './services/dashboard.service';
import { EventService } from '../../shared/service/event.service';

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
export class DashboardComponent implements OnInit {
  dashboardSets: { title: string; cards: { label: string; value: any; }[]; chartOptions1: { title: { text: string; }; tooltip: {}; xAxis: { type: string; data: string[]; }; yAxis: { type: string; }; series: { data: number[]; type: string; }[]; }; chartOptions2: { title: { text: string; }; tooltip: { trigger: string; }; legend: { bottom: string; left: string; }; series: { name: string; type: string; radius: string; data: { value: number; name: string; }[]; }[]; }; }[] | undefined;

  constructor(private dashboardService: DashboardService, private eventService: EventService) { }


  travels: Travel[] = [];
  monthGain: any;
  anualGain: any;
  averageGain: any;
  totalTravels: any;
  currentDashboard: any;

  getTravelValues() {
    this.dashboardService.getAllTravel(false).subscribe(
      (response) => {
        this.travels = response || [];
        this.setValues()
      },
      (error) => {
        this.eventService.showError('Erro inesperado.');
      }
    );
  }

  setValues() {
    const now = new Date();
    const currentMonth = now.getMonth(); // 0..11
    const currentYear = now.getFullYear();

    let monthGain = 0;
    let anualGain = 0;
    let anualCount = 0;

    for (const travel of this.travels) {
      const fv = Number(travel.price) || 0;
      // console.log(fv)
      
      const start = travel.startDate ? new Date(travel.startDate) : null;
      // console.log(start)
      const end = travel.endDate ? new Date(travel.endDate) : null;
      // console.log(end)

      const validStart = start instanceof Date && !isNaN(start.getTime());
      const validEnd = end instanceof Date && !isNaN(end.getTime());

      if (!validStart || !validEnd) {
        continue;
      }

      // Ganho anual: ambos no ano atual
      if (start.getFullYear() === currentYear && end.getFullYear() === currentYear) {
        anualGain += fv;
        anualCount++;

        // Ganho mensal: além de estarem no mesmo ano, também no mesmo mês atual
        if (start.getMonth() === currentMonth && end.getMonth() === currentMonth) {
          monthGain += fv;
        }
      }
    }

    this.monthGain = monthGain;
    this.anualGain = anualGain;
    this.averageGain = anualCount > 0 ? anualGain / anualCount : 0;
    this.totalTravels = this.travels.length;
    // console.log(monthGain)
    // console.log(anualGain)
    // console.log(this.averageGain)
    // console.log(this.totalTravels)

    this.dashboardSets = [
      {
        title: 'Visão Financeira',
        cards: [
          { label: 'Ganhos desse Mês', value: this.monthGain },
          { label: 'Ganho desse Ano', value: this.anualGain },
          { label: 'Media de Ganhos desse ano', value: this.averageGain },
          { label: 'Total de Viagens Cadastradas', value: this.totalTravels }
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
    const saved = localStorage.getItem('dashboardIndex');
    let index = saved ? parseInt(saved) : Math.floor(Math.random() * this.dashboardSets.length);

    this.currentDashboard = this.dashboardSets[index];

    const nextIndex = (index + 1) % this.dashboardSets.length;
    localStorage.setItem('dashboardIndex', nextIndex.toString());
    // const index = Math.floor(Math.random() * this.dashboardSets.length);
    // this.currentDashboard = this.dashboardSets[index];
  }
  ngOnInit() {
    this.getTravelValues();
    this.setValues();
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


