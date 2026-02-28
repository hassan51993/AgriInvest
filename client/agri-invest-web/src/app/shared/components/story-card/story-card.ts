import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { SuccessStorySummary } from '../../../core/models/success-story.model';

@Component({
  selector: 'app-story-card',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './story-card.scss',
  template: `
    <a [routerLink]="['/success-stories', story().slug]" class="story">
      <!-- Image -->
      <div class="story__image">
        <img [src]="story().featuredImageUrl || '/assets/images/story-placeholder.jpg'"
             [alt]="lang.localize(story().titleAr, story().titleEn)"
             class="story__img">
        @if (story().roiAchieved) {
          <span class="story__roi">{{ story().roiAchieved }}% ROI</span>
        }
      </div>

      <!-- Body -->
      <div class="story__body">
        @if (story().areaTransformed) {
          <p class="story__meta">
            {{ story().areaTransformed }} {{ lang.localize('هكتار تم تحويلها', 'hectares transformed') }}
          </p>
        }
        <h3 class="story__title">
          {{ lang.localize(story().titleAr, story().titleEn) }}
        </h3>
        @if (story().testimonialAr || story().testimonialEn) {
          <p class="story__quote">
            "{{ lang.localize(story().testimonialAr, story().testimonialEn) }}"
          </p>
        }
        <span class="story__cta">
          {{ lang.localize('اقرأ المزيد', 'Read more') }}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
      <div class="story__accent"></div>
    </a>
  `
})
export class StoryCardComponent {
  lang = inject(LanguageService);
  story = input.required<SuccessStorySummary>();
}
