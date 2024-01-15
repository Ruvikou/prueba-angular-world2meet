import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private heroes: Hero[];

  constructor() {
    const heroesStored = localStorage.getItem('heroes');
    if(heroesStored){
      this.heroes = JSON.parse(heroesStored);
    } else {
      this.heroes = environment.INITIAL_HEROES;
      localStorage.setItem('heroes', JSON.stringify(this.heroes));
    }
  }

  public getHeroes(): Hero[] {
    return this.heroes;
  }

  public searchById(id: number): Hero | undefined {
    const found = this.heroes.find(hero => hero.id == id)
    
    return found;
  }

  public newHero(name: string): boolean {
    const hero: Hero = {
      id: this.heroes[this.heroes.length - 1].id + 1,
      name
    };

    if(hero) {
      this.heroes.push(hero);
      localStorage.setItem('heroes', JSON.stringify(this.heroes));

      return true;
    } else {
      return false;
    }
  }

  public editHero(id: number, name: string): boolean {
    const hero = this.searchById(id);

    if(hero) {
      this.heroes[this.heroes.indexOf(hero)].name = name;
      localStorage.setItem('heroes', JSON.stringify(this.heroes));

      return true;
    } else {
      return false;
    }
  }

  public deleteHero(id: number): boolean {
    const hero = this.searchById(id);

    if(hero) {
      this.heroes.splice(this.heroes.indexOf(hero), 1);
      localStorage.setItem('heroes', JSON.stringify(this.heroes));

      return true;
    } else {
      return false;
    }
  }
}
