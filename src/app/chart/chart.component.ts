import { Component, OnInit } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartItem,
  ChartOptions,
  registerables,
} from 'node_modules/chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  data: ChartData;
  options: ChartOptions<'doughnut'>;
  plugins: any = [ChartDataLabels];

  constructor() {
    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [5000, 1500, 2500],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          borderWidth: 10,
          /*           hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          borderColor: 'white',
          hoverBorderColor: 'white', */
          hoverBorderColor: 'white',
        },
      ],
    };
    this.options = {
      cutout: '40%',
      rotation: -65,
      responsive: true,
      layout: {
        padding: 50,
      },
      plugins: {
        datalabels: {
          backgroundColor: 'green' /*
          borderRadius: 15, */,
          display: true,
          anchor: 'end',
          align: 'end',
          clamp: true,
          formatter: function (v, context) {
            return 'Bs ' + v;
          },
          font: {
            weight: 'bold',
            size: 15,
          },
          padding: {
            top: 15,
            bottom: 20,
            right: 30,
            left: 11,
          },
        },
        tooltip: {
          displayColors: true,
          borderWidth: 1,
          boxPadding: 1,
          callbacks: {
            labelColor: function (context) {
              return {
                borderColor: context.element.options[
                  'backgroundColor'
                ] as string,
                backgroundColor: context.element.options[
                  'backgroundColor'
                ] as string,
                borderWidth: 3,
                borderRadius: 0,
              };
            },
          },
        },
      },
    };
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    Chart.register(...registerables);
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          data: [300, 50, 100],
        },
      ],
    };
    /* const data = {
      datasets: [
        {
          label: 'First Dataset',
          data: [
            {
              x: 20,
              y: 30,
              r: 15,
            },
            {
              x: 40,
              y: 10,
              r: 10,
            },
          ],
          backgroundColor: 'rgb(255, 99, 132)',
        },
      ],
    }; */
    /* this.data = data; */
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          display: false,
        },
      },
      borderWidth: 20,
      cutout: 20,
    };
    const config: ChartConfiguration = {
      type: 'doughnut',
      data: data,
      options: options,
    };
    /* const config: ChartConfiguration = {
      type: 'bubble',
      data: data,
      options: {},
    }; */
    const chartItem: ChartItem = document.getElementById(
      'my-chart'
    ) as ChartItem;
    new Chart(chartItem, config);
  }
}
