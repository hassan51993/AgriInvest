import { Component, inject, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './header.scss',
  template: `
    <nav class="nav" [class.nav--solid]="scrolled()" [class.nav--transparent]="!scrolled()">
      <div class="nav__inner">

        <!-- Logo -->
        <a routerLink="/" class="nav__logo">
          <span class="nav__logo-mark">✦</span>
          <span class="nav__logo-text">
            {{ lang.localize('أجري إنفست', 'AgriInvest') }}
          </span>
        </a>

        <!-- Desktop nav links -->
        <div class="nav__links">
          @for (link of navLinks; track link.route) {
            <a [routerLink]="link.route"
               routerLinkActive="nav__link--active"
               [routerLinkActiveOptions]="{exact: link.route === '/'}"
               class="nav__link">
              {{ lang.localize(link.labelAr, link.labelEn) }}
            </a>
          }
        </div>

        <!-- Right controls -->
        <div class="nav__actions">
          <button (click)="toggleDark()" class="nav__icon-btn" [title]="isDark() ? 'Light mode' : 'Dark mode'">
            @if (isDark()) {
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            } @else {
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            }
          </button>

          <button (click)="lang.toggleLanguage()" class="nav__lang-btn">
            {{ lang.currentLang() === 'ar' ? 'EN' : 'عربي' }}
          </button>

          <a routerLink="/contact" class="nav__cta">
            {{ lang.localize('استثمر الآن', 'Invest Now') }}
          </a>

          <button (click)="mobileMenuOpen.set(!mobileMenuOpen())" class="nav__hamburger">
            @if (mobileMenuOpen()) {
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            } @else {
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            }
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      @if (mobileMenuOpen()) {
        <div class="nav__mobile">
          @for (link of navLinks; track link.route) {
            <a [routerLink]="link.route"
               routerLinkActive="nav__mobile-link--active"
               [routerLinkActiveOptions]="{exact: link.route === '/'}"
               (click)="mobileMenuOpen.set(false)"
               class="nav__mobile-link">
              {{ lang.localize(link.labelAr, link.labelEn) }}
            </a>
          }
          <a routerLink="/contact" (click)="mobileMenuOpen.set(false)" class="nav__mobile-cta">
            {{ lang.localize('استثمر الآن', 'Invest Now') }}
          </a>
        </div>
      }
    </nav>
  `
})
export class HeaderComponent {
  lang = inject(LanguageService);
  private doc = inject(DOCUMENT);

  scrolled = signal(false);
  mobileMenuOpen = signal(false);
  isDark = signal(false);

  constructor() {
    this.isDark.set(this.doc.documentElement.classList.contains('dark'));
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrolled.set(window.scrollY > 60);
  }

  toggleDark() {
    const html = this.doc.documentElement;
    const dark = html.classList.toggle('dark');
    if (dark) html.classList.remove('light');
    else html.classList.add('light');
    this.isDark.set(dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
  }

  navLinks = [
    { route: '/', labelAr: 'الرئيسية', labelEn: 'Home' },
    { route: '/about', labelAr: 'من نحن', labelEn: 'Who We Are' },
    { route: '/projects', labelAr: 'مشاريعنا', labelEn: 'Projects' },
    { route: '/success-stories', labelAr: 'قصص النجاح', labelEn: 'Stories' },
    { route: '/media', labelAr: 'الإعلام', labelEn: 'Media' },
    { route: '/how-it-works', labelAr: 'كيف نعمل', labelEn: 'Process' },
    { route: '/contact', labelAr: 'اتصل بنا', labelEn: 'Contact' },
  ];
}
