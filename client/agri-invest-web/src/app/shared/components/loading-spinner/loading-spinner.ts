import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  styleUrl: './loading-spinner.scss',
  template: `
    <div class="flex items-center justify-center py-20">
      <div class="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin"
           style="border-top-color: var(--primary-green)">
      </div>
    </div>
  `
})
export class LoadingSpinnerComponent {}
