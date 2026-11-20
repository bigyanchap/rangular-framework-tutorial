import { Routes } from '@angular/router';
import { SplashComponent } from './splash.component';
import { HomeComponent } from './home.component';
import { SavedComponent } from './saved.component';
import { HistoryComponent } from './history.component';
import { LessonComponent } from './lesson.component';
import { SamplesComponent } from './samples.component';
import { AboutComponent } from './about.component';
import { AlarmSampleComponent } from './alarm-sample.component';
import { BreakoutSampleComponent } from './breakout-sample.component';
import { TodoSampleComponent } from './todo-sample.component';
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
  { path: 'samples/breakout', component: BreakoutSampleComponent },
  { path: 'samples/mario', redirectTo: 'samples/breakout' },
  { path: 'samples/todo', component: TodoSampleComponent },
  { path: 'samples/habit', redirectTo: 'samples/todo' },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent },
];
