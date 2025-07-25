import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';


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
        echarts: () => import('echarts') // 🔥 aqui resolvemos o problema
      }
    }
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

 // Dados de diferentes períodos
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

  // Opções iniciais
  options: any;

   atualizarGrafico(periodo: string) {
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
    this.atualizarGrafico('2015-2019');
  }
}
