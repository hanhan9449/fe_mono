import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedCountComponent } from './speed-count.component';

@NgModule({
  declarations: [SpeedCountComponent],
  exports: [SpeedCountComponent],
  imports: [CommonModule],
})
export class SpeedCountModule {}
