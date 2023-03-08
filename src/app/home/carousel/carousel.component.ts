import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  tabIndex = 0;

  ngOnInit() {
    const source = timer(5000, 5000);
    this.subscription = source.subscribe((val) => this.changeTabIndex(1));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public changeTabIndex(value: number) {
    const tabCount = 3;
    if (this.tabIndex + value < 0) {
      this.tabIndex = 3;
    }
    this.tabIndex = (this.tabIndex + value) % tabCount;
  }

  public arrowClicked(value: number) {
    this.changeTabIndex(value);
    this.subscription.unsubscribe();
  }
}
