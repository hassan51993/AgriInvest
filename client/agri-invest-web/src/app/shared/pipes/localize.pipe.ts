import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

@Pipe({
  name: 'localize',
  standalone: true,
  pure: false
})
export class LocalizePipe implements PipeTransform {
  private readonly languageService = inject(LanguageService);

  transform(item: any, property: string): string {
    if (!item || !property) {
      return '';
    }

    const lang = this.languageService.currentLang();
    const suffix = lang === 'ar' ? 'Ar' : 'En';
    const key = `${property}${suffix}`;

    return item[key] ?? '';
  }
}
