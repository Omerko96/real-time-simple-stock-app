import { TestBed } from '@angular/core/testing';
import { StockService } from './stock.service';
import { StockApiService } from './stock-api.service';
import { of } from 'rxjs';
import {IStock} from '../models/stock.model';

describe('StockService', () => {
  let service: StockService;
  let stockApiService: jasmine.SpyObj<StockApiService>;

  beforeEach(() => {
    const stockApiServiceSpy = jasmine.createSpyObj('StockApiService', ['getStockData']);

    TestBed.configureTestingModule({
      providers: [
        StockService,
        { provide: StockApiService, useValue: stockApiServiceSpy }
      ]
    });

    service = TestBed.inject(StockService);
    stockApiService = TestBed.inject(StockApiService) as jasmine.SpyObj<StockApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getStockData with the correct tickers', () => {
    const mockResponse: IStock = {
      count: 1,
      request_id: '123',
      status: 'success',
      tickers: [
        {
          ticker: 'AAPL',
          todaysChange: 1,
          todaysChangePercent: 1,
          updated: 1,
          day: {
            c: 1,
            h: 1,
            l: 1,
            o: 1,
            v: 1,
            vw: 1
          },
          min: {
            av: 1,
            c: 1,
            h: 1,
            l: 1,
            n: 1,
            o: 1,
            t: 1,
            v: 1,
            vw: 1
          },
          prevDay: {
            c: 1,
            h: 1,
            l: 1,
            o: 1,
            v: 1,
            vw: 1
          },
          isActive: true
        }
      ]
    };
    stockApiService.getStockData.and.returnValue(of(mockResponse));

    service.getStocksData().subscribe();

    expect(stockApiService.getStockData).toHaveBeenCalledWith('AAPL,GOOG,MSFT,TSLA');
  });
});
