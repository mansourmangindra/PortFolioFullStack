import { Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './components/admin/admin.component';
import { Component } from '@angular/core';

// Create a simple Public Home Component inline or separate
@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [ProjectsComponent, ContactComponent],
  template: `
    <header class="hero-header">
      <h1>My Developer Portfolio</h1>
      <p>Full-Stack .NET 10 & Angular Developer</p>
    </header>
    <app-projects></app-projects>
    <app-contact></app-contact>
  `,
  styles: [
    `
      .hero-header {
        background: #1a1a1a;
        color: white;
        text-align: center;
        padding: 3rem 1rem;
        margin-bottom: 2rem;
      }
      .hero-header h1 {
        margin: 0 0 0.5rem 0;
        font-size: 2.5rem;
      }
      .hero-header p {
        margin: 0;
        color: #aaa;
        font-size: 1.2rem;
      }
    `,
  ],
})
class PublicHomeComponent {}

export const routes: Routes = [
  { path: '', component: PublicHomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' },
];
