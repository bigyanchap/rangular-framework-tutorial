import { Routes } from '@angular/router';
import { SplashComponent } from './splash.component';
import { HomeComponent } from './home.component';
import { SavedComponent } from './saved.component';
import { HistoryComponent } from './history.component';
import { LessonComponent } from './lesson.component';
import { SamplesComponent } from './samples.component';
import { AboutComponent } from './about.component';
import { AlarmSampleComponent } from './alarm-sample.component';
import { MarioSampleComponent } from './mario-sample.component';
import { HabitSampleComponent } from './habit-sample.component';
import { NotFoundComponent } from './not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  { path: 'home', component: HomeComponent },
  { path: 'saved', component: SavedComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'progress', redirectTo: 'history' },
  { path: 'lesson/:id', component: LessonComponent },
  { path: 'samples', component: SamplesComponent },
  { path: 'samples/alarm', component: AlarmSampleComponent },
  { path: 'samples/mario', component: MarioSampleComponent },
  { path: 'samples/habit', component: HabitSampleComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent },
];
