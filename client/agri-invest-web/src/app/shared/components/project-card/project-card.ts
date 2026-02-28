import { Component, inject, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { ProjectSummary } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './project-card.scss',
  template: `
    <a [routerLink]="['/projects', project().slug]"
       class="block group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 no-underline">
      <!-- Image -->
      <div class="relative h-48 overflow-hidden">
        <img [src]="project().featuredImageUrl || '/assets/images/project-placeholder.jpg'"
             [alt]="lang.localize(project().titleAr, project().titleEn)"
             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <!-- Type Badge -->
        <span class="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full"
              style="background-color: var(--primary-green)">
          {{ lang.localize(project().typeName || 'مشروع', project().typeName || 'Project') }}
        </span>
        <!-- ROI Badge -->
        <span class="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white rounded-full"
              style="background-color: var(--accent-gold)">
          {{ project().expectedROI }}% ROI
        </span>
      </div>
      <!-- Content -->
      <div class="p-5">
        <h3 class="text-lg font-bold mb-2 group-hover:text-[var(--accent-gold)] transition-colors"
            style="color: var(--primary-green-dark)">
          {{ lang.localize(project().titleAr, project().titleEn) }}
        </h3>
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>📍</span>
          <span>{{ lang.localize(project().locationAddressAr, project().locationAddressEn) }}</span>
        </div>
        <div class="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>🌾 {{ project().areaInHectares }} {{ lang.localize('هكتار', 'hectares') }}</span>
        </div>
        <!-- Investment Progress -->
        <div class="mt-3">
          <div class="flex justify-between text-xs text-gray-500 mb-1">
            <span>{{ lang.localize('التمويل', 'Funded') }}</span>
            <span>{{ progressPercent() }}%</span>
          </div>
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full rounded-full transition-all duration-700"
                 [style.width.%]="progressPercent()"
                 style="background: linear-gradient(90deg, var(--primary-green), var(--primary-green-light))">
            </div>
          </div>
          <div class="flex justify-between text-xs text-gray-400 mt-1">
            <span>{{ formatCurrency(project().currentInvestmentAmount) }}</span>
            <span>{{ formatCurrency(project().targetInvestmentAmount) }}</span>
          </div>
        </div>
      </div>
    </a>
  `
})
export class ProjectCardComponent {
  lang = inject(LanguageService);
  project = input.required<ProjectSummary>();

  progressPercent = computed(() => {
    const p = this.project();
    if (!p.targetInvestmentAmount) return 0;
    return Math.min(100, Math.round((p.currentInvestmentAmount / p.targetInvestmentAmount) * 100));
  });

  formatCurrency(amount: number): string {
    if (!amount) return '0';
    if (amount >= 1_000_000) {
      return (amount / 1_000_000).toFixed(1) + 'M';
    }
    if (amount >= 1_000) {
      return (amount / 1_000).toFixed(0) + 'K';
    }
    return amount.toString();
  }
}
