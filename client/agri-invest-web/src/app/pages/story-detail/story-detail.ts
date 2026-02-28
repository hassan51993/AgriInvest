import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { SuccessStoryService } from '../../core/services/success-story.service';
import { SuccessStory } from '../../core/models/success-story.model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-story-detail',
  standalone: true,
  imports: [RouterLink, LoadingSpinnerComponent],
  template: `
    @if (loading()) {
      <app-loading-spinner />
    } @else if (story()) {
      <!-- Hero -->
      <section class="relative h-[50vh] flex items-end">
        <div class="absolute inset-0 bg-cover bg-center"
             [style.background-image]="'url(' + (story()!.featuredImageUrl || '/assets/images/story-placeholder.jpg') + ')'">
        </div>
        <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.8), transparent)"></div>
        <div class="relative z-10 max-w-7xl mx-auto px-4 pb-8 w-full">
          <a routerLink="/success-stories" class="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm">
            ← {{ lang.localize('العودة لقصص النجاح', 'Back to Success Stories') }}
          </a>
          <h1 class="text-3xl sm:text-4xl font-bold text-white">
            {{ lang.localize(story()!.titleAr, story()!.titleEn) }}
          </h1>
          <div class="flex flex-wrap gap-4 mt-4">
            @if (story()!.roiAchieved) {
              <span class="px-4 py-1 text-sm font-bold text-white rounded-full" style="background-color: var(--accent-gold)">
                {{ story()!.roiAchieved }}% {{ lang.localize('عائد محقق', 'ROI Achieved') }}
              </span>
            }
            @if (story()!.areaTransformed) {
              <span class="px-4 py-1 text-sm font-semibold text-white rounded-full" style="background-color: var(--primary-green)">
                {{ story()!.areaTransformed }} {{ lang.localize('هكتار', 'hectares') }}
              </span>
            }
          </div>
        </div>
      </section>

      <!-- Content -->
      <section class="py-12 px-4">
        <div class="max-w-4xl mx-auto">
          <!-- Before/After -->
          @if (story()!.beforeImageUrl && story()!.afterImageUrl) {
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div class="text-center">
                <img [src]="story()!.beforeImageUrl" alt="Before"
                     class="w-full h-64 object-cover rounded-xl shadow-lg mb-2">
                <span class="text-sm font-semibold text-gray-500">
                  {{ lang.localize('قبل', 'Before') }}
                </span>
              </div>
              <div class="text-center">
                <img [src]="story()!.afterImageUrl" alt="After"
                     class="w-full h-64 object-cover rounded-xl shadow-lg mb-2">
                <span class="text-sm font-semibold" style="color: var(--primary-green)">
                  {{ lang.localize('بعد', 'After') }}
                </span>
              </div>
            </div>
          }

          <!-- Story Content -->
          <div class="prose max-w-none text-gray-700 leading-relaxed text-lg mb-12">
            <p>{{ lang.localize(story()!.contentAr, story()!.contentEn) }}</p>
          </div>

          <!-- Testimonial -->
          @if (story()!.testimonialAr || story()!.testimonialEn) {
            <blockquote class="border-l-4 pl-6 py-4 my-8 italic text-gray-600 text-lg rounded-r-xl"
                        style="border-color: var(--accent-gold); background-color: var(--sand)">
              <p class="mb-3">"{{ lang.localize(story()!.testimonialAr, story()!.testimonialEn) }}"</p>
              @if (story()!.testimonialAuthor) {
                <footer class="text-sm font-semibold not-italic" style="color: var(--primary-green-dark)">
                  — {{ story()!.testimonialAuthor }}
                </footer>
              }
            </blockquote>
          }
        </div>
      </section>
    } @else {
      <div class="text-center py-20 text-gray-500">
        <div class="text-4xl mb-4">🔍</div>
        <p>{{ lang.localize('القصة غير موجودة', 'Story not found') }}</p>
      </div>
    }
  `
})
export class StoryDetailComponent implements OnInit {
  lang = inject(LanguageService);
  private route = inject(ActivatedRoute);
  private storyService = inject(SuccessStoryService);

  story = signal<SuccessStory | null>(null);
  loading = signal(true);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.storyService.getBySlug(slug).subscribe({
        next: (s) => {
          this.story.set(s);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    }
  }
}
