import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroesService } from '../services/heroes.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-hero',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './new-hero.component.html',
  styleUrl: './new-hero.component.scss'
})
export class NewHeroComponent {
  private heroesService = inject(HeroesService);
  public inputName: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  public newHero(): void {
    if (this.inputName.valid) {
      this.heroesService.newHero(this.inputName.value);
    }

    document.location.href = '/';
  }
}
