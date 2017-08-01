import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormComponent } from './norm.component';

describe('NormComponent', () => {
  let component: NormComponent;
  let fixture: ComponentFixture<NormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
