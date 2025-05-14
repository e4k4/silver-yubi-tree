import { Component } from '@angular/core';
import { WebAuthnService } from './services/webauthn.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="auth-container">
      <h1>webauthn ❤️ angular</h1>
      <button (click)="register()">Register</button>
      <button (click)="login()">Login</button>
      <button (click)="clear()">Clear</button>
      <p *ngIf="message" [ngClass]="{'success': isSuccess, 'error': !isSuccess}">{{ message }}</p>
    </div>
  `,
  styles: [`
    .auth-container {
      text-align: center;
      padding: 50px;
    }
    .success {
      color: green;
    }
    .error {
      color: red;
    }
    button {
      margin: 10px;
      padding: 10px 20px;
      font-size: 16px;
    }
    p {
      margin: 10px;
      font-size: 16px;
    }
  `]
})
export class AppComponent {
  message: string | null = null; // Message to display feedback to the user
  isSuccess: boolean = false; // Indicates if the last action was successful

  constructor(private webAuthnService: WebAuthnService) { }

  // Trigger registration process and update the UI based on the outcome
  async register() {
    try {
      await this.webAuthnService.register();
      this.message = "Registration successful!"; // Success message if registration works
      this.isSuccess = true;
    } catch (err) {
      this.message = "Registration failed. Please try again."; // Error message if something goes wrong
      this.isSuccess = false;
    }
  }

  // Trigger authentication process and update the UI based on the outcome
  async login() {
    try {
      await this.webAuthnService.authenticate();
      this.message = "Authentication successful!"; // Success message if authentication works
      this.isSuccess = true;
    } catch (err) {
      this.message = "Authentication failed. Please try again."; // Error message if something goes wrong
      this.isSuccess = false;
    }
  }

  async clear() {
    try {
      await this.webAuthnService.reset();
      this.message = "Registration cleared.";
      this.isSuccess = true;
    } catch (err) {
      this.message = "Failed to clear registration.."; // Error message if something goes wrong
      this.isSuccess = false;
    }
  }
}