import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="contact-section">
      <h2>Get In Touch</h2>
      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Your Name</label>
          <input type="text" formControlName="senderName" />
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" formControlName="senderEmail" />
        </div>
        <div class="form-group">
          <label>Subject</label>
          <input type="text" formControlName="subject" />
        </div>
        <div class="form-group">
          <label>Message</label>
          <textarea formControlName="message" rows="4"></textarea>
        </div>
        <button type="submit" [disabled]="contactForm.invalid || submitting">Send Message</button>
        <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </section>
  `,
  styles: [
    `
      .contact-section {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        background: #f9f9f9;
        border-radius: 8px;
      }
      .form-group {
        margin-bottom: 1.25rem;
        display: flex;
        flex-direction: column;
      }
      .form-group label {
        margin-bottom: 0.5rem;
        font-weight: 600;
      }
      .form-group input,
      .form-group textarea {
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
      }
      button {
        padding: 0.75rem 1.5rem;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:disabled {
        background: #cccccc;
        cursor: not-allowed;
      }
      .success {
        color: #28a745;
        margin-top: 1rem;
      }
      .error {
        color: #d9534f;
        margin-top: 1rem;
      }
    `,
  ],
})
export class ContactComponent {
  contactForm: FormGroup;
  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService,
  ) {
    this.contactForm = this.fb.group({
      senderName: ['', [Validators.required, Validators.maxLength(100)]],
      senderEmail: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.maxLength(200)]],
      message: ['', [Validators.required, Validators.maxLength(2000)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;
    this.submitting = true;
    this.portfolioService.sendMessage(this.contactForm.value).subscribe({
      next: () => {
        this.successMessage = 'Message sent successfully!';
        this.contactForm.reset();
        this.submitting = false;
      },
      error: () => {
        this.errorMessage = 'Failed to send message.';
        this.submitting = false;
      },
    });
  }
}
