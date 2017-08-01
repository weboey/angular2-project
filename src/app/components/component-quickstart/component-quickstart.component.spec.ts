import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentQuickstartComponent } from './component-quickstart.component';

describe('ComponentQuickstartComponent', () => {
  let component: ComponentQuickstartComponent;
  let fixture: ComponentFixture<ComponentQuickstartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentQuickstartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentQuickstartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
