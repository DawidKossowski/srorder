import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import {fadeInAnimation} from "../router.animations";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  public carouselConfig = {
    grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
    slide: 1,
    speed: 400,
    point: {
      visible: true
    },
    load: 2,
    touch: true,
    loop: true,
    custom: 'banner'
  };

  public chartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public chartData: Array<number[]> = [[350, 450, 100], [5000, 2700, 1250], [5000, 4000, 3000], [8, 3, 5]];
  public chartDataTest: Array<number[]> = [];
  public chartType: string[] = ['doughnut', 'pie', 'horizontalBar', 'pie'];

  public iterator = [0, 1, 2, 3];

  constructor() { }

  ngOnInit() {
    this.chartData.forEach((e, idx) => {
      this.chartDataTest.push(new Array);
      e.forEach((e2, idx2) => {
        this.chartDataTest[idx].push(0);
      });
    });

    setTimeout(() => this.clearSlide(0), 500);
  }

  update(el) {
    this.clearSlide(el.currentSlide);
  }

  clearSlide(index) {
    for (let i = 0; i < this.chartDataTest.length; i++) {
      if (index === i) {
        this.chartDataTest[i] = this.chartData[i];
      } else {
        this.chartDataTest[i] = [];
        this.chartData[i].forEach((el, idx) => {
          this.chartDataTest[i].push(0);
        });
      }
    };
  }
}
