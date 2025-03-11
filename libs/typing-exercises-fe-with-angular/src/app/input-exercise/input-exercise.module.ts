import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputExerciseComponent } from './input-exercise.component';
import { InputItemComponent } from '../input-item/input-item.component';
import { CaretComponent } from '../caret/caret.component';

@NgModule({
  declarations: [],
  exports: [InputExerciseComponent],
  imports: [CommonModule,InputExerciseComponent, InputItemComponent, CaretComponent],
})
export class InputExerciseModule {}
