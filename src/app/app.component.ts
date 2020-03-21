import { Component } from '@angular/core';
import {VideoEventsHandlerService} from './services/video-events-handler.service';
import {GameEvent} from './models/game-event';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-video';
  gameEvents: GameEvent[];

  constructor(public videoEventsService: VideoEventsHandlerService) {
    this.videoEventsService.getGameEvents().pipe(first()).subscribe(d => this.gameEvents = d);
  }
}
