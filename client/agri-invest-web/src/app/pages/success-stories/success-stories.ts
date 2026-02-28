import { Component, inject, OnInit, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { SuccessStoryService } from '../../core/services/success-story.service';
import { SuccessStorySummary } from '../../core/models/success-story.model';
import { HeroSectionComponent } from '../../shared/components/hero-section/hero-section';
import { StoryCardComponent } from '../../shared/components/story-card/story-card';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-success-stories',
  standalone: true,
  imports: [HeroSectionComponent, StoryCardComponent, LoadingSpinnerComponent],
  template: `
    <app-hero-section
      [title]="lang.localize('قصص النجاح', 'Success Stories')"
      [subtitle]="lang.localize(
        'شهادات حقيقية من مستثمرينا الذين حققوا أحلامهم',
        'Real testimonials from our investors who achieved their dreams'
      )"
      backgroundImage="/assets/images/stories-hero.jpg"
      height="50vh" />

    <section class="py-16 px-4" style="background-color: var(--sand)">
      <div class="max-w-7xl mx-auto">
        @if (loading()) {
          <app-loading-spinner />
        } @else if (stories().length === 0) {
          <div class="text-center py-12 text-gray-500">
            <div class="text-4xl mb-4">📖</div>
            <p>{{ lang.localize('لا توجد قصص نجاح حالياً', 'No success stories available') }}</p>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (story of stories(); track story.id) {
              <app-story-card [story]="story" />
            }
          </div>
        }
      </div>
    </section>
  `
})
export class SuccessStoriesComponent implements OnInit {
  lang = inject(LanguageService);
  private storyService = inject(SuccessStoryService);

  stories = signal<SuccessStorySummary[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.storyService.getAll().subscribe({
      next: (data) => {
        this.stories.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
