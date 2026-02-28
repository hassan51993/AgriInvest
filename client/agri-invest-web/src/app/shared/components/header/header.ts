import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './header.scss',
  template: `
    <nav class="bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-2 no-underline">
            <span class="text-2xl">🌱</span>
            <span class="text-xl font-bold" style="color: var(--primary-green-dark)">
              {{ lang.localize('أجري إنفست', 'AgriInvest') }}
            </span>
          </a>

          <!-- Desktop Nav -->
          <div class="hidden lg:flex items-center gap-6">
            @for (link of navLinks; track link.route) {
              <a [routerLink]="link.route"
                 routerLinkActive="!text-[var(--accent-gold)] font-semibold"
                 [routerLinkActiveOptions]="{exact: link.route === '/'}"
                 class="text-sm font-medium transition-colors duration-200 hover:text-[var(--accent-gold)]"
                 style="color: var(--primary-green-dark)">
                {{ lang.localize(link.labelAr, link.labelEn) }}
              </a>
            }
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-3">
            <!-- Language Toggle -->
            <button (click)="lang.toggleLanguage()"
                    class="px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all duration-200 hover:scale-105"
                    style="border-color: var(--primary-green); color: var(--primary-green)">
              {{ lang.currentLang() === 'ar' ? 'EN' : 'عربي' }}
            </button>

            <!-- CTA Button (desktop) -->
            <a routerLink="/contact"
               class="hidden sm:inline-flex items-center px-5 py-2 text-sm font-semibold text-white rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg no-underline"
               style="background: linear-gradient(135deg, var(--primary-green), var(--primary-green-light))">
              {{ lang.localize('استثمر الآن', 'Invest Now') }}
            </a>

            <!-- Mobile Menu Toggle -->
            <button (click)="mobileMenuOpen.set(!mobileMenuOpen())"
                    class="lg:hidden p-2 rounded-md"
                    style="color: var(--primary-green-dark)">
              @if (mobileMenuOpen()) {
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              } @else {
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              }
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (mobileMenuOpen()) {
        <div class="lg:hidden border-t bg-white shadow-lg">
          <div class="px-4 py-3 space-y-2">
            @for (link of navLinks; track link.route) {
              <a [routerLink]="link.route"
                 routerLinkActive="!text-[var(--accent-gold)] font-semibold"
                 [routerLinkActiveOptions]="{exact: link.route === '/'}"
                 (click)="mobileMenuOpen.set(false)"
                 class="block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                 style="color: var(--primary-green-dark)">
                {{ lang.localize(link.labelAr, link.labelEn) }}
              </a>
            }
            <a routerLink="/contact"
               (click)="mobileMenuOpen.set(false)"
               class="block text-center px-5 py-2.5 text-sm font-semibold text-white rounded-full no-underline mt-3"
               style="background: linear-gradient(135deg, var(--primary-green), var(--primary-green-light))">
              {{ lang.localize('استثمر الآن', 'Invest Now') }}
            </a>
          </div>
        </div>
      }
    </nav>
  `
})
export class HeaderComponent {
  lang = inject(LanguageService);
  mobileMenuOpen = signal(false);

  navLinks = [
    { route: '/', labelAr: 'الرئيسية', labelEn: 'Home' },
    { route: '/about', labelAr: 'من نحن', labelEn: 'Who We Are' },
    { route: '/projects', labelAr: 'مشاريعنا', labelEn: 'Our Projects' },
    { route: '/success-stories', labelAr: 'قصص النجاح', labelEn: 'Success Stories' },
    { route: '/media', labelAr: 'المركز الإعلامي', labelEn: 'Media Center' },
    { route: '/how-it-works', labelAr: 'كيف نعمل', labelEn: 'How It Works' },
    { route: '/contact', labelAr: 'اتصل بنا', labelEn: 'Contact Us' },
  ];
}
