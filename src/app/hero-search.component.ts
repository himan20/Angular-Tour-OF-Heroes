import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit{

  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) { }

// Push the search term into observable stream
  search(term: string): void {
    this.searchTerms.next(term);
}

  ngOnInit(): void {
    this.heroes = this.searchTerms.debounceTime(300) // wait 300 ms after keystroke before considering the term
      .distinctUntilChanged() // ignore if the next search term is same as before
      .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
      // switch to the new observable each time the search term changes
      // return the http search observable
      .catch(error => {
// TODO : add real error handling
        console.log(error);
        // or return the observable of empty heroes if there was no search term
        return Observable.of<Hero[]>([]);
      });
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
}

}

