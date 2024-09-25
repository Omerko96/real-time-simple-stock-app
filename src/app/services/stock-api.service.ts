import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {IStock} from "../models/stock.model";

@Injectable({
  providedIn: 'root'
})
export class StockApiService {

  constructor(private http: HttpClient) { }

  getStockData(tickers: string): Observable<IStock> {
    return this.http.get<IStock>(
      `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickers}`,
      {
        headers: {
          'Authorization': `Bearer ${environment.polygon.apiKey}`
        }
      }
    );
  }
}
