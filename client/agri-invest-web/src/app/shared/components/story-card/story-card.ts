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
    <a [routerLink]="['/success-stories', story().slug]"
       class="block group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 no-underline">
      <!-- Image -->
      <div class="relative h-48 overflow-hidden">
        <img [src]="story().featuredImageUrl || '/assets/images/story-placeholder.jpg'"
             [alt]="lang.localize(story().titleAr, story().titleEn)"
             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        @if (story().roiAchieved) {
          <span class="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white rounded-full"
                style="background-color: var(--accent-gold)">
            {{ story().roiAchieved }}% ROI
          </span>
        }
      </div>
      <!-- Content -->
      <div class="p-5">
        <h3 class="text-lg font-bold mb-2 group-hover:text-[var(--accent-gold)] transition-colors"
            style="color: var(--primary-green-dark)">
          {{ lang.localize(story().titleAr, story().titleEn) }}
        </h3>
        @if (story().areaTransformed) {
          <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <span>🌱</span>
            <span>{{ story().areaTransformed }} {{ lang.localize('هكتار تم تحويلها', 'hectares transformed') }}</span>
          </div>
        }
        @if (story().testimonialAr || story().testimonialEn) {
          <p class="text-sm text-gray-600 italic line-clamp-2">
            "{{ lang.localize(story().testimonialAr, story().testimonialEn) }}"
          </p>
        }
        <div class="mt-3 text-sm font-semibold" style="color: var(--primary-green)">
          {{ lang.localize('اقرأ المزيد ←', 'Read more →') }}
        </div>
      </div>
    </a>
  `
})
export class StoryCardComponent {
  lang = inject(LanguageService);
  story = input.required<SuccessStorySummary>();
}
