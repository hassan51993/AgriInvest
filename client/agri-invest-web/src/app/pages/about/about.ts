import { Component, inject, OnInit, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { TeamService } from '../../core/services/team.service';
import { PageContentService } from '../../core/services/page-content.service';
import { TeamMember } from '../../core/models/team-member.model';
import { HeroSectionComponent } from '../../shared/components/hero-section/hero-section';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeroSectionComponent, SectionTitleComponent, LoadingSpinnerComponent],
  template: `
    <app-hero-section
      [title]="lang.localize('من نحن', 'Who We Are')"
      [subtitle]="lang.localize(
        'تعرف على فريقنا ورؤيتنا لمستقبل الزراعة في مصر',
        'Meet our team and vision for the future of agriculture in Egypt'
      )"
      backgroundImage="/assets/images/about-hero.jpg"
      height="50vh" />

    <!-- Vision & Mission -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="p-8 rounded-2xl" style="background-color: var(--sand)">
          <div class="text-4xl mb-4">🎯</div>
          <h3 class="text-2xl font-bold mb-4" style="color: var(--primary-green-dark)">
            {{ lang.localize('رؤيتنا', 'Our Vision') }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ lang.localize(
              'أن نكون الشركة الرائدة في تحويل الصحراء المصرية إلى أراضٍ زراعية منتجة ومستدامة، مع تحقيق عوائد استثمارية مجزية لشركائنا.',
              'To be the leading company in transforming the Egyptian desert into productive and sustainable agricultural land, while delivering rewarding investment returns for our partners.'
            ) }}
          </p>
        </div>
        <div class="p-8 rounded-2xl" style="background-color: var(--sand)">
          <div class="text-4xl mb-4">🌟</div>
          <h3 class="text-2xl font-bold mb-4" style="color: var(--primary-green-dark)">
            {{ lang.localize('مهمتنا', 'Our Mission') }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ lang.localize(
              'نسعى لتوظيف أحدث التقنيات الزراعية والموارد الطبيعية المتاحة في واحة الفرافرة لبناء مشاريع زراعية ناجحة تخدم الاقتصاد الوطني وتوفر فرص عمل للمجتمع المحلي.',
              'We strive to leverage the latest agricultural technologies and natural resources available in Farafra Oasis to build successful agricultural projects that serve the national economy and provide employment opportunities for the local community.'
            ) }}
          </p>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-16 px-4" style="background-color: var(--sand)">
      <div class="max-w-7xl mx-auto">
        <app-section-title
          [title]="lang.localize('قيمنا', 'Our Values')"
          [subtitle]="lang.localize('المبادئ التي توجه عملنا', 'The principles that guide our work')" />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (value of values; track value.icon) {
            <div class="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div class="text-4xl mb-4">{{ value.icon }}</div>
              <h4 class="font-bold mb-2" style="color: var(--primary-green-dark)">
                {{ lang.localize(value.titleAr, value.titleEn) }}
              </h4>
              <p class="text-sm text-gray-600">
                {{ lang.localize(value.descAr, value.descEn) }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <app-section-title
          [title]="lang.localize('فريق القيادة', 'Leadership Team')"
          [subtitle]="lang.localize('خبراء متخصصون في الزراعة والاستثمار', 'Experts specialized in agriculture and investment')" />
        @if (loadingTeam()) {
          <app-loading-spinner />
        } @else {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (member of teamMembers(); track member.id) {
              <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="h-56 overflow-hidden">
                  <img [src]="member.photoUrl || '/assets/images/team-placeholder.jpg'"
                       [alt]="lang.localize(member.nameAr, member.nameEn)"
                       class="w-full h-full object-cover">
                </div>
                <div class="p-5 text-center">
                  <h4 class="text-lg font-bold mb-1" style="color: var(--primary-green-dark)">
                    {{ lang.localize(member.nameAr, member.nameEn) }}
                  </h4>
                  <p class="text-sm mb-3" style="color: var(--accent-gold)">
                    {{ lang.localize(member.positionAr, member.positionEn) }}
                  </p>
                  <p class="text-sm text-gray-600 line-clamp-3">
                    {{ lang.localize(member.bioAr, member.bioEn) }}
                  </p>
                  @if (member.linkedInUrl) {
                    <a [href]="member.linkedInUrl" target="_blank" rel="noopener"
                       class="inline-flex items-center gap-1 mt-3 text-sm"
                       style="color: var(--primary-green)">
                      <i class="pi pi-linkedin"></i> LinkedIn
                    </a>
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class AboutComponent implements OnInit {
  lang = inject(LanguageService);
  private teamService = inject(TeamService);

  teamMembers = signal<TeamMember[]>([]);
  loadingTeam = signal(true);

  values = [
    { icon: '🌱', titleAr: 'الاستدامة', titleEn: 'Sustainability', descAr: 'نلتزم بممارسات زراعية مستدامة تحمي البيئة', descEn: 'We commit to sustainable farming practices that protect the environment' },
    { icon: '🤝', titleAr: 'الشفافية', titleEn: 'Transparency', descAr: 'نؤمن بالشفافية الكاملة مع شركائنا ومستثمرينا', descEn: 'We believe in full transparency with our partners and investors' },
    { icon: '💡', titleAr: 'الابتكار', titleEn: 'Innovation', descAr: 'نوظف أحدث التقنيات في مشاريعنا الزراعية', descEn: 'We employ the latest technologies in our agricultural projects' },
    { icon: '🏆', titleAr: 'التميز', titleEn: 'Excellence', descAr: 'نسعى للتميز في كل ما نقوم به', descEn: 'We strive for excellence in everything we do' },
  ];

  ngOnInit() {
    this.teamService.getAll().subscribe({
      next: (members) => {
        this.teamMembers.set(members);
        this.loadingTeam.set(false);
      },
      error: () => this.loadingTeam.set(false)
    });
  }
}
