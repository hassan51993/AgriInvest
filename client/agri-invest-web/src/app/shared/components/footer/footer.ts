import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './footer.scss',
  template: `
    <footer class="text-gray-200" style="background-color: var(--primary-green-dark)">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <!-- Company Info -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="text-2xl">🌱</span>
              <span class="text-xl font-bold text-white">
                {{ lang.localize('أجري إنفست', 'AgriInvest') }}
              </span>
            </div>
            <p class="text-sm leading-relaxed text-gray-300">
              {{ lang.localize(
                'شركة رائدة في الاستثمار الزراعي في منطقة الفرافرة بالوادي الجديد، مصر. نحول الصحراء إلى أراضٍ خضراء مثمرة.',
                'A leading agricultural investment company in El-Farafrah, New Valley, Egypt. We transform desert into green, fruitful land.'
              ) }}
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-white font-semibold text-lg mb-4">
              {{ lang.localize('روابط سريعة', 'Quick Links') }}
            </h3>
            <ul class="space-y-2">
              @for (link of quickLinks; track link.route) {
                <li>
                  <a [routerLink]="link.route"
                     class="text-sm text-gray-300 hover:text-[var(--accent-gold)] transition-colors duration-200">
                    {{ lang.localize(link.labelAr, link.labelEn) }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-white font-semibold text-lg mb-4">
              {{ lang.localize('معلومات الاتصال', 'Contact Info') }}
            </h3>
            <ul class="space-y-3 text-sm text-gray-300">
              <li class="flex items-start gap-2">
                <span>📍</span>
                <span>{{ lang.localize(
                  'الفرافرة، الوادي الجديد، مصر',
                  'Farafra, New Valley, Egypt'
                ) }}</span>
              </li>
              <li class="flex items-start gap-2">
                <span>📞</span>
                <span dir="ltr">+20 100 000 0000</span>
              </li>
              <li class="flex items-start gap-2">
                <span>✉️</span>
                <span>info&#64;agriinvest.eg</span>
              </li>
            </ul>
          </div>

          <!-- Social & Newsletter -->
          <div>
            <h3 class="text-white font-semibold text-lg mb-4">
              {{ lang.localize('تابعنا', 'Follow Us') }}
            </h3>
            <div class="flex gap-3 mb-6">
              <a href="#" class="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                 style="background-color: var(--primary-green-light)">
                <i class="pi pi-facebook"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                 style="background-color: var(--primary-green-light)">
                <i class="pi pi-twitter"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                 style="background-color: var(--primary-green-light)">
                <i class="pi pi-instagram"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                 style="background-color: var(--primary-green-light)">
                <i class="pi pi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-600 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© 2024 AgriInvest. {{ lang.localize('جميع الحقوق محفوظة', 'All rights reserved') }}.</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  lang = inject(LanguageService);

  quickLinks = [
    { route: '/about', labelAr: 'من نحن', labelEn: 'Who We Are' },
    { route: '/projects', labelAr: 'مشاريعنا', labelEn: 'Our Projects' },
    { route: '/success-stories', labelAr: 'قصص النجاح', labelEn: 'Success Stories' },
    { route: '/media', labelAr: 'المركز الإعلامي', labelEn: 'Media Center' },
    { route: '/contact', labelAr: 'اتصل بنا', labelEn: 'Contact Us' },
  ];
}
