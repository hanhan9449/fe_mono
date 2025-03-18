import { Injectable } from '@angular/core';
import {
  EMPTY,
  interval,
  Observable,
  repeat,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeedCountService {
  timerStart$ = new Subject<void>();
  timerEnd$ = new Subject<void>();

  timer$!: Observable<number>;
  currentSpeed$?: Observable<number>;

  constructor() {
    this.timer$ = this.timerStart$.pipe(
      switchMap(() => interval(100)),
      takeUntil(this.timerEnd$),
      repeat(),
    );
  }

  startTimerCount(): void {
    this.timerStart$.next();
  }

  endTimerCount(): void {
    this.timerEnd$.next();
  }
}
