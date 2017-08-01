import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsDetailComponent } from './tool-detail.component.ts';

describe('ToolsDetailComponent', () => {
  let component: ToolsDetailComponent;
  let fixture: ComponentFixture<ToolsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
