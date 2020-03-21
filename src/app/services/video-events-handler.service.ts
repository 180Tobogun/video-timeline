import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {GameEvent} from '../models/game-event';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoEventsHandlerService {
  private currentEl: HTMLMediaElement;
  public videoReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public currentTimeStream: Observable<number>;
  public durationTimeStream: Observable<number>;

  constructor(private httpClient: HttpClient) {
  }

  public setupElement(video: HTMLMediaElement): void {
    this.currentEl = video;
    this.defineEventStreams();
    this.videoReady.next(true);
  }

  public getGameEvents(): Observable<GameEvent[]> {
    return this.httpClient.get<GameEvent[]>('assets/data.json');
  }

  public setVideoTime(time: number) {
    this.currentEl.currentTime = time;
  }

  private defineEventStreams(): void {
    this.currentTimeStream = fromEvent(this.currentEl, 'timeupdate').pipe(
      map(event => Math.floor(this.currentEl.currentTime)),
      distinctUntilChanged()
    );

    this.durationTimeStream = fromEvent(this.currentEl, 'durationchange').pipe(
      map(event => Math.floor(this.currentEl.duration)),
      distinctUntilChanged()
    );
  }
}
