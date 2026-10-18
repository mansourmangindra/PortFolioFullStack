import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { ProjectDto } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="projects-section">
      <h2>Featured Projects</h2>
      <div *ngIf="loading" class="loading">Loading projects from API...</div>
      <div *ngIf="error" class="error">{{ error }}</div>

      <div class="projects-grid">
        <div *ngFor="let project of projects" class="project-card">
          <div class="card-content">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="tech-tags">
              <span *ngFor="let tech of project.technologies" class="tag">{{ tech }}</span>
            </div>
            <div class="links">
              <a *ngIf="project.githubLink" [href]="project.githubLink" target="_blank">GitHub</a>
              <a *ngIf="project.liveDemoLink" [href]="project.liveDemoLink" target="_blank"
                >Live Demo</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .projects-section {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }
      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
      }
      .project-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }
      .card-content {
        padding: 1.5rem;
      }
      .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 1rem 0;
      }
      .tag {
        background: #f0f0f0;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.85rem;
      }
      .links {
        display: flex;
        gap: 1rem;
      }
      .error {
        color: #d9534f;
      }
    `,
  ],
})
export class ProjectsComponent implements OnInit {
  projects: ProjectDto[] = [];
  loading = true;
  error = '';

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load projects. Please ensure backend API is running.';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
