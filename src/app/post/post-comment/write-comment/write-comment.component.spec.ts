import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteCommentComponent } from './write-comment.component';

describe('WriteCommentComponent', () => {
  let component: WriteCommentComponent;
  let fixture: ComponentFixture<WriteCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
