import {AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {VideoEventsHandlerService} from '../services/video-events-handler.service';
import {GameEvent} from '../models/game-event';
import * as d3 from 'd3-scale';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements AfterViewInit, OnChanges {
  @ViewChild('sliderContainer') sliderContainer: ElementRef<HTMLDivElement> ;
  @Input() currentTime: number;
  @Input() duration: number;
  @Input() gameEvents: GameEvent[];
  eventWidth = 30;
  viewReady = false;

  public timerangeScale: d3.ScaleLinear<number, number>;

  constructor(private videoEvents: VideoEventsHandlerService) {}

  public setTime(time: number) {
    this.videoEvents.setVideoTime(time);
  }

  public format(time) {
    // Hours, minutes and seconds
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

    let ret = '';
    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  }

  public calculateTimeRangeScale(): void {
    if (this.viewReady) {
      this.timerangeScale = d3.scaleLinear()
        .domain([0, this.duration])
        .range([0, this.sliderContainer.nativeElement.offsetWidth]);
      this.gameEvents = this.gameEvents.map(e => {
        return {
          ...e,
          left: this.timerangeScale(e.time)
        };
      });
      this.gameEvents.forEach((event, index) => {
        const nextIndex = index + 1;
        if (nextIndex < this.gameEvents.length - 1) {
          const nextEvent = this.gameEvents[index + 1];
          const currentRightPosition = event.left + this.eventWidth / 2;
          const nextLeftPosition = nextEvent.left - this.eventWidth / 2;
          const eventsOverlaps = currentRightPosition >= nextLeftPosition;
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.calculateTimeRangeScale();
    this.viewReady = true;
  }

  @HostListener('window:resize', ['$event'])
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['duration'] || changes['gameEvents']) {
      if (this.duration && this.gameEvents) {
        this.calculateTimeRangeScale();
      }
    }
  }

}
