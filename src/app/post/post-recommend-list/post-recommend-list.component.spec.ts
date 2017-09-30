import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRecommendListComponent } from './post-recommend-list.component';

describe('PostRecommendListComponent', () => {
  let component: PostRecommendListComponent;
  let fixture: ComponentFixture<PostRecommendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRecommendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRecommendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
