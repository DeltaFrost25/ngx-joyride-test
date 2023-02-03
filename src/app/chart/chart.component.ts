import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  data!: ChartData;
  options!: ChartOptions<'doughnut'>;
  plugins: any = [ChartDataLabels];
  @ViewChild('myCanvas') canvas!: ElementRef;
  constructor() {}

  ngOnInit(): void {
    let canvas = document.querySelector(
      'p-chart div canvas'
    ) as HTMLCanvasElement;
    let ctx = canvas.getContext('2d');
    let colors = this.generateGradientGroup(
      ['#FF691A', '#004E9B', '#009FDA'],
      canvas
    );
    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [5000, 1500, 2500],
          backgroundColor: colors,
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
        legend: {
          display: false,
        },
        datalabels: {
          /* backgroundColor: 'green'
          borderRadius: 15, ,*/
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

  generateGradientGroup(colors: string[], canvas: HTMLCanvasElement) {
    let gradientArray: CanvasGradient[] = [];
    colors.forEach((color) =>
      gradientArray.push(this.generateGradient(color, canvas))
    );
    return gradientArray;
  }

  generateGradient(
    color: string = '#004E9B',
    canvas: HTMLCanvasElement
  ): CanvasGradient {
    let ctx = canvas.getContext('2d');
    let gradient = ctx!.createRadialGradient(250, 275, 0, 250, 275, 416.23);
    if (color === '#004E9B') {
      gradient.addColorStop(0, '#009FDA');
      gradient.addColorStop(0.4, '#004E9B');
      return gradient;
    }
    gradient.addColorStop(0, 'rgba(247, 247, 247, 1)');
    gradient.addColorStop(0.4, color);
    return gradient;
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
