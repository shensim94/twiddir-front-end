import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './services/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { TweetPageComponent } from './pages/tweet-page/tweet-page.component';

export const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomePageComponent, canActivate: [authGuard]},
  {path:'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: ':username', component: UserPageComponent},
  {path: ':username/status/:tweetId', component: TweetPageComponent}
];
