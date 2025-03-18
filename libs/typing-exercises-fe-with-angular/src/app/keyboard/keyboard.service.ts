import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, pluck, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyboardService implements OnInit, OnDestroy {
  obsList = [] as Subscription[];
  keyDown$!: Observable<KeyboardEvent>;
  keyup$!: Observable<KeyboardEvent>;
  keyDownCode$!: Observable<string>;
  keyUpCode$!: Observable<string>;

  constructor() {
    this.keyDown$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
      tap((e) => e.preventDefault()),
    );
    this.keyup$ = fromEvent<KeyboardEvent>(window, 'keyup');
    this.keyDownCode$ = this.keyDown$.pipe(pluck('code'));
    this.keyUpCode$ = this.keyup$.pipe(pluck('code'));
  }

  ngOnDestroy() {
    for (const obs of this.obsList) {
      obs.unsubscribe();
    }
  }

  ngOnInit(): void {}
}
