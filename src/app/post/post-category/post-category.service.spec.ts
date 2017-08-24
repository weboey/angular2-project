import { TestBed, inject } from '@angular/core/testing';

import { PostCategoryService } from './post-category.service';

describe('PostCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostCategoryService]
    });
  });

  it('should be created', inject([PostCategoryService], (service: PostCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
