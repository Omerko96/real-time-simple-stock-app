import { TestBed } from '@angular/core/testing';

import { StockApiService } from './stock-api.service';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../environments/environment";
import {IStock} from "../models/stock.model";

describe('StockApiService', () => {
  let service: StockApiService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockApiService]
    });
    service = TestBed.inject(StockApiService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get with the correct URL and headers', () => {
    const tickers = 'AAPL,GOOGL';
    const spy = spyOn(httpClient, 'get').and.callThrough();

    service.getStockData(tickers).subscribe();

    const req = httpMock.expectOne(
      `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickers}`
    );

    expect(spy).toHaveBeenCalledWith(
      `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickers}`,
      {
        headers: {
          'Authorization': `Bearer ${environment.polygon.apiKey}`
        }
      }
    );

    req.flush({} as IStock);
  });
});
