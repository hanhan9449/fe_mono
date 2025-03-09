import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardItemComponent } from './keyboard-item.component';

describe('KeyboardItemComponent', () => {
  let component: KeyboardItemComponent;
  let fixture: ComponentFixture<KeyboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyboardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
