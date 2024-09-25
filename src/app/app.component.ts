import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StockService} from "./services/stock.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private stockService: StockService) {
  }

  ngOnInit() {
    this.stockService.getStocksData();
  }
}
