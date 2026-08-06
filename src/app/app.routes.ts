import { Routes } from '@angular/router';
import { Login } from './login/login';
import { WunschList } from './wunsch-list/wunsch-list';

export const routes: Routes = [
    {path: '', component: Login, pathMatch: 'full'},
    {path: 'wuensche', component: WunschList}
];
