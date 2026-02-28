import { Component, inject, OnInit, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { MediaService } from '../../core/services/media.service';
import { MediaItem, MediaType } from '../../core/models/media-item.model';
import { HeroSectionComponent } from '../../shared/components/hero-section/hero-section';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-media-center',
  standalone: true,
  imports: [HeroSectionComponent, LoadingSpinnerComponent, DatePipe],
  template: `
    <app-hero-section
      [title]="lang.localize('المركز الإعلامي', 'Media Center')"
      [subtitle]="lang.localize(
        'آخر الأخبار والتحديثات من أجري إنفست',
        'Latest news and updates from AgriInvest'
      )"
      backgroundImage="/assets/images/media-hero.jpg"
      height="50vh" />

    <section class="py-16 px-4" style="background-color: var(--sand)">
      <div class="max-w-7xl mx-auto">
        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          @for (tab of tabs; track tab.value) {
            <button (click)="filterByType(tab.value)"
                    [class]="activeTab() === tab.value
                      ? 'px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200'
                      : 'px-5 py-2 rounded-full text-sm font-semibold bg-white text-gray-600 border border-gray-200 hover:border-green-500 transition-all duration-200'"
                    [style.background-color]="activeTab() === tab.value ? 'var(--primary-green)' : ''">
              {{ lang.localize(tab.labelAr, tab.labelEn) }}
            </button>
          }
        </div>

        @if (loading()) {
          <app-loading-spinner />
        } @else if (mediaItems().length === 0) {
          <div class="text-center py-12 text-gray-500">
            <div class="text-4xl mb-4">📰</div>
            <p>{{ lang.localize('لا توجد عناصر إعلامية', 'No media items available') }}</p>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (item of mediaItems(); track item.id) {
              <div class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="relative h-48 overflow-hidden">
                  <img [src]="item.thumbnailUrl || item.url || '/assets/images/media-placeholder.jpg'"
                       [alt]="lang.localize(item.titleAr, item.titleEn)"
                       class="w-full h-full object-cover">
                  <span class="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full"
                        [style.background-color]="getTypeColor(item.type)">
                    {{ getTypeLabel(item.type) }}
                  </span>
                  @if (item.type === MediaType.Video) {
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <span class="text-2xl" style="color: var(--primary-green)">▶</span>
                      </div>
                    </div>
                  }
                </div>
                <div class="p-5">
                  <div class="text-xs text-gray-400 mb-2">{{ item.publishDate | date:'mediumDate' }}</div>
                  <h3 class="text-lg font-bold mb-2" style="color: var(--primary-green-dark)">
                    {{ lang.localize(item.titleAr, item.titleEn) }}
                  </h3>
                  <p class="text-sm text-gray-600 line-clamp-2">
                    {{ lang.localize(item.descriptionAr, item.descriptionEn) }}
                  </p>
                  @if (item.tags) {
                    <div class="flex flex-wrap gap-1 mt-3">
                      @for (tag of item.tags.split(','); track tag) {
                        <span class="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500">{{ tag.trim() }}</span>
                      }
                    </div>
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
export class MediaCenterComponent implements OnInit {
  lang = inject(LanguageService);
  private mediaService = inject(MediaService);

  MediaType = MediaType;
  mediaItems = signal<MediaItem[]>([]);
  loading = signal(true);
  activeTab = signal<MediaType | null>(null);

  tabs: { value: MediaType | null; labelAr: string; labelEn: string }[] = [
    { value: null, labelAr: 'الكل', labelEn: 'All' },
    { value: MediaType.News, labelAr: 'أخبار', labelEn: 'News' },
    { value: MediaType.PressRelease, labelAr: 'بيانات صحفية', labelEn: 'Press Releases' },
    { value: MediaType.Photo, labelAr: 'صور', labelEn: 'Photos' },
    { value: MediaType.Video, labelAr: 'فيديو', labelEn: 'Videos' },
  ];

  ngOnInit() {
    this.loadMedia();
  }

  filterByType(type: MediaType | null) {
    this.activeTab.set(type);
    this.loadMedia();
  }

  private loadMedia() {
    this.loading.set(true);
    const obs = this.activeTab() !== null
      ? this.mediaService.getByType(this.activeTab()!)
      : this.mediaService.getAll();
    obs.subscribe({
      next: (data) => {
        this.mediaItems.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  getTypeColor(type: MediaType): string {
    switch (type) {
      case MediaType.News: return 'var(--primary-green)';
      case MediaType.PressRelease: return 'var(--sky-blue)';
      case MediaType.Photo: return 'var(--accent-gold)';
      case MediaType.Video: return 'var(--earth-brown)';
      default: return 'var(--primary-green)';
    }
  }

  getTypeLabel(type: MediaType): string {
    return this.lang.localize(
      ['أخبار', 'بيان صحفي', 'صورة', 'فيديو'][type],
      ['News', 'Press', 'Photo', 'Video'][type]
    );
  }
}
