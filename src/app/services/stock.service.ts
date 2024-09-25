import { Injectable } from '@angular/core';
import {StockApiService} from "./stock-api.service";

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

  public getStocksData(): void {
    const enabledStocks = this.stocks.filter(stock => stock.enabled);
    const tickers = enabledStocks.map(stock => stock.name).join(',');

    this.stockApiService.getStockData(tickers).subscribe((data: any) => {
      console.log('Data', data);
    });
  }
}
