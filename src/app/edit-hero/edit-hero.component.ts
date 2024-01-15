import { Component, inject } from '@angular/core';
import { Hero } from '../models/hero.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroesService } from '../services/heroes.service';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-hero',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-hero.component.html',
  styleUrl: './edit-hero.component.scss'
})
export class EditHeroComponent {
  private heroesService = inject(HeroesService);
  public selectedHero: Hero | undefined;
  public newName: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  constructor(private _route: ActivatedRoute) {
    // Fetch hero by param in headers
    const heroId = <number>(this._route.snapshot.paramMap.get('id') || 0);
    this.selectedHero = this.heroesService.searchById(heroId);
  }

  public editHero() {
    if (this.selectedHero && this.newName.valid) {
      this.heroesService.editHero(this.selectedHero.id, this.newName.value); 
    }

    document.location.href = '/';
  }
}
