import { TestBed } from '@angular/core/testing';

import { WebsocketService } from './websocket.service';

describe('WebsocketService', () => {
  let service: WebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a value with two decimal places when isVolume is false', () => {
    spyOn(Math, 'random').and.returnValue(0.5);
    const result = service.getRandomChange(100);
    expect(result).toBe(100);
  });
});
