import { Component, input, signal, effect, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-counter',
  standalone: true,
  styleUrl: './stats-counter.scss',
  template: `
    <div class="text-center p-4">
      <div class="text-3xl sm:text-4xl font-bold text-white mb-2">
        {{ displayValue() }}{{ suffix() }}
      </div>
      <div class="text-sm text-gray-200 font-medium">
        {{ label() }}
      </div>
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
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        this.displayValue.set(target);
        clearInterval(timer);
      } else {
        this.displayValue.set(Math.round(current));
      }
    }, stepTime);
  }
}
