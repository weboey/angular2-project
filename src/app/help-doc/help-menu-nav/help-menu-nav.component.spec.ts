import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpMenuNavComponent } from './help-menu-nav.component';

describe('HelpMenuNavComponent', () => {
  let component: HelpMenuNavComponent;
  let fixture: ComponentFixture<HelpMenuNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpMenuNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpMenuNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
