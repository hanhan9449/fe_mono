import { Component, OnInit } from '@angular/core';
import { SpeedCountService } from './speed-count.service';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-speed-count',
    templateUrl: './speed-count.component.html',
    styleUrls: ['./speed-count.component.css'],
    standalone: false
})
export class SpeedCountComponent implements OnInit {
  timer$?: Observable<number>;

  constructor(private speedCountService: SpeedCountService) {}

  ngOnInit(): void {
    this.timer$ = this.getTimer$();
  }
  getTimer$(): Observable<number> {
    return this.speedCountService.timer$?.pipe(map((t) => t / 10));
  }
}
