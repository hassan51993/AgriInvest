import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  styleUrl: './hero-section.scss',
  template: `
    <section class="relative w-full flex items-center justify-center overflow-hidden"
             [style.min-height]="height()">
      <!-- Background -->
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
           [style.background-image]="'url(' + backgroundImage() + ')'">
      </div>
      <!-- Overlay -->
      <div class="absolute inset-0"
           style="background: linear-gradient(135deg, rgba(27,67,50,0.85), rgba(45,106,79,0.7))">
      </div>
      <!-- Content -->
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          {{ title() }}
        </h1>
        @if (subtitle()) {
          <p class="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {{ subtitle() }}
          </p>
        }
        @if (showCta()) {
          <ng-content></ng-content>
        }
      </div>
    </section>
  `
})
export class HeroSectionComponent {
  title = input<string>('');
  subtitle = input<string>('');
  backgroundImage = input<string>('/assets/images/hero-default.jpg');
  height = input<string>('60vh');
  showCta = input<boolean>(false);
}
