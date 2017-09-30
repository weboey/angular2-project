import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadPictureUploadComponent } from './head-picture-upload.component';

describe('HeadPictureUploadComponent', () => {
  let component: HeadPictureUploadComponent;
  let fixture: ComponentFixture<HeadPictureUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadPictureUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadPictureUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
