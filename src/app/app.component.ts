import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StockService} from "./services/stock.service";
import {IStock, ITickers} from "./models/stock.model";
import {CommonModule, DatePipe} from "@angular/common";
import {Subscription} from "rxjs";
import {WebsocketService} from "./services/websocket.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  public tickers: ITickers[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private stockService: StockService, private webSocketService: WebsocketService) {
  }

  ngOnInit() {
    this.stockService.getStocksData()
      .subscribe((stocks: IStock) => {
        this.tickers = stocks.tickers;

        this.tickers.forEach((ticker: ITickers) => {
          ticker.todaysChange = +ticker.todaysChange.toFixed(2);
          ticker.updated = new Date((ticker.updated as number) / 1e6);
          ticker.isActive = true;
        });

        this.webSocketService.setInitialTickers(this.tickers);

        this.subscription = this.webSocketService.connect().subscribe(updatedTickers => {
          this.tickers = updatedTickers;
        });
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.webSocketService.disconnect();
  }
}
