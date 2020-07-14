import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphComponent } from './graph.component';

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('assignVal should assign data in lineChartData and lineChartLabels', () => {
    component.newsData = [{votes:12, id:1}, {votes:10, id:2}];
    component.assignVal();
    expect(component.lineChartData[0].data[0]).toEqual(12);
    expect(component.lineChartLabels[0]).toEqual(1);
    expect(component.lineChartData[0].data[1]).toEqual(10);
    expect(component.lineChartLabels[1]).toEqual(2);
  })
});
