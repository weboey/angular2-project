import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UedInputComponent } from './ued-input.component';

describe('UedInputComponent', () => {
  let component: UedInputComponent;
  let fixture: ComponentFixture<UedInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UedInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
