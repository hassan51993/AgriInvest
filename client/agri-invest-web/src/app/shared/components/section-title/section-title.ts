import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  styleUrl: './section-title.scss',
  template: `
    <div class="section-title" [class.section-title--center]="align() === 'center'">
      @if (eyebrow()) {
        <p class="section-title__eyebrow">{{ eyebrow() }}</p>
      }
      <h2 class="section-title__heading">{{ title() }}</h2>
      <div class="section-title__rule"></div>
      @if (subtitle()) {
        <p class="section-title__sub">{{ subtitle() }}</p>
      }
    </div>
  `
})
export class SectionTitleComponent {
  title = input<string>('');
  subtitle = input<string>('');
  eyebrow = input<string>('');
  align = input<'left' | 'center'>('center');
}
