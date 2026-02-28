import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent),
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects').then(m => m.ProjectsComponent),
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./pages/project-detail/project-detail').then(m => m.ProjectDetailComponent),
  },
  {
    path: 'success-stories',
    loadComponent: () => import('./pages/success-stories/success-stories').then(m => m.SuccessStoriesComponent),
  },
  {
    path: 'success-stories/:slug',
    loadComponent: () => import('./pages/story-detail/story-detail').then(m => m.StoryDetailComponent),
  },
  {
    path: 'media',
    loadComponent: () => import('./pages/media-center/media-center').then(m => m.MediaCenterComponent),
  },
  {
    path: 'how-it-works',
    loadComponent: () => import('./pages/how-it-works/how-it-works').then(m => m.HowItWorksComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
