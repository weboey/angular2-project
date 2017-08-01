import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDetailNavComponent } from './component-detail-nav.component';

describe('ComponentDetailNavComponent', () => {
  let component: ComponentDetailNavComponent;
  let fixture: ComponentFixture<ComponentDetailNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentDetailNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDetailNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
