import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { HttpClientModule } from '@angular/common/http';

describe('FileService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [FileService]
    });
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of all fileIds', () => {
    expect(service.getFiles()).toBeTruthy();
  });

  it('should upload a file', () => {
    expect(service.uploadFile(new FormData())).toBeTruthy();
  });
});
