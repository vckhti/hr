import {Component, Input} from '@angular/core';
import {map, takeWhile, timer} from "rxjs";
import {DashboardModel} from "../../models/dashboardModel";

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent {
  @Input() seconds = 20 * 60;
  @Input() model: DashboardModel;

  timeRemaining$ = timer(0, 1000).pipe(
    map(n => {
      // // console.log('(this.seconds - n) * 1000', (this.seconds - n));
      this.model.testTimeLeft = this.model.testTimeLeft + 1;
      return (this.seconds - n) * 1000}),
    takeWhile(n => this.model.isTestActive() === false),
    takeWhile(n => n >= 0),
  );

}
