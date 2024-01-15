import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { NewHeroComponent } from './new-hero/new-hero.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'edit/:id', component: EditHeroComponent },
    { path: 'new', component: NewHeroComponent }
];
