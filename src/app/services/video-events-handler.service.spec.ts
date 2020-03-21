import { TestBed } from '@angular/core/testing';

import { VideoEventsHandlerService } from './video-events-handler.service';

describe('VideoEventsHandlerService', () => {
  let service: VideoEventsHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoEventsHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
