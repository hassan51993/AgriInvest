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
  styleUrl: './home.scss',
  template: `
    @if (loading()) {
      <app-loading-spinner />
    } @else {

      <!-- ── Hero ─────────────────────────────────────────── -->
      <app-hero-section
        [eyebrow]="lang.localize('الفرافرة، الوادي الجديد — مصر', 'El-Farafrah, New Valley — Egypt')"
        [title]="lang.localize('نحول الصحراء إلى جنة خضراء', 'Transforming Desert into Green Paradise')"
        [subtitle]="lang.localize(
          'استثمر في مستقبل الزراعة المصرية في واحة الفرافرة',
          'Invest in the future of Egyptian agriculture in Farafra Oasis'
        )"
        backgroundImage="/assets/images/hero-farm.jpg"
        height="92svh"
        [showCta]="true">
        <a routerLink="/projects" class="btn btn--gold">
          {{ lang.localize('استكشف المشاريع', 'Explore Projects') }}
        </a>
        <a routerLink="/contact" class="btn btn--ghost">
          {{ lang.localize('تواصل معنا', 'Get in Touch') }}
        </a>
      </app-hero-section>

      <!-- ── Stats bar ─────────────────────────────────────── -->
      <section class="stats-bar">
        <div class="stats-bar__inner">
          <app-stats-counter [value]="5000" [label]="lang.localize('هكتار مزروع', 'Hectares Cultivated')" suffix="+" />
          <app-stats-counter [value]="150" [label]="lang.localize('مستثمر', 'Active Investors')" suffix="+" />
          <app-stats-counter [value]="25" [label]="lang.localize('عائد متوقع', 'Expected ROI %')" suffix="%" />
          <app-stats-counter [value]="12" [label]="lang.localize('مشروع نشط', 'Live Projects')" suffix="" />
        </div>
      </section>

      <!-- ── Featured Projects ─────────────────────────────── -->
      @if (homeData()?.featuredProjects?.length) {
        <section class="section section--subtle">
          <div class="section__inner">
            <app-section-title
              [title]="lang.localize('مشاريعنا المميزة', 'Featured Projects')"
              [subtitle]="lang.localize(
                'اكتشف فرص الاستثمار الزراعي في واحة الفرافرة',
                'Discover agricultural investment opportunities in Farafra Oasis'
              )" />
            <div class="card-grid">
              @for (project of homeData()!.featuredProjects; track project.id) {
                <app-project-card [project]="project" />
              }
            </div>
            <div class="section__footer">
              <a routerLink="/projects" class="link-arrow">
                {{ lang.localize('عرض جميع المشاريع', 'View All Projects') }}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      }

      <!-- ── About ──────────────────────────────────────────── -->
      <section class="section section--base">
        <div class="section__inner about-grid">
          <!-- Left: text -->
          <div class="about__text">
            <app-section-title
              [title]="lang.localize('لماذا أجري إنفست؟', 'Why AgriInvest?')"
              align="left" />
            <p class="about__body">
              {{ lang.localize(
                'نحن نؤمن بأن الصحراء المصرية تحتضن إمكانيات زراعية هائلة. من خلال التقنيات الحديثة والخبرة المحلية، نحول الأراضي القاحلة إلى مزارع منتجة.',
                'We believe the Egyptian desert holds immense agricultural potential. Through modern techniques and local expertise, we transform barren land into productive farms.'
              ) }}
            </p>
            <p class="about__body">
              {{ lang.localize(
                'واحة الفرافرة بالوادي الجديد تتمتع بمياه جوفية وفيرة وتربة خصبة، مما يجعلها موقعاً مثالياً للاستثمار الزراعي.',
                'Farafra Oasis in New Valley features abundant groundwater and fertile soil, making it an ideal location for agricultural investment.'
              ) }}
            </p>
            <div class="about__features">
              @for (feat of features; track feat.label) {
                <div class="about__feat">
                  <span class="about__feat-icon">{{ feat.icon }}</span>
                  <span class="about__feat-label">{{ lang.localize(feat.labelAr, feat.label) }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Right: image with badge -->
          <div class="about__visual">
            <img src="/assets/images/about-farm.jpg" alt="Farm" class="about__img">
            <div class="about__badge">
              <span class="about__badge-num">10+</span>
              <span class="about__badge-text">{{ lang.localize('سنوات خبرة', 'Years Experience') }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Success Stories ────────────────────────────────── -->
      @if (homeData()?.featuredStories?.length) {
        <section class="section section--surface">
          <div class="section__inner">
            <app-section-title
              [title]="lang.localize('قصص نجاح ملهمة', 'Inspiring Success Stories')"
              [subtitle]="lang.localize(
                'تعرف على قصص نجاح مستثمرينا في تحويل الصحراء',
                'Learn about our investors success stories in transforming the desert'
              )" />
            <div class="card-grid">
              @for (story of homeData()!.featuredStories; track story.id) {
                <app-story-card [story]="story" />
              }
            </div>
            <div class="section__footer">
              <a routerLink="/success-stories" class="link-arrow">
                {{ lang.localize('عرض جميع القصص', 'View All Stories') }}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      }

      <!-- ── CTA ───────────────────────────────────────────── -->
      <section class="cta-section">
        <div class="cta-section__inner">
          <p class="cta-section__eyebrow">{{ lang.localize('ابدأ اليوم', 'Start Today') }}</p>
          <h2 class="cta-section__heading">
            {{ lang.localize('ابدأ رحلتك الاستثمارية اليوم', 'Start Your Investment Journey Today') }}
          </h2>
          <p class="cta-section__sub">
            {{ lang.localize(
              'انضم إلى مئات المستثمرين الذين يحققون عوائد مجزية من الزراعة المستدامة',
              'Join hundreds of investors achieving rewarding returns from sustainable agriculture'
            ) }}
          </p>
          <a routerLink="/contact" class="btn btn--gold-lg">
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

  features = [
    { icon: '◈', label: 'Abundant Groundwater', labelAr: 'مياه جوفية وفيرة' },
    { icon: '◈', label: 'Ideal Sunlight', labelAr: 'أشعة شمس مثالية' },
    { icon: '◈', label: 'Organic Farming', labelAr: 'زراعة عضوية' },
    { icon: '◈', label: 'Rewarding Returns', labelAr: 'عوائد مجزية' },
  ];

  ngOnInit() {
    this.homeService.getHomeData().subscribe({
      next: (data) => { this.homeData.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}
