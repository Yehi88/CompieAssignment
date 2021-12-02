import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './game-page/game-page.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    "path": "gamePage", component: GamePageComponent
  },
  {
    "path": "welcome", component: WelcomeComponent
  },
  {
    "path": "**", redirectTo: "welcome"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
