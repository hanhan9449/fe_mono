import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-keyboard-item',
  templateUrl: './keyboard-item.component.html',
  styleUrls: ['./keyboard-item.component.css'],
})
export class KeyboardItemComponent implements OnInit, OnDestroy {
  @Input() line1?: string = '';
  @Input() line2?: string;
  @Input() width?: number = defaultKeyboardItemConfig.width;
  @Input() height?: number = defaultKeyboardItemConfig.height;
  @Input() color?: ColorType = 'milk-white';
  @Input() variant?: VariantType = 'one-line';
  @Input() flag?: string[];

  isActive$?: Observable<boolean>;
  obsList = [] as Subscription[];

  constructor(private keyboardService: KeyboardService) {}

  ngOnInit(): void {
    this.checkKeyIsActive();
  }

  shouldShowLine2(): boolean {
    return this.variant === 'two-line';
  }

  getColor(): ColorType {
    if (!this.color) {
      return 'milk-white';
    }
    return this.color;
  }

  getWidth(): number {
    if (!this.width) {
      return defaultKeyboardItemConfig.width;
    }
    return this.width;
  }

  getHeight(): number {
    if (!this.height) {
      return defaultKeyboardItemConfig.height;
    }
    return this.height;
  }

  checkKeyIsActive(): void {
    let filterFn = (code: string) => !!this.flag?.includes(code);
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
