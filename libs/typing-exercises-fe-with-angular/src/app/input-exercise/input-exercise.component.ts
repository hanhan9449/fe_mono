import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, inject, viewChild } from '@angular/core';
import { InputItemStateType } from '../input-item/input-item-state.type';
import { KeyboardService } from '../keyboard/keyboard.service';
import {
  EMPTY,
  filter,
  fromEvent,
  iif,
  map,
  mergeWith,
  Observable,
  pluck,
  repeat,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { SpeedCountService } from '../speed-count/speed-count.service';
import { AsyncPipe, NgClass } from "@angular/common";
import {CaretComponent} from "../caret/caret.component";
import {InputItemComponent} from "../input-item/input-item.component";

@Component({
  selector: 'app-input-exercise',
  templateUrl: './input-exercise.component.html',
  imports: [
    NgClass,
    AsyncPipe,
    CaretComponent,
    InputItemComponent
],
  styleUrls: ['./input-exercise.component.css']
})
export class InputExerciseComponent
  implements OnInit, AfterViewChecked, AfterViewInit
{
  private keyboardService = inject(KeyboardService);
  private speedCountService = inject(SpeedCountService);


  readonly container = viewChild<ElementRef<HTMLDivElement>>('container');

  testText =
    'Once upon a time there was a sweet little girl. Everyone who saw her liked her, but most of all her grandmother, who did not know what to give the child next. Once she gave her a little cap made of red velvet. Because it suited her so well, and she wanted to wear it all the time, she came to be known as Little Red Riding Hood. One day her mother said to her: "Come Little Red Riding Hood. Here is a piece of cake and a bottle of wine. Take them to your grandmother. She is sick and weak, and they will do her well. Mind your manners and give her my greetings. Behave yourself on the way, and do not leave the path, or you might fall down and break the glass, and then there will be nothing for your sick grandmother."';
  start = 0;
  end = this.testText.length >> 1;
  strings = this.testText.slice(this.start, this.end);
  errIndexList = new Set<number>();
  current = 0;
  focusState$?: Observable<boolean>;

  getState(index: number): InputItemStateType {
    if (this.current > index) {
      if (this.errIndexList.has(index)) {
        return 'red';
      }
      return 'black';
    }

    return 'grey';
  }

  ngOnInit(): void {}

  initInputFocusLogic(): void {
    const container = this.container();
    if (container) {
      const inputFocus$ = fromEvent(container.nativeElement, 'focus');
      const inputBlur$ = fromEvent(container.nativeElement, 'blur');
      this.focusState$ = inputFocus$.pipe(
        map((_) => true),
        mergeWith(inputBlur$.pipe(map((_) => false)))
      );
    }
    this.focusState$?.pipe(filter((b) => !b)).subscribe((_) => {
      this.errIndexList.clear();
      this.current = this.start;
      this.speedCountService.endTimerCount();
    });
  }

  initKeyboardLogic(): void {
    const keyboardChar$ = this.keyboardService.keyDown$.pipe(
      pluck('key'),
      filter((key) => key.length === 1),
      takeUntil(this.focusState$?.pipe(filter((a) => !a)) ?? EMPTY),
      repeat({
        delay: () => this.focusState$?.pipe(filter((a) => a)) ?? EMPTY,
      }),
      tap(() => {
        if (this.start === this.current) {
          this.speedCountService.startTimerCount();
        }
      })
    );
    keyboardChar$.subscribe((ch) => {
      if (ch !== this.strings[this.current]) {
        this.errIndexList.add(this.current);
      }
      if (ch === this.strings[this.current]) {
        this.current++;
      }
      if (this.current === this.end) {
        this.speedCountService.endTimerCount();
        this.current = this.start;
        this.errIndexList.clear();
      }
    });
  }

  ngAfterViewChecked(): void {}

  ngAfterViewInit(): void {
    this.initInputFocusLogic();
    this.initKeyboardLogic();
  }
}
