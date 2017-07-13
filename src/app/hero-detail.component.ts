import { Component, Input } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
  selector: 'hero-detail',
  template: `
<div *ngIf="hero">
  <div><label>id: </label>{{hero.id}}</div>
  <input [(ngModel)]="hero.name" placeholder="name">
</div>
  `
})

export class HeroDetailComponent{
 @Input() hero: Hero;
}
