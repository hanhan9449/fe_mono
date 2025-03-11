import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { VariantType } from './variant.type';
import { defaultKeyboardItemConfig } from '../keyboard/keyboard.config';
import { ColorType } from './keyboard-item.interface';
import { KeyboardService } from '../keyboard/keyboard.service';
import {
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  share,
  Subscription,
  tap,
} from 'rxjs';
import { AsyncPipe, NgClass } from "@angular/common";

@Component({
  selector: 'app-keyboard-item',
  templateUrl: './keyboard-item.component.html',
  imports: [
    NgClass,
    AsyncPipe
],
  styleUrls: ['./keyboard-item.component.css']
})
export class KeyboardItemComponent implements OnInit, OnDestroy {
  private keyboardService = inject(KeyboardService);

  readonly line1 = input<string | undefined>('');
  readonly line2 = input<string>();
  readonly width = input<number | undefined>(defaultKeyboardItemConfig.width);
  readonly height = input<number | undefined>(defaultKeyboardItemConfig.height);
  readonly color = input<ColorType | undefined>('milk-white');
  readonly variant = input<VariantType | undefined>('one-line');
  readonly flag = input<string[]>();

  isActive$?: Observable<boolean>;
  obsList = [] as Subscription[];

  ngOnInit(): void {
    this.checkKeyIsActive();
  }

  shouldShowLine2(): boolean {
    return this.variant() === 'two-line';
  }

  getColor(): ColorType {
    const color = this.color();
    if (!color) {
      return 'milk-white';
    }
    return color;
  }

  getWidth(): number {
    const width = this.width();
    if (!width) {
      return defaultKeyboardItemConfig.width;
    }
    return width;
  }

  getHeight(): number {
    const height = this.height();
    if (!height) {
      return defaultKeyboardItemConfig.height;
    }
    return height;
  }

  checkKeyIsActive(): void {
    let filterFn = (code: string) => !!this.flag()?.includes(code);
    const currentCodeOnlyKeyDown$ = this.keyboardService.keyDownCode$.pipe(
      filter(filterFn)
    );
    const currentCodeOnlyKeyUp$ = this.keyboardService.keyUpCode$.pipe(
      filter(filterFn)
    );

    this.isActive$ = merge(
      currentCodeOnlyKeyDown$.pipe(map((_) => true)),
      currentCodeOnlyKeyUp$.pipe(map((_) => false))
    ).pipe(distinctUntilChanged(), share());
  }

  ngOnDestroy(): void {
    for (const obs of this.obsList) {
      obs.unsubscribe();
    }
  }
}
