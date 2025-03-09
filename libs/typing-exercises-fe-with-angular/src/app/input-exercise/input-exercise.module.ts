import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputExerciseComponent } from './input-exercise.component';
import { InputItemComponent } from '../input-item/input-item.component';
import { CaretComponent } from '../caret/caret.component';

@NgModule({
  declarations: [InputExerciseComponent, InputItemComponent, CaretComponent],
  exports: [InputExerciseComponent],
  imports: [CommonModule],
})
export class InputExerciseModule {}
