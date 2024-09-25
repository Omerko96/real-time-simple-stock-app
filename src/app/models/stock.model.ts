export interface IStock {
  count: number;
  request_id: string;
  status: string;
  tickers: ITickers[];
}

export interface ITickers {
  ticker: string;
  todayChange: number;
  todaysChangePercent: number;
  updated: number;
  day: ITickerDay;
  min: ITickerMin;
  prevDay: ITickerDay;
}

export interface ITickerDay {
  c: number;
  h: number;
  l: number;
  o: number;
  v: number;
  vw: number;
}

export interface ITickerMin {
  av: number;
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
}
