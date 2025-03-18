import { Component, OnInit, inject } from '@angular/core';
import { SpeedCountService } from './speed-count.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-speed-count',
  templateUrl: './speed-count.component.html',
  styleUrls: ['./speed-count.component.css'],
  imports: [AsyncPipe],
  standalone: true,
})
export class SpeedCountComponent implements OnInit {
  private speedCountService = inject(SpeedCountService);

  timer$?: Observable<number>;

  ngOnInit(): void {
    this.timer$ = this.getTimer$();
  }
  getTimer$(): Observable<number> {
    return this.speedCountService.timer$?.pipe(map((t) => t / 10));
  }
}
