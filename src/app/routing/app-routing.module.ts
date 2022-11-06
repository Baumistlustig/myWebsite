import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ImprintComponent } from '../components/imprint/imprint.component';
import { PostsComponent } from '../components/posts/posts.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { FileComponent } from '../components/file/file.component';
import { ProfilesComponent } from '../components/profiles/profiles.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'file', component: FileComponent },
  { path: 'profiles/:userId', component: ProfilesComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
