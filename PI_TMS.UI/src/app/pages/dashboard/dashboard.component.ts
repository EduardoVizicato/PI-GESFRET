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
  SelectedDashboard:any;

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
    const dashboardQuant = ['DashboardFinance', 'DashboardOperationational'];
    const saved = localStorage.getItem('dashboardIndex');
    let index = saved ? parseInt(saved) : Math.floor(Math.random() * dashboardQuant.length);

    this.SelectedDashboard = dashboardQuant[index];
    if (this.SelectedDashboard === 'DashboardFinance') {
      this.DashboardFinance();
    } else if (this.SelectedDashboard === 'DashboardOperationational') {
      this.DashboardOperationational();
    }

    const nextIndex = (index + 1) % dashboardQuant.length;
    localStorage.setItem('dashboardIndex', nextIndex.toString());
    // const index = Math.floor(Math.random() * this.dashboardSets.length);
    // this.currentDashboard = this.dashboardSets[index];
  }
  DashboardFinance() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let monthGainTot = 0;
    let anualGain = 0;
    let anualCount = 0;

    const monthGain: number[] = new Array(12).fill(0);
    const quantMonth: number[] = new Array(12).fill(0);

    const msPerDay = 24 * 60 * 60 * 1000;

    for (const travel of this.travels) {
      const fv = Number(travel.price) || 0;

      const start = travel.startDate ? new Date(travel.startDate) : null;
      const end = travel.endDate ? new Date(travel.endDate) : null;

      const validStart = start instanceof Date && !isNaN(start.getTime());
      const validEnd = end instanceof Date && !isNaN(end.getTime());

      if (!validStart || !validEnd) {
        continue;
      }

      if (end.getTime() < start.getTime()) {
        continue;
      }

      const yearStart = new Date(currentYear, 0, 1);
      const yearEnd = new Date(currentYear, 11, 31, 23, 59, 59, 999);

      const overlapStart = start.getTime() < yearStart.getTime() ? yearStart : start;
      const overlapEnd = end.getTime() > yearEnd.getTime() ? yearEnd : end;

      if (overlapStart.getTime() > overlapEnd.getTime()) {
        // não há sobreposição com o ano atual -> pular (não conta para ganhos/quantidades do ano atual)
        continue;
      }


      const totalTripDays = Math.floor((end.getTime() - start.getTime()) / msPerDay) + 1;

      anualCount++;

      const daysInYearOverlap = Math.floor((overlapEnd.getTime() - overlapStart.getTime()) / msPerDay) + 1;
      const valueInYear = totalTripDays > 0 ? (fv * (daysInYearOverlap / totalTripDays)) : 0;
      anualGain += valueInYear;


      let iter = new Date(overlapStart.getFullYear(), overlapStart.getMonth(), 1);
      const lastIter = new Date(overlapEnd.getFullYear(), overlapEnd.getMonth(), 1);

      while (iter.getTime() <= lastIter.getTime()) {
        const monthIndex = iter.getMonth();


        const monthFirst = new Date(iter.getFullYear(), iter.getMonth(), 1);
        const monthLast = new Date(iter.getFullYear(), iter.getMonth() + 1, 0, 23, 59, 59, 999);


        const segStart = start.getTime() > monthFirst.getTime() ? start : monthFirst;
        const segEnd = end.getTime() < monthLast.getTime() ? end : monthLast;

        if (segStart.getTime() <= segEnd.getTime()) {
          const daysCovered = Math.floor((segEnd.getTime() - segStart.getTime()) / msPerDay) + 1;

          const valueForThisMonth = totalTripDays > 0 ? fv * (daysCovered / totalTripDays) : 0;
          monthGain[monthIndex] += valueForThisMonth;

          quantMonth[monthIndex] += 1;
        }

        iter = new Date(iter.getFullYear(), iter.getMonth() + 1, 1);
      }
    }

    monthGainTot = monthGain[currentMonth];

    this.monthGain = monthGain;
    const monthGainTotal = monthGainTot;
    this.anualGain = anualGain;
    this.averageGain = anualCount > 0 ? anualGain / anualCount : 0;
    this.totalTravels = this.travels.length;

    const monthGainRounded = monthGain.map(v => Math.round((v + Number.EPSILON) * 100) / 100);

    this.dashboardSets = [
      {
        title: 'Visão Financeira',
        cards: [
          { label: 'Ganhos desse Mês', value: monthGainTotal },
          { label: 'Ganho desse Ano', value: this.anualGain },
          { label: 'Media de Ganhos desse ano', value: this.averageGain },
          { label: 'Total de Viagens Cadastradas', value: this.totalTravels }
        ],
        chartOptions1: {
          title: { text: 'Ganhos ao Longo do Ano' },
          tooltip: {},
          xAxis: { type: 'category', data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] },
          yAxis: { type: 'value' },
          series: [
            {
              data: monthGainRounded,
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
                { value: quantMonth[0], name: 'Jan' },
                { value: quantMonth[1], name: 'Fev' },
                { value: quantMonth[2], name: 'Mar' },
                { value: quantMonth[3], name: 'Abr' },
                { value: quantMonth[4], name: 'Mai' },
                { value: quantMonth[5], name: 'Jun' },
                { value: quantMonth[6], name: 'Jul' },
                { value: quantMonth[7], name: 'Ago' },
                { value: quantMonth[8], name: 'Set' },
                { value: quantMonth[9], name: 'Out' },
                { value: quantMonth[10], name: 'Nov' },
                { value: quantMonth[11], name: 'Dez' }
              ]
            }
          ]
        }
      }
    ];
    this.currentDashboard = this.dashboardSets[0];
  }
  DashboardOperationational() {
    this.dashboardSets = [
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
    this.currentDashboard = this.dashboardSets[0];
  }
  ngOnInit() {
    this.getTravelValues();
    // this.setValues();
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


