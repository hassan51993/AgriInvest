import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { HomeService } from '../../core/services/home.service';
import { HomePage } from '../../core/models/home-page.model';
import { HeroSectionComponent } from '../../shared/components/hero-section/hero-section';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card';
import { StoryCardComponent } from '../../shared/components/story-card/story-card';
import { StatsCounterComponent } from '../../shared/components/stats-counter/stats-counter';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink, HeroSectionComponent, SectionTitleComponent,
    ProjectCardComponent, StoryCardComponent, StatsCounterComponent,
    LoadingSpinnerComponent
  ],
  template: `
    @if (loading()) {
      <app-loading-spinner />
    } @else {
      <!-- Hero Section -->
      <app-hero-section
        [title]="lang.localize('نحول الصحراء إلى جنة خضراء', 'Transforming Desert into Green Paradise')"
        [subtitle]="lang.localize(
          'استثمر في مستقبل الزراعة المصرية في واحة الفرافرة',
          'Invest in the future of Egyptian agriculture in Farafra Oasis'
        )"
        backgroundImage="/assets/images/hero-farm.jpg"
        height="85vh"
        [showCta]="true">
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a routerLink="/projects"
             class="px-8 py-3 text-lg font-semibold text-white rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg no-underline"
             style="background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-light))">
            {{ lang.localize('استكشف المشاريع', 'Explore Projects') }}
          </a>
          <a routerLink="/contact"
             class="px-8 py-3 text-lg font-semibold rounded-full border-2 border-white text-white transition-all duration-200 hover:bg-white hover:text-green-900 no-underline">
            {{ lang.localize('تواصل معنا', 'Get in Touch') }}
          </a>
        </div>
      </app-hero-section>

      <!-- Stats Bar -->
      <section class="py-8" style="background: linear-gradient(135deg, var(--primary-green), var(--primary-green-light))">
        <div class="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <app-stats-counter [value]="5000" [label]="lang.localize('هكتار مزروع', 'Hectares Cultivated')" suffix="+" />
          <app-stats-counter [value]="150" [label]="lang.localize('مستثمر', 'Investors')" suffix="+" />
          <app-stats-counter [value]="25" [label]="lang.localize('عائد متوقع %', 'Expected ROI %')" suffix="%" />
          <app-stats-counter [value]="12" [label]="lang.localize('مشروع نشط', 'Active Projects')" suffix="" />
        </div>
      </section>

      <!-- Featured Projects -->
      @if (homeData()?.featuredProjects?.length) {
        <section class="py-16 px-4" style="background-color: var(--sand)">
          <div class="max-w-7xl mx-auto">
            <app-section-title
              [title]="lang.localize('مشاريعنا المميزة', 'Featured Projects')"
              [subtitle]="lang.localize(
                'اكتشف فرص الاستثمار الزراعي في واحة الفرافرة',
                'Discover agricultural investment opportunities in Farafra Oasis'
              )" />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (project of homeData()!.featuredProjects; track project.id) {
                <app-project-card [project]="project" />
              }
            </div>
            <div class="text-center mt-8">
              <a routerLink="/projects"
                 class="inline-flex items-center px-6 py-3 font-semibold text-white rounded-full transition-all duration-200 hover:scale-105 no-underline"
                 style="background-color: var(--primary-green)">
                {{ lang.localize('عرض جميع المشاريع', 'View All Projects') }}
              </a>
            </div>
          </div>
        </section>
      }

      <!-- About Section -->
      <section class="py-16 px-4 bg-white">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <app-section-title
              [title]="lang.localize('لماذا أجري إنفست؟', 'Why AgriInvest?')"
              [subtitle]="''" />
            <div class="space-y-4 text-gray-600">
              <p>{{ lang.localize(
                'نحن نؤمن بأن الصحراء المصرية تحتضن إمكانيات زراعية هائلة. من خلال التقنيات الحديثة والخبرة المحلية، نحول الأراضي القاحلة إلى مزارع منتجة.',
                'We believe the Egyptian desert holds immense agricultural potential. Through modern techniques and local expertise, we transform barren land into productive farms.'
              ) }}</p>
              <p>{{ lang.localize(
                'واحة الفرافرة بالوادي الجديد تتمتع بمياه جوفية وفيرة وتربة خصبة، مما يجعلها موقعاً مثالياً للاستثمار الزراعي.',
                'Farafra Oasis in New Valley features abundant groundwater and fertile soil, making it an ideal location for agricultural investment.'
              ) }}</p>
            </div>
            <div class="mt-6 grid grid-cols-2 gap-4">
              <div class="flex items-center gap-3">
                <span class="text-2xl">💧</span>
                <span class="text-sm font-medium" style="color: var(--primary-green-dark)">
                  {{ lang.localize('مياه جوفية وفيرة', 'Abundant Groundwater') }}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-2xl">☀️</span>
                <span class="text-sm font-medium" style="color: var(--primary-green-dark)">
                  {{ lang.localize('أشعة شمس مثالية', 'Ideal Sunlight') }}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-2xl">🌿</span>
                <span class="text-sm font-medium" style="color: var(--primary-green-dark)">
                  {{ lang.localize('زراعة عضوية', 'Organic Farming') }}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-2xl">📈</span>
                <span class="text-sm font-medium" style="color: var(--primary-green-dark)">
                  {{ lang.localize('عوائد مجزية', 'Rewarding Returns') }}
                </span>
              </div>
            </div>
          </div>
          <div class="relative">
            <img src="/assets/images/about-farm.jpg" alt="Farm"
                 class="rounded-2xl shadow-xl w-full h-80 object-cover">
            <div class="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4">
              <div class="text-2xl font-bold" style="color: var(--primary-green)">10+</div>
              <div class="text-sm text-gray-500">{{ lang.localize('سنوات خبرة', 'Years Experience') }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Success Stories -->
      @if (homeData()?.featuredStories?.length) {
        <section class="py-16 px-4" style="background-color: var(--sand)">
          <div class="max-w-7xl mx-auto">
            <app-section-title
              [title]="lang.localize('قصص نجاح ملهمة', 'Inspiring Success Stories')"
              [subtitle]="lang.localize(
                'تعرف على قصص نجاح مستثمرينا في تحويل الصحراء',
                'Learn about our investors success stories in transforming the desert'
              )" />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (story of homeData()!.featuredStories; track story.id) {
                <app-story-card [story]="story" />
              }
            </div>
            <div class="text-center mt-8">
              <a routerLink="/success-stories"
                 class="inline-flex items-center px-6 py-3 font-semibold text-white rounded-full transition-all duration-200 hover:scale-105 no-underline"
                 style="background-color: var(--primary-green)">
                {{ lang.localize('عرض جميع القصص', 'View All Stories') }}
              </a>
            </div>
          </div>
        </section>
      }

      <!-- CTA Section -->
      <section class="py-20 px-4 text-center text-white"
               style="background: linear-gradient(135deg, var(--primary-green-dark), var(--primary-green))">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
            {{ lang.localize('ابدأ رحلتك الاستثمارية اليوم', 'Start Your Investment Journey Today') }}
          </h2>
          <p class="text-lg text-gray-200 mb-8">
            {{ lang.localize(
              'انضم إلى مئات المستثمرين الذين يحققون عوائد مجزية من الزراعة المستدامة',
              'Join hundreds of investors achieving rewarding returns from sustainable agriculture'
            ) }}
          </p>
          <a routerLink="/contact"
             class="inline-flex items-center px-8 py-3 text-lg font-semibold rounded-full transition-all duration-200 hover:scale-105 no-underline"
             style="background-color: var(--accent-gold); color: var(--primary-green-dark)">
            {{ lang.localize('استثمر الآن', 'Invest Now') }}
          </a>
        </div>
      </section>
    }
  `
})
export class HomeComponent implements OnInit {
  lang = inject(LanguageService);
  private homeService = inject(HomeService);

  loading = signal(true);
  homeData = signal<HomePage | null>(null);

  ngOnInit() {
    this.homeService.getHomeData().subscribe({
      next: (data) => {
        this.homeData.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
