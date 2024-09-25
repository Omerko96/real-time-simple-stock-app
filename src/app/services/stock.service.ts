import { Injectable } from '@angular/core';
import {StockApiService} from "./stock-api.service";
import {Observable, map} from "rxjs";
import {IStock} from "../models/stock.model";

interface IToggledStock {
  name: string;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stocks: IToggledStock[] = [
    {
      name: 'AAPL',
      enabled: true
    },
    {
      name: 'GOOG',
      enabled: true
    },
    {
      name: 'MSFT',
      enabled: true
    },
    {
      name: 'TSLA',
      enabled: true
    }
  ];

  constructor(private stockApiService: StockApiService) { }

  public getStocksData(): Observable<IStock> {
    const enabledStocks = this.stocks.filter(stock => stock.enabled);
    const tickers = enabledStocks.map(stock => stock.name).join(',');

    return this.stockApiService.getStockData(tickers);
  }
}
