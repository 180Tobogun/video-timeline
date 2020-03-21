import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {VideoEventsHandlerService} from '../services/video-events-handler.service';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoContainerComponent implements AfterViewInit {
  @ViewChild('video') videoEl: ElementRef<HTMLVideoElement>;
  constructor(public videoEventsHandler: VideoEventsHandlerService) { }

  ngAfterViewInit(): void {
    this.videoEventsHandler.setupElement(this.videoEl.nativeElement);
  }

}
