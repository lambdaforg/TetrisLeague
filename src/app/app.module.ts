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
import {WaitingRoomComponent} from './menu/waiting-room/waiting-room.component';
import {FriendsComponent} from './menu/friends/friends.component';
import {ModalDismissReasons, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LeaveRoomDialog, RoomModalComponent} from './menu/waiting-room/room-modal/room-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoomModalComponent, LeaveRoomDialogComponent} from './menu/waiting-room/room-modal/room-modal.component';

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
    BoardComponent,
    WaitingRoomComponent,
    FriendsComponent,
    RoomModalComponent,
    LeaveRoomDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
