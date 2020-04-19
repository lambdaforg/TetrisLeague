import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './menu/settings/settings.component';
import { RankingsComponent } from './menu/rankings/rankings.component';
import { StatsComponent } from './menu/stats/stats.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import {RouterModule, Routes} from '@angular/router';
import { BoardComponent } from './game/board/board.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'menu', component: MenuComponent},
  { path: '**', redirectTo : '/login'}


];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    RankingsComponent,
    StatsComponent,
    HeaderComponent,
    MenuComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
