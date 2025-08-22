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

  dadosPorPeriodo: any = {
    '2015-2019': {
      anos: ['2015', '2016', '2017', '2018', '2019'],
      valores: [18000, 13000, 14500, 11500, 15000]
    },
    '2020-2024': {
      anos: ['2020', '2021', '2022', '2023', '2024'],
      valores: [15500, 16000, 17000, 21000, 23000]
    },
    'todos': {
      anos: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
      valores: [18000, 13000, 14500, 11500, 15000, 15500, 16000, 17000, 21000, 23000]
    }
  };
  currentDashboard: any;



  dashboardSets = [
    {
      title: 'Visão Financeira',
      cards: [
        { label: 'Ganhos Mensais', value: 25000 },
        { label: 'Ganhos Anuais', value: 180000 },
        { label: 'Viagens', value: 132 }
      ],
      chartOptions: {
        title: { text: 'Ganhos ao Longo do Ano' },
        tooltip: {},
        xAxis: { type: 'category', data: ['Jan', 'Fev', 'Mar', 'Abr'] },
        yAxis: { type: 'value' },
        series: [
          {
            data: [10, 20, 30, 40],
            type: 'bar'
          }
        ]
      }
    },
    {
      title: 'Visão Operacional',
      cards: [
        { label: 'Quantidade de Veículos', value: 14 },
        { label: 'Pedidos', value: 230 },
        { label: 'Motoristas Ativos', value: 8 }
      ],
      chartOptions: {
        title: { text: 'Gráfico de Pizza' },
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



  options: any;

  UpdateGraphic(periodo: string) {
    const dados = this.dadosPorPeriodo[periodo];

    this.options = {
      title: {
        text: 'Faturamento da empresa',
        left: 'center',
        top: 10,
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          return `Ano: ${params[0].name}<br/>Faturamento: R$ ${params[0].value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2
          })}`;
        }
      },
      xAxis: {
        type: 'category',
        data: dados.anos,
        name: 'Ano'
      },
      yAxis: {
        type: 'value',
        name: 'Faturamento',
        axisLabel: {
          formatter: (value: number) =>
            `R$ ${value.toLocaleString('pt-BR', {
              minimumFractionDigits: 2
            })}`
        }
      },
      series: [
        {
          data: dados.valores,
          type: 'line',
          smooth: false,
          itemStyle: {
            color: 'indigo'
          },
          lineStyle: {
            width: 2
          },
          symbolSize: 10,
          symbol: 'circle'
        }
      ]
    };
  }


  ngAfterViewInit(): void {
    // Espera o DOM montar, depois força um resize
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    });
    this.UpdateGraphic('2015-2019');
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
