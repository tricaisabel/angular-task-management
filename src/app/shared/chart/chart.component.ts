import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType, GoogleChartComponent, Row } from 'angular-google-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {
  @Input() progress: string;
  @Input() assigned: string;
  @Input() onTrack: string;

  @ViewChild('googlechart') googlechart: GoogleChartComponent;
  chart = {
    type: ChartType.Gauge,
    data: [
      ['Progress', 50],
      ['Assigned', 50],
      ['On track', 50],
    ],
    title: 'Gauge',
    options: {
      width: 300,
      height: 100,
      greenColor: '#e6edfd',
      greenFrom: 50,
      greenTo: 100,
      redColor: '#3f51b5',
      redFrom: 0,
      redTo: 15,
      yellowColor: '#91b3fa',
      yellowFrom: 15,
      yellowTo: 50,
      minorTicks: 5,
    },
  };

  ngOnInit(): void {
    this.chart.data[0][1] = parseInt(this.progress);
    this.chart.data[1][1] = parseInt(this.assigned);
    this.chart.data[2][1] = parseInt(this.onTrack);
  }
}
