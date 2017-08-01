import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDetailContentComponent } from './component-detail-content.component';

describe('ComponentDetailContentComponent', () => {
  let component: ComponentDetailContentComponent;
  let fixture: ComponentFixture<ComponentDetailContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentDetailContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
