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
    <a [routerLink]="['/projects', project().slug]" class="card">
      <!-- Image -->
      <div class="card__image">
        <img [src]="project().featuredImageUrl || '/assets/images/project-placeholder.jpg'"
             [alt]="lang.localize(project().titleAr, project().titleEn)"
             class="card__img">
        <div class="card__badges">
          <span class="card__badge card__badge--type">
            {{ lang.localize(project().typeName || 'مشروع', project().typeName || 'Project') }}
          </span>
          <span class="card__badge card__badge--roi">{{ project().expectedROI }}% ROI</span>
        </div>
      </div>

      <!-- Body -->
      <div class="card__body">
        <p class="card__meta">
          {{ lang.localize(project().locationAddressAr, project().locationAddressEn) }}
        </p>
        <h3 class="card__title">
          {{ lang.localize(project().titleAr, project().titleEn) }}
        </h3>
        <p class="card__area">
          {{ project().areaInHectares }} {{ lang.localize('هكتار', 'hectares') }}
        </p>

        <!-- Investment progress -->
        <div class="card__progress">
          <div class="card__progress-header">
            <span>{{ lang.localize('التمويل', 'Funded') }}</span>
            <span class="card__progress-pct">{{ progressPercent() }}%</span>
          </div>
          <div class="card__progress-track">
            <div class="card__progress-fill" [style.width.%]="progressPercent()"></div>
          </div>
          <div class="card__progress-amounts">
            <span>{{ formatCurrency(project().currentInvestmentAmount) }}</span>
            <span>{{ formatCurrency(project().targetInvestmentAmount) }}</span>
          </div>
        </div>
      </div>

      <!-- Gold left-edge accent revealed on hover -->
      <div class="card__accent"></div>
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
    if (amount >= 1_000_000) return (amount / 1_000_000).toFixed(1) + 'M';
    if (amount >= 1_000) return (amount / 1_000).toFixed(0) + 'K';
    return amount.toString();
  }
}
