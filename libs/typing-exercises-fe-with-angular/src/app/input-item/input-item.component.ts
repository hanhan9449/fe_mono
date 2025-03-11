import { Component, Input, OnInit } from '@angular/core';
import { InputItemStateType } from './input-item-state.type';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  imports: [
    NgClass
  ],
  styleUrls: ['./input-item.component.css']
})
export class InputItemComponent implements OnInit {
  @Input() ch!: string;
  @Input() state?: InputItemStateType = 'grey';

  constructor() {}

  ngOnInit(): void {}

  getState(): InputItemStateType {
    if (!this.state) {
      return 'grey';
    }
    return this.state;
  }
  getCh(): string {
    if (this.isSpace()) {
      return '␣';
    }
    return this.ch;
  }
  isSpace(): boolean {
    return this.ch === ' ';
  }
}
