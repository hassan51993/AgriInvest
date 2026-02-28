import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  styleUrl: './hero-section.scss',
  template: `
    <section class="hero" [style.min-height]="height()">
      <div class="hero__bg" [style.background-image]="'url(' + backgroundImage() + ')'"></div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        @if (eyebrow()) {
          <p class="hero__eyebrow">{{ eyebrow() }}</p>
        }
        <h1 class="hero__title">{{ title() }}</h1>
        @if (subtitle()) {
          <p class="hero__subtitle">{{ subtitle() }}</p>
        }
        @if (showCta()) {
          <div class="hero__cta">
            <ng-content></ng-content>
          </div>
        }
      </div>
      <!-- Decorative corner mark -->
      <div class="hero__corner">✦</div>
    </section>
  `
})
export class HeroSectionComponent {
  title = input<string>('');
  subtitle = input<string>('');
  eyebrow = input<string>('');
  backgroundImage = input<string>('/assets/images/hero-default.jpg');
  height = input<string>('92svh');
  showCta = input<boolean>(false);
}
