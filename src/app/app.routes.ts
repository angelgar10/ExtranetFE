import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { FormsComponent } from './forms/forms.component';
import { BasicElementsComponent } from './forms/basic-elements/basic-elements.component';
import { AdvancedElementsComponent } from './forms/advanced-elements/advanced-elements.component';
import { InternalErrorComponent } from './common/internal-error/internal-error.component';
import { AuthComponent } from './pages/auth/auth/auth.component';
import { SigninComponent } from './pages/auth/signin/signin.component';

export const routes: Routes = [
    {path: '', component: BasicElementsComponent},
    {
        path: 'authentication',
        component: AuthComponent,
        children: [
            {path: '', component: SigninComponent}
        ]
    },
    {path: 'internal-error', component: InternalErrorComponent},
    {
        path: 'forms',
        component: FormsComponent,
        children: [
            {path: '', component: BasicElementsComponent},
            {path: 'advanced-elements', component: AdvancedElementsComponent}
        ]
    },
    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];