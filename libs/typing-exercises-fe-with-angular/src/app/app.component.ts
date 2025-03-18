import { Component } from '@angular/core';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { InputExerciseComponent } from './input-exercise/input-exercise.component';
import { SpeedCountComponent } from './speed-count/speed-count.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [KeyboardComponent, InputExerciseComponent, SpeedCountComponent],
  standalone: true,
})
export class AppComponent {
  title = 'typing-exercises-fe-with-angular';
}
