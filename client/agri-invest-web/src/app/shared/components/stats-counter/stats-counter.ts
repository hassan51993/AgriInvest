import { Component, input, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-counter',
  standalone: true,
  styleUrl: './stats-counter.scss',
  template: `
    <div class="stat">
      <div class="stat__number">{{ displayValue() }}{{ suffix() }}</div>
      <div class="stat__label">{{ label() }}</div>
    </div>
  `
})
export class StatsCounterComponent implements OnInit {
  value = input<number>(0);
  label = input<string>('');
  suffix = input<string>('');

  displayValue = signal(0);

  ngOnInit() {
    this.animateCount();
  }

  private animateCount() {
    const target = this.value();
    const duration = 2200;
    const steps = 70;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out: fast start, slow finish
      const progress = 1 - Math.pow(1 - step / steps, 3);
      const current = Math.round(progress * target);
      this.displayValue.set(current);

      if (step >= steps) {
        this.displayValue.set(target);
        clearInterval(timer);
      }
    }, stepTime);
  }
}
