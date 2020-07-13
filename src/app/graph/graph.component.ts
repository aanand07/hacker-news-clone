import { Component, OnInit, Input, HostListener, OnChanges } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})


export class GraphComponent implements OnInit, OnChanges {
  @Input() newsData;
  chartHeight = '50';
  lineChartData = [{ data: [], label: 'Id vs Votes' }];
  lineChartLabels = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
    legend: { position: 'bottom' }
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'blue'
    },
  ];
  lineChartType = 'line';
  lineChartPlugins = [];

  constructor() { }

  @HostListener('window:resize') onResize() {
    this.chartHeight = window.innerWidth < 400 ? '150' : '50';
    this.assignVal();
  }
  ngOnChanges(changes) {
    console.log(changes);
    this.assignVal();
  }
  ngOnInit() {
    this.assignVal();
  }

  assignVal() {
    this.lineChartData = [{ data: [], label: 'Id vs Votes' }];
    this.lineChartLabels = [];
    this.newsData.forEach(ele => {
      this.lineChartData[0].data.push(ele.votes);
      this.lineChartLabels.push(ele.id);
    });
  }

}
