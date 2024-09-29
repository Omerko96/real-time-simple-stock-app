import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StockService} from "./services/stock.service";
import {of} from "rxjs";
import {ITickers} from "./models/stock.model";

const stocksMock = jasmine.createSpyObj('StockService', ['getStocksData']);
stocksMock.getStocksData.and.returnValue(of({ tickers: [] }));

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [
        {
          provide: StockService,
          useValue: stocksMock
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call getStocksData and get returned value', () => {
    const tickers: ITickers[] = [];

    app.ngOnInit();

    expect(stocksMock.getStocksData).toHaveBeenCalled();
    expect(app.tickers).toEqual(tickers);
  });
});
