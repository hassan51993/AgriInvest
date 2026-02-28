import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe, DatePipe } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, LoadingSpinnerComponent, DecimalPipe, DatePipe],
  template: `
    @if (loading()) {
      <app-loading-spinner />
    } @else if (project()) {
      <!-- Hero -->
      <section class="relative h-[50vh] flex items-end">
        <div class="absolute inset-0 bg-cover bg-center"
             [style.background-image]="'url(' + (project()!.featuredImageUrl || '/assets/images/project-placeholder.jpg') + ')'">
        </div>
        <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.8), transparent)"></div>
        <div class="relative z-10 max-w-7xl mx-auto px-4 pb-8 w-full">
          <a routerLink="/projects" class="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm">
            ← {{ lang.localize('العودة للمشاريع', 'Back to Projects') }}
          </a>
          <h1 class="text-3xl sm:text-4xl font-bold text-white mb-2">
            {{ lang.localize(project()!.titleAr, project()!.titleEn) }}
          </h1>
          <div class="flex flex-wrap gap-3 mt-3">
            <span class="px-3 py-1 text-xs font-semibold text-white rounded-full" style="background-color: var(--primary-green)">
              {{ project()!.typeName }}
            </span>
            <span class="px-3 py-1 text-xs font-semibold text-white rounded-full" style="background-color: var(--accent-gold)">
              {{ project()!.statusName }}
            </span>
          </div>
        </div>
      </section>

      <!-- Content -->
      <section class="py-12 px-4">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <div class="prose max-w-none text-gray-700 leading-relaxed">
              <p>{{ lang.localize(project()!.descriptionAr, project()!.descriptionEn) }}</p>
            </div>

            <!-- Gallery -->
            @if (project()!.images?.length) {
              <div class="mt-8">
                <h3 class="text-xl font-bold mb-4" style="color: var(--primary-green-dark)">
                  {{ lang.localize('معرض الصور', 'Gallery') }}
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  @for (img of project()!.images; track img.id) {
                    <img [src]="img.imageUrl" [alt]="img.caption"
                         class="w-full h-40 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  }
                </div>
              </div>
            }
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Investment Card -->
            <div class="bg-white rounded-xl shadow-lg p-6 border" style="border-color: var(--sand-dark)">
              <h3 class="text-lg font-bold mb-4" style="color: var(--primary-green-dark)">
                {{ lang.localize('تفاصيل الاستثمار', 'Investment Details') }}
              </h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span class="text-sm text-gray-500">{{ lang.localize('المساحة', 'Area') }}</span>
                  <span class="font-semibold">{{ project()!.areaInHectares }} {{ lang.localize('هكتار', 'ha') }}</span>
                </div>
                <div class="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span class="text-sm text-gray-500">{{ lang.localize('الاستثمار المستهدف', 'Target Investment') }}</span>
                  <span class="font-semibold">{{ project()!.targetInvestmentAmount | number }} {{ project()!.targetInvestmentCurrency }}</span>
                </div>
                <div class="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span class="text-sm text-gray-500">{{ lang.localize('العائد المتوقع', 'Expected ROI') }}</span>
                  <span class="font-bold text-lg" style="color: var(--accent-gold)">{{ project()!.expectedROI }}%</span>
                </div>
                <div class="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span class="text-sm text-gray-500">{{ lang.localize('الموقع', 'Location') }}</span>
                  <span class="text-sm">{{ lang.localize(project()!.locationAddressAr, project()!.locationAddressEn) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">{{ lang.localize('المدة', 'Duration') }}</span>
                  <span class="text-sm">{{ project()!.durationStartDate | date:'MMM yyyy' }} - {{ project()!.durationEndDate | date:'MMM yyyy' }}</span>
                </div>
              </div>
              <a routerLink="/contact"
                 class="block text-center mt-6 px-6 py-3 text-white font-semibold rounded-full no-underline transition-all hover:scale-105"
                 style="background: linear-gradient(135deg, var(--primary-green), var(--primary-green-light))">
                {{ lang.localize('استثمر في هذا المشروع', 'Invest in This Project') }}
              </a>
            </div>
          </div>
        </div>
      </section>
    } @else {
      <div class="text-center py-20 text-gray-500">
        <div class="text-4xl mb-4">🔍</div>
        <p>{{ lang.localize('المشروع غير موجود', 'Project not found') }}</p>
        <a routerLink="/projects" class="mt-4 inline-block" style="color: var(--primary-green)">
          {{ lang.localize('العودة للمشاريع', 'Back to Projects') }}
        </a>
      </div>
    }
  `
})
export class ProjectDetailComponent implements OnInit {
  lang = inject(LanguageService);
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  project = signal<Project | null>(null);
  loading = signal(true);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.projectService.getBySlug(slug).subscribe({
        next: (p) => {
          this.project.set(p);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    }
  }
}
