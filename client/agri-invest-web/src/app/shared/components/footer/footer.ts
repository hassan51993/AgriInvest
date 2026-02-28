import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './footer.scss',
  template: `
    <footer class="site-footer">
      <div class="site-footer__inner">

        <!-- ── Brand column ─────────────────────── -->
        <div class="site-footer__brand">
          <div class="site-footer__logo">
            <span class="site-footer__logo-name">AgriInvest</span>
            <span class="site-footer__logo-mark">✦</span>
          </div>
          <p class="site-footer__tagline">
            {{ lang.localize(
              'نحول الصحراء إلى جنة خضراء. استثمارات زراعية مستدامة في واحة الفرافرة، الوادي الجديد، مصر.',
              'Transforming desert into green paradise. Sustainable agricultural investments in Farafra Oasis, New Valley, Egypt.'
            ) }}
          </p>
          <div class="site-footer__social">
            <a href="#" class="site-footer__social-link" aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" class="site-footer__social-link" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="#" class="site-footer__social-link" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- ── Quick links ───────────────────────── -->
        <div class="site-footer__col">
          <h4 class="site-footer__col-head">
            {{ lang.localize('روابط سريعة', 'Quick Links') }}
          </h4>
          <nav>
            @for (link of quickLinks; track link.route) {
              <a [routerLink]="link.route" class="site-footer__link">
                {{ lang.localize(link.labelAr, link.labelEn) }}
              </a>
            }
          </nav>
        </div>

        <!-- ── Contact ───────────────────────────── -->
        <div class="site-footer__col">
          <h4 class="site-footer__col-head">
            {{ lang.localize('تواصل معنا', 'Get in Touch') }}
          </h4>
          <ul class="site-footer__contact-list">
            <li class="site-footer__contact-item">
              <svg class="site-footer__contact-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{{ lang.localize('الفرافرة، الوادي الجديد، مصر', 'Farafra, New Valley, Egypt') }}</span>
            </li>
            <li class="site-footer__contact-item">
              <svg class="site-footer__contact-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.54-.89a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.27 16z"/>
              </svg>
              <span dir="ltr">+20 100 000 0000</span>
            </li>
            <li class="site-footer__contact-item">
              <svg class="site-footer__contact-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              <a href="mailto:info@agriinvest.eg" class="site-footer__email">info&#64;agriinvest.eg</a>
            </li>
          </ul>
        </div>

      </div>

      <!-- ── Bottom bar ─────────────────────────── -->
      <div class="site-footer__bottom">
        <div class="site-footer__bottom-inner">
          <hr class="site-footer__rule" />
          <p class="site-footer__copy">
            © {{ year }} AgriInvest
            <span class="site-footer__copy-sep">·</span>
            {{ lang.localize('جميع الحقوق محفوظة', 'All rights reserved') }}
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  lang = inject(LanguageService);
  year = new Date().getFullYear();

  quickLinks = [
    { route: '/about',           labelAr: 'من نحن',          labelEn: 'Who We Are'      },
    { route: '/projects',        labelAr: 'مشاريعنا',         labelEn: 'Our Projects'    },
    { route: '/success-stories', labelAr: 'قصص النجاح',       labelEn: 'Success Stories' },
    { route: '/how-it-works',    labelAr: 'كيف يعمل',         labelEn: 'How It Works'    },
    { route: '/media',           labelAr: 'المركز الإعلامي',  labelEn: 'Media Center'    },
    { route: '/contact',         labelAr: 'اتصل بنا',         labelEn: 'Contact Us'      },
  ];
}
