import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StockApiService} from "./services/stock-api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private stockApiService: StockApiService) {
  }

  ngOnInit() {
    this.stockApiService.getStockData('AAPL').subscribe((data: any) => {
      console.log('Data', data);
    });
  }
}
