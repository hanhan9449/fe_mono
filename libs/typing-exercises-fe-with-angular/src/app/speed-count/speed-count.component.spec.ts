import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedCountComponent } from './speed-count.component';

describe('SpeedCountComponent', () => {
  let component: SpeedCountComponent;
  let fixture: ComponentFixture<SpeedCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeedCountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeedCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
