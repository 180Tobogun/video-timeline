export interface GameEvent {
  id: number;
  type: string;
  time: number;
  left: number;
  group?: {
    left: number,
    events: GameEvent[]
  };
}
