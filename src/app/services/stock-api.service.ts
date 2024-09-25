import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StockApiService {

  constructor(private http: HttpClient) { }

  getStockData(ticker: string): any {
    return this.http.get(
      `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=AAPL,GOOG,MSFT,TSLA`,
      {
        headers: {
          'Authorization': `Bearer ${environment.polygon.apiKey}`
        }
      }
    );
  }
}
