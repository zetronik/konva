import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartComponentLike, ChartConfiguration, ChartEvent, ChartType, LegendItem} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {htmlLegendPlugin} from "./helpers/legends.helper";

// import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  private newLabel? = 'New label';

  private greenGradient!: CanvasGradient;
  private blueGradient!: CanvasGradient;

  constructor() {}

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: <any[]>[
          {date: 'Feb 2021', value: 7},
          {date: '', value: 15},
          {date: '', value: 21},
          {date: '', value: 13},
          {date: '', value: 21},
          {date: '', value: 14},
          {date: '', value: 15},
          {date: '', value: 21},
          {date: '', value: 13},
          {date: '', value: 21},
          {date: '', value: 14},
          {date: 'Feb 2022', value: 13},
        ],
        label: 'Series A',
        borderColor: '#3377FF',
        backgroundColor: '',
        pointStyle: false,
        borderDash: [4, 4],
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'value'
        },
      },
      {
        data: <any[]>[
          {date: 'Feb 2021', value: 3},
          {date: '', value: 12},
          {date: '', value: 23},
          {date: '', value: 22},
          {date: '', value: 28},
          {date: '', value: 12},
          {date: '', value: 7},
          {date: '', value: 23},
          {date: '', value: 4},
          {date: '', value: 28},
          {date: '', value: 15},
          {date: 'Feb 2022', value: 12},
        ],
        label: 'Series B',
        borderColor: '#FFBB33',
        borderWidth: 2,
        pointStyle: false,
        fill: false,
        tension: 0.3,
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'value'
        },
      },
      {
        data: <any[]>[
          {date: 'Feb 2021', value: 10},
          {date: '', value: 18},
          {date: '', value: 16},
          {date: '', value: 14},
          {date: '', value: 17},
          {date: '', value: 2},
          {date: '', value: 18},
          {date: '', value: 16},
          {date: '', value: 14},
          {date: '', value: 17},
          {date: '', value: 8},
          {date: 'Feb 2022', value: 18},
        ],
        label: 'Series C',
        borderColor: '#2E9E66',
        borderWidth: 2,
        pointStyle: false,
        fill: 'origin',
        tension: 0.3,
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'value'
        },
      }
    ],
    labels: ['Feb 2021', '', '', '', '', '', '', '', '', '', '', 'Feb 2022']
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 0.5,
        borderColor: '#EAECF0',
      }
    },
    scales: {
      x: {
        display: true,
        ticks: {
          callback: function (value, index, ticks) {
            return (ticks[0].value === value || ticks[ticks.length -1].value === value) ? this.getLabelForValue(value) + 1 : null;
          }
        }
      },
      y: {
        display: true,
        position: 'right',
        border: {
          dash: [4, 4]
        },
        min: 1,
      }
    },
    plugins: {
      // @ts-ignore
      htmlLegend: {
        containerID: 'legend',
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false
      }
    }
  };

  public lineChartPlugins: ChartComponentLike[] = [htmlLegendPlugin]

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef;

  ngOnInit() {
    this.lineChartData.datasets[2].backgroundColor = this.getFillGradient('5, 148, 79', '0.6');
  }

  getFillGradient(rgb: string, opacity: string): CanvasGradient {
    const ctx = (this.canvas?.nativeElement as HTMLCanvasElement)?.getContext('2d');
    const fillGradient = ctx!.createLinearGradient(0, 0, 0, 460)
    fillGradient.addColorStop(0, `rgba(${rgb}, ${opacity})`)
    fillGradient.addColorStop(1, `rgba(${rgb}, 0)`)
    return fillGradient;
  }

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = ChartComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x, i) => {
      const num = ChartComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(`Label ${ this.lineChartData.labels.length }`);

    this.chart?.update();
  }

  public changeColor(): void {
    // this.lineChartData.datasets[2].borderColor = 'green';
    // this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
    //
    // this.chart?.update();
  }

  public changeLabel(): void {
    const tmp = this.newLabel;
    this.newLabel = this.lineChartData.datasets[2].label;
    this.lineChartData.datasets[2].label = tmp;

    this.chart?.update();
  }
}
