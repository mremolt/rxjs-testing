import { Injectable } from '@angular/core';
import { interval, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImportantService {
  public readonly number$ = of(42);
  public readonly numbers$ = of(1, 2, 3, 4, 5);
  public readonly numbersForever$ = interval(1000);
}
