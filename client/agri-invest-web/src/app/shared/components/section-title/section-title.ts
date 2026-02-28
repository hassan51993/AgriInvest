import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  styleUrl: './section-title.scss',
  template: `
    <div class="text-center mb-12">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
          style="color: var(--primary-green-dark)">
        {{ title() }}
      </h2>
      <div class="w-20 h-1 mx-auto rounded-full mb-4"
           style="background: linear-gradient(90deg, var(--primary-green), var(--accent-gold))">
      </div>
      @if (subtitle()) {
        <p class="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
          {{ subtitle() }}
        </p>
      }
    </div>
  `
})
export class SectionTitleComponent {
  title = input<string>('');
  subtitle = input<string>('');
}
