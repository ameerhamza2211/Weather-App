import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  countries = [
      {
        name: 'Pakistan',
        cities: ['Lahore', 'Karachi', 'Islamabad'],
      },
      {
        name: 'United States',
        cities: ['New York', 'Chicago', 'Washington']
      },
      {
        name: 'Australia',
        cities: ['Sydney', 'Adelaide', 'Melbourne']
      }
  ]

  countryControl!: FormControl;
  cityControl!: FormControl;
  cities$!: Observable<string>;

  constructor(private router: Router){}

  ngOnInit() {
    this.cityControl = new FormControl('');
    this.cityControl.valueChanges
      .subscribe(value => {
        this.router.navigate([value]);
      });

    this.countryControl = new FormControl('');

    this.cities$ = this.countryControl.valueChanges.pipe(
      map(country => country.cities)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
