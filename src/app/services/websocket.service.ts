import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ITickers } from '../models/stock.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<ITickers[]>;
  private tickers: ITickers[] = [];

  constructor() {
    this.socket$ = webSocket('ws://localhost:4200');
    this.socket$.subscribe(
      (message: ITickers[]) => {
        this.tickers = message;
      },
      (err) => console.error(err),
      () => console.warn('Completed!')
    );

    interval(5000).pipe(
      map(() => {
        this.tickers = this.tickers.map(ticker => {
          if (ticker.isActive) {
            ticker.day.o = this.getRandomChange(ticker.day.o);
            ticker.todaysChange = this.getRandomChange(ticker.todaysChange);
            ticker.day.v = this.getRandomChange(ticker.day.v, true);
          }
          return ticker;
        });
        this.socket$.next(this.tickers);
      })
    ).subscribe();
  }

  connect(): Observable<ITickers[]> {
    return this.socket$.asObservable();
  }

  disconnect() {
    this.socket$.complete();
  }

  setInitialTickers(tickers: ITickers[]) {
    this.tickers = tickers;
    this.socket$.next(this.tickers);
  }

  getRandomChange(value: number, isVolume: boolean = false): number {
    const change = (Math.random() * 2 - 1) * (isVolume ? 100 : 0.1);
    return +(value + change).toFixed(isVolume ? 0 : 2);
  }
}
