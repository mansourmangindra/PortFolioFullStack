import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { ProjectDto } from '../../models/project.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="admin-container">
      <header class="admin-header">
        <h2>Portfolio Admin Dashboard</h2>
        <button class="btn-primary" (click)="openCreateForm()">+ Add New Project</button>
      </header>

      <!-- Error / Success Banners -->
      <div *ngIf="errorMessage" class="alert error">{{ errorMessage }}</div>
      <div *ngIf="successMessage" class="alert success">{{ successMessage }}</div>

      <!-- Projects Management Table -->
      <div class="table-responsive" *ngIf="!showForm">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Title</th>
              <th>Description</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of projects">
              <td>{{ p.displayOrder }}</td>
              <td>
                <strong>{{ p.title }}</strong>
              </td>
              <td>{{ p.description | slice: 0 : 60 }}...</td>
              <td>
                <span [class]="p.isFeatured ? 'badge featured' : 'badge'">
                  {{ p.isFeatured ? 'Featured' : 'Standard' }}
                </span>
              </td>
              <td class="actions">
                <button class="btn-sm edit" (click)="openEditForm(p)">Edit</button>
                <button class="btn-sm delete" (click)="deleteProject(p.id)">Delete</button>
              </td>
            </tr>
            <tr *ngIf="projects.length === 0 && !loading">
              <td colspan="5" class="empty">No projects found. Create your first one above!</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Upsert (Create / Edit) Form Modal View -->
      <div class="form-card" *ngIf="showForm">
        <h3>{{ isEditMode ? 'Edit Project' : 'Create New Project' }}</h3>
        <form [formGroup]="projectForm" (ngSubmit)="saveProject()">
          <div class="form-group">
            <label>Project Title</label>
            <input
              type="text"
              formControlName="title"
              placeholder="e.g., E-Commerce Microservice"
            />
          </div>

          <div class="form-group">
            <label>Short Description</label>
            <textarea
              formControlName="description"
              rows="2"
              placeholder="Brief summary..."
            ></textarea>
          </div>

          <div class="form-group">
            <label>Long Description</label>
            <textarea
              formControlName="longDescription"
              rows="4"
              placeholder="Detailed architectural breakdown..."
            ></textarea>
          </div>

          <div class="form-group">
            <label>Thumbnail Image URL</label>
            <input type="text" formControlName="thumbnailUrl" placeholder="https://..." />
          </div>

          <div class="form-group">
            <label>Technologies (comma separated)</label>
            <input
              type="text"
              formControlName="technologiesInput"
              placeholder=".NET 10, Angular, MongoDB"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>GitHub Link</label>
              <input
                type="text"
                formControlName="githubLink"
                placeholder="https://github.com/..."
              />
            </div>
            <div class="form-group">
              <label>Live Demo Link</label>
              <input type="text" formControlName="liveDemoLink" placeholder="https://..." />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group checkbox-group">
              <label>
                <input type="checkbox" formControlName="isFeatured" /> Featured Project
              </label>
            </div>
            <div class="form-group">
              <label>Display Order</label>
              <input type="number" formControlName="displayOrder" />
            </div>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="btn-primary"
              [disabled]="projectForm.invalid || submitting"
            >
              {{ submitting ? 'Saving...' : 'Save Project' }}
            </button>
            <button type="button" class="btn-secondary" (click)="cancelForm()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .admin-container {
        max-width: 1100px;
        margin: 2rem auto;
        padding: 2rem;
        font-family: Arial, sans-serif;
      }
      .admin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }
      .admin-table {
        width: 100%;
        border-collapse: collapse;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        overflow: hidden;
      }
      .admin-table th,
      .admin-table td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #eee;
      }
      .admin-table th {
        background: #f8f9fa;
        font-weight: 600;
      }
      .badge {
        background: #e9ecef;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
      }
      .badge.featured {
        background: #d4edda;
        color: #155724;
      }
      .actions {
        display: flex;
        gap: 0.5rem;
      }
      .btn-primary {
        background: #007bff;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
      }
      .btn-secondary {
        background: #6c757d;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
      }
      .btn-sm {
        padding: 0.25rem 0.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85rem;
      }
      .edit {
        background: #ffc107;
        color: #212529;
      }
      .delete {
        background: #dc3545;
        color: white;
      }
      .form-card {
        background: #fff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        max-width: 700px;
        margin: 0 auto;
      }
      .form-group {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .form-group label {
        margin-bottom: 0.4rem;
        font-weight: 500;
        font-size: 0.9rem;
      }
      .form-group input,
      .form-group textarea {
        padding: 0.6rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
      }
      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
      .checkbox-group {
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        margin-top: 1.5rem;
      }
      .form-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
      }
      .alert {
        padding: 0.75rem;
        border-radius: 4px;
        margin-bottom: 1rem;
      }
      .alert.error {
        background: #f8d7da;
        color: #721c24;
      }
      .alert.success {
        background: #d4edda;
        color: #155724;
      }
      .empty {
        text-align: center;
        color: #6c757d;
        padding: 2rem;
      }
    `,
  ],
})
export class AdminComponent implements OnInit {
  projects: ProjectDto[] = [];
  loading = false;
  submitting = false;
  showForm = false;
  isEditMode = false;
  currentEditId: string | null = null;

  errorMessage = '';
  successMessage = '';

  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService,
  ) {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      longDescription: ['', Validators.required],
      thumbnailUrl: [''],
      technologiesInput: ['', Validators.required],
      githubLink: [''],
      liveDemoLink: [''],
      isFeatured: [false],
      displayOrder: [1, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.portfolioService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load projects from backend API.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  openCreateForm(): void {
    this.isEditMode = false;
    this.currentEditId = null;
    this.projectForm.reset({ displayOrder: 1, isFeatured: false });
    this.showForm = true;
    this.clearAlerts();
  }

  openEditForm(project: ProjectDto): void {
    this.isEditMode = true;
    this.currentEditId = project.id;
    this.projectForm.patchValue({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription,
      thumbnailUrl: project.thumbnailUrl,
      technologiesInput: project.technologies ? project.technologies.join(', ') : '',
      githubLink: project.githubLink,
      liveDemoLink: project.liveDemoLink,
      isFeatured: project.isFeatured,
      displayOrder: project.displayOrder,
    });
    this.showForm = true;
    this.clearAlerts();
  }

  cancelForm(): void {
    this.showForm = false;
    this.clearAlerts();
  }

  saveProject(): void {
    if (this.projectForm.invalid) return;

    this.submitting = true;
    this.clearAlerts();

    const rawValues = this.projectForm.value;
    // Split technologies comma-separated input into string array matching DTO
    const technologiesArray = rawValues.technologiesInput
      .split(',')
      .map((t: string) => t.trim())
      .filter((t: string) => t.length > 0);

    const payload = {
      title: rawValues.title,
      description: rawValues.description,
      longDescription: rawValues.longDescription,
      thumbnailUrl: rawValues.thumbnailUrl,
      technologies: technologiesArray,
      githubLink: rawValues.githubLink,
      liveDemoLink: rawValues.liveDemoLink,
      isFeatured: rawValues.isFeatured,
      displayOrder: rawValues.displayOrder,
    };

    if (this.isEditMode && this.currentEditId) {
      this.portfolioService.updateProject(this.currentEditId, payload).subscribe({
        next: () => {
          this.successMessage = 'Project updated successfully!';
          this.submitting = false;
          this.showForm = false;
          this.loadProjects();
        },
        error: (err) => {
          this.errorMessage = 'Failed to update project.';
          this.submitting = false;
          console.error(err);
        },
      });
    } else {
      this.portfolioService.createProject(payload).subscribe({
        next: () => {
          this.successMessage = 'Project created successfully!';
          this.submitting = false;
          this.showForm = false;
          this.loadProjects();
        },
        error: (err) => {
          this.errorMessage = 'Failed to create project.';
          this.submitting = false;
          console.error(err);
        },
      });
    }
  }

  deleteProject(id: string): void {
    if (!confirm('Are you sure you want to delete this project?')) return;

    this.portfolioService.deleteProject(id).subscribe({
      next: () => {
        this.successMessage = 'Project deleted successfully!';
        this.loadProjects();
      },
      error: (err) => {
        this.errorMessage = 'Failed to delete project.';
        console.error(err);
      },
    });
  }

  clearAlerts(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
