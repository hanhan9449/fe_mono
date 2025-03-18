import { Component, OnInit, input } from '@angular/core';
import { InputItemStateType } from './input-item-state.type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  imports: [NgClass],
  styleUrls: ['./input-item.component.css'],
})
export class InputItemComponent implements OnInit {
  readonly ch = input.required<string>();
  readonly state = input<InputItemStateType | undefined>('grey');

  constructor() {}

  ngOnInit(): void {}

  getState(): InputItemStateType {
    const state = this.state();
    if (!state) {
      return 'grey';
    }
    return state;
  }
  getCh(): string {
    if (this.isSpace()) {
      return '␣';
    }
    return this.ch();
  }
  isSpace(): boolean {
    return this.ch() === ' ';
  }
}
