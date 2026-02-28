import { Injectable, signal, computed, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly document = inject(DOCUMENT);

  readonly currentLang = signal<'ar' | 'en'>('en');

  readonly isRtl = computed(() => this.currentLang() === 'ar');

  constructor() {
    this.applyLanguageAttributes();
  }

  toggleLanguage(): void {
    const newLang = this.currentLang() === 'ar' ? 'en' : 'ar';
    this.currentLang.set(newLang);
    this.applyLanguageAttributes();
  }

  localize<T>(arValue: T, enValue: T): T {
    return this.currentLang() === 'ar' ? arValue : enValue;
  }

  private applyLanguageAttributes(): void {
    const lang = this.currentLang();
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.document.documentElement.lang = lang;
    this.document.documentElement.dir = dir;
  }
}
