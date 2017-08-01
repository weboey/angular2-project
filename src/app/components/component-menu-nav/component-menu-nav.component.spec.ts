import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentNavComponent } from './component-nav.component.ts';

describe('ComponentNavComponent', () => {
  let component: ComponentNavComponent;
  let fixture: ComponentFixture<ComponentNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
