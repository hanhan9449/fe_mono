import { Component, OnInit } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import {
  defaultKeyboardItemConfig,
  hhkbKeyboardConfig,
} from './keyboard.config';
import { KeyboardItemInterface } from '../keyboard-item/keyboard-item.interface';
import { KeyboardItemComponent } from '../keyboard-item/keyboard-item.component';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
  imports: [KeyboardItemComponent, NgClass, AsyncPipe],
  standalone: true,
})
export class KeyboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  getKeyboardGap$(): number {
    return defaultKeyboardItemConfig.gap;
  }
  getDefaultWidth$(): number {
    return defaultKeyboardItemConfig.width;
  }
  getDefaultHeight$(): number {
    return defaultKeyboardItemConfig.height;
  }
  getHHKBKeyboardConfig$(): Observable<KeyboardItemInterface[][]> {
    return of(hhkbKeyboardConfig);
  }
  isLastLine(index: number): boolean {
    return index === hhkbKeyboardConfig.length - 1;
  }
}
