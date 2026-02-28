import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { HeroSectionComponent } from '../../shared/components/hero-section/hero-section';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [RouterLink, HeroSectionComponent, SectionTitleComponent],
  template: `
    <app-hero-section
      [title]="lang.localize('كيف نعمل', 'How It Works')"
      [subtitle]="lang.localize(
        'خطوات بسيطة للبدء في رحلتك الاستثمارية الزراعية',
        'Simple steps to start your agricultural investment journey'
      )"
      backgroundImage="/assets/images/how-hero.jpg"
      height="50vh" />

    <!-- Steps -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-5xl mx-auto">
        <app-section-title
          [title]="lang.localize('رحلة الاستثمار', 'Investment Journey')"
          [subtitle]="lang.localize('من البداية إلى الحصاد', 'From start to harvest')" />

        <div class="space-y-12 mt-12">
          @for (step of steps; track step.number; let i = $index) {
            <div class="flex flex-col md:flex-row items-center gap-8"
                 [class.md:flex-row-reverse]="i % 2 !== 0">
              <!-- Number Circle -->
              <div class="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                   style="background: linear-gradient(135deg, var(--primary-green), var(--primary-green-light))">
                {{ step.number }}
              </div>
              <!-- Content -->
              <div class="flex-1 p-6 rounded-xl" style="background-color: var(--sand)">
                <div class="text-3xl mb-3">{{ step.icon }}</div>
                <h3 class="text-xl font-bold mb-2" style="color: var(--primary-green-dark)">
                  {{ lang.localize(step.titleAr, step.titleEn) }}
                </h3>
                <p class="text-gray-600">
                  {{ lang.localize(step.descAr, step.descEn) }}
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 px-4" style="background-color: var(--sand)">
      <div class="max-w-4xl mx-auto">
        <app-section-title
          [title]="lang.localize('أسئلة شائعة', 'Frequently Asked Questions')"
          [subtitle]="''" />
        <div class="space-y-4">
          @for (faq of faqs; track faq.questionEn) {
            <details class="bg-white rounded-xl shadow-md overflow-hidden group">
              <summary class="flex items-center justify-between p-5 cursor-pointer font-semibold"
                       style="color: var(--primary-green-dark)">
                {{ lang.localize(faq.questionAr, faq.questionEn) }}
                <span class="transition-transform group-open:rotate-180 text-xl">▼</span>
              </summary>
              <div class="px-5 pb-5 text-gray-600">
                {{ lang.localize(faq.answerAr, faq.answerEn) }}
              </div>
            </details>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 px-4 text-center text-white"
             style="background: linear-gradient(135deg, var(--primary-green-dark), var(--primary-green))">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold text-white mb-4">
          {{ lang.localize('جاهز للبدء؟', 'Ready to Get Started?') }}
        </h2>
        <p class="text-gray-200 mb-8">
          {{ lang.localize('تواصل معنا اليوم واحصل على استشارة مجانية', 'Contact us today and get a free consultation') }}
        </p>
        <a routerLink="/contact"
           class="inline-flex px-8 py-3 text-lg font-semibold rounded-full transition-all hover:scale-105 no-underline"
           style="background-color: var(--accent-gold); color: var(--primary-green-dark)">
          {{ lang.localize('تواصل معنا', 'Contact Us') }}
        </a>
      </div>
    </section>
  `
})
export class HowItWorksComponent {
  lang = inject(LanguageService);

