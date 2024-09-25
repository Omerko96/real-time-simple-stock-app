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
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-02-10?adjusted=true`,
      {
        headers: {
          'Authorization': `Bearer ${environment.polygon.apiKey}`
        }
      }
    );
  }
}
