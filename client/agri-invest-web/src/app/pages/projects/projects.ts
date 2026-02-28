import { Component, inject, OnInit, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { ProjectService } from '../../core/services/project.service';
import { ProjectSummary, ProjectType } from '../../core/models/project.model';
import { HeroSectionComponent } from '../../shared/components/hero-section/hero-section';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [HeroSectionComponent, ProjectCardComponent, LoadingSpinnerComponent],
  template: `
    <app-hero-section
      [title]="lang.localize('مشاريعنا', 'Our Projects')"
      [subtitle]="lang.localize(
        'اكتشف فرص الاستثمار الزراعي المتاحة في واحة الفرافرة',
        'Discover available agricultural investment opportunities in Farafra Oasis'
      )"
      backgroundImage="/assets/images/projects-hero.jpg"
      height="50vh" />

    <section class="py-16 px-4" style="background-color: var(--sand)">
      <div class="max-w-7xl mx-auto">
        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          @for (filter of filters; track filter.value) {
            <button (click)="filterByType(filter.value)"
                    [class]="activeFilter() === filter.value
                      ? 'px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200'
                      : 'px-5 py-2 rounded-full text-sm font-semibold bg-white text-gray-600 border border-gray-200 hover:border-green-500 transition-all duration-200'"
                    [style.background-color]="activeFilter() === filter.value ? 'var(--primary-green)' : ''">
              {{ lang.localize(filter.labelAr, filter.labelEn) }}
            </button>
          }
        </div>

        @if (loading()) {
          <app-loading-spinner />
        } @else if (projects().length === 0) {
          <div class="text-center py-12 text-gray-500">
            <div class="text-4xl mb-4">🌾</div>
            <p>{{ lang.localize('لا توجد مشاريع حالياً', 'No projects available at the moment') }}</p>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (project of projects(); track project.id) {
              <app-project-card [project]="project" />
            }
          </div>
        }
      </div>
    </section>
  `
})
export class ProjectsComponent implements OnInit {
  lang = inject(LanguageService);
  private projectService = inject(ProjectService);

  projects = signal<ProjectSummary[]>([]);
  loading = signal(true);
  activeFilter = signal<ProjectType | null>(null);

  filters: { value: ProjectType | null; labelAr: string; labelEn: string }[] = [
    { value: null, labelAr: 'الكل', labelEn: 'All' },
    { value: ProjectType.Crops, labelAr: 'محاصيل', labelEn: 'Crops' },
    { value: ProjectType.Livestock, labelAr: 'ثروة حيوانية', labelEn: 'Livestock' },
    { value: ProjectType.LandReclamation, labelAr: 'استصلاح أراضي', labelEn: 'Land Reclamation' },
    { value: ProjectType.OrganicFarming, labelAr: 'زراعة عضوية', labelEn: 'Organic Farming' },
    { value: ProjectType.Mixed, labelAr: 'مختلط', labelEn: 'Mixed' },
  ];

  ngOnInit() {
    this.loadProjects();
  }

  filterByType(type: ProjectType | null) {
    this.activeFilter.set(type);
    this.loadProjects();
  }

  private loadProjects() {
    this.loading.set(true);
    const type = this.activeFilter() ?? undefined;
    this.projectService.getAll(1, 50, type).subscribe({
      next: (result) => {
        this.projects.set(result.items);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