  steps = [
    {
      number: 1, icon: '🔍',
      titleAr: 'استكشف المشاريع', titleEn: 'Explore Projects',
      descAr: 'تصفح مشاريعنا الزراعية المتنوعة واختر المشروع الذي يناسب أهدافك الاستثمارية. كل مشروع يتضمن تفاصيل شاملة عن العائد المتوقع والمساحة والموقع.',
      descEn: 'Browse our diverse agricultural projects and choose the one that suits your investment goals. Each project includes comprehensive details about expected returns, area, and location.'
    },
    {
      number: 2, icon: '📋',
      titleAr: 'قدّم طلبك', titleEn: 'Submit Your Application',
      descAr: 'تواصل معنا عبر نموذج الاتصال أو اتصل بنا مباشرة. سيقوم فريقنا بتزويدك بجميع المعلومات والتفاصيل التي تحتاجها لاتخاذ قرارك.',
      descEn: 'Contact us through the form or call us directly. Our team will provide you with all the information and details you need to make your decision.'
    },
    {
      number: 3, icon: '🤝',
      titleAr: 'وقّع العقد', titleEn: 'Sign the Agreement',
      descAr: 'بعد اختيار المشروع المناسب، نقوم بإعداد عقد استثمار شفاف يحدد حقوقك والعوائد المتوقعة والجدول الزمني.',
      descEn: 'After choosing the right project, we prepare a transparent investment agreement that specifies your rights, expected returns, and timeline.'
    },
    {
      number: 4, icon: '🌱',
      titleAr: 'تابع التقدم', titleEn: 'Track Progress',
      descAr: 'نوفر لك تحديثات دورية عن تقدم مشروعك مع صور وتقارير مفصلة. يمكنك أيضاً زيارة مشروعك في أي وقت.',
      descEn: 'We provide regular updates on your project progress with photos and detailed reports. You can also visit your project at any time.'
    },
    {
      number: 5, icon: '💰',
      titleAr: 'احصد العوائد', titleEn: 'Harvest Returns',
      descAr: 'عند نضج المحاصيل وبيعها، يتم توزيع الأرباح وفقاً للاتفاق. نحن ملتزمون بالشفافية الكاملة في جميع المعاملات المالية.',
      descEn: 'When crops mature and are sold, profits are distributed according to the agreement. We are committed to full transparency in all financial transactions.'
    },
  ];

  faqs = [
    {
      questionAr: 'ما هو الحد الأدنى للاستثمار؟',
      questionEn: 'What is the minimum investment?',
      answerAr: 'يختلف الحد الأدنى للاستثمار حسب المشروع، ولكن بشكل عام يبدأ من 50,000 جنيه مصري. تواصل معنا للحصول على تفاصيل محددة.',
      answerEn: 'The minimum investment varies by project, but generally starts from 50,000 EGP. Contact us for specific details.'
    },
    {
      questionAr: 'كيف يتم توزيع الأرباح؟',
      questionEn: 'How are profits distributed?',
      answerAr: 'يتم توزيع الأرباح بعد بيع المحاصيل وفقاً للنسب المتفق عليها في العقد. عادة ما يكون ذلك بشكل ربع سنوي أو بعد انتهاء الموسم.',
      answerEn: 'Profits are distributed after crop sales according to the agreed percentages in the contract. This is typically quarterly or after the season ends.'
    },
    {
      questionAr: 'هل يمكنني زيارة مشروعي؟',
      questionEn: 'Can I visit my project?',
      answerAr: 'بالطبع! نرحب بزيارتك في أي وقت. كما ننظم رحلات جماعية للمستثمرين بشكل دوري لزيارة المشاريع في الفرافرة.',
      answerEn: 'Absolutely! You are welcome to visit at any time. We also organize group trips for investors regularly to visit projects in Farafra.'
    },
    {
      questionAr: 'ما هي المخاطر المتوقعة؟',
      questionEn: 'What are the expected risks?',
      answerAr: 'كأي استثمار زراعي، هناك مخاطر مثل الظروف المناخية وتقلبات السوق. نقوم بإدارة هذه المخاطر من خلال التنويع والتأمين والتقنيات الحديثة.',
      answerEn: 'As with any agricultural investment, there are risks such as weather conditions and market fluctuations. We manage these risks through diversification, insurance, and modern technologies.'
    },
  ];
}
