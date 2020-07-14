import { Component, OnInit, Input, HostListener, OnChanges } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})


export class GraphComponent implements OnInit, OnChanges {
  @Input() newsData = [];
  chartHeight = typeof window !== 'undefined' && window.innerWidth < 768 ? '150' : '50';
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
    if (window.innerWidth < 768) {
      this.lineChartOptions.responsive = true;
      this.chartHeight = '150';
    } else {
      this.lineChartOptions.responsive = false;
      this.chartHeight = '50';
    }
  }
  ngOnChanges() {
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
