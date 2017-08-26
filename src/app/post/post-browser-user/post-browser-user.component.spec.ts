import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBrowserUserComponent } from './post-browser-user.component';

describe('PostBrowserUserComponent', () => {
  let component: PostBrowserUserComponent;
  let fixture: ComponentFixture<PostBrowserUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBrowserUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBrowserUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
