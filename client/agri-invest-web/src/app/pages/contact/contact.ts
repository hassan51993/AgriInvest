import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { ContactService } from '../../core/services/contact.service';
import { ContactInquiry } from '../../core/models/contact-inquiry.model';
import { HeroSectionComponent } from '../../shared/components/hero-section/hero-section';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, HeroSectionComponent],
  template: `
    <app-hero-section
      [title]="lang.localize('اتصل بنا', 'Contact Us')"
      [subtitle]="lang.localize(
        'نحن هنا لمساعدتك في رحلتك الاستثمارية',
        'We are here to help you on your investment journey'
      )"
      backgroundImage="/assets/images/contact-hero.jpg"
      height="40vh" />

    <section class="py-16 px-4" style="background-color: var(--sand)">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h3 class="text-2xl font-bold mb-6" style="color: var(--primary-green-dark)">
            {{ lang.localize('أرسل لنا رسالة', 'Send Us a Message') }}
          </h3>

          @if (submitted()) {
            <div class="text-center py-8">
              <div class="text-5xl mb-4">✅</div>
              <h4 class="text-xl font-bold mb-2" style="color: var(--primary-green)">
                {{ lang.localize('تم إرسال رسالتك بنجاح!', 'Your message has been sent successfully!') }}
              </h4>
              <p class="text-gray-600">
                {{ lang.localize('سنتواصل معك في أقرب وقت ممكن.', 'We will get back to you as soon as possible.') }}
              </p>
              <button (click)="resetForm()"
                      class="mt-6 px-6 py-2 text-white rounded-full font-semibold transition-all hover:scale-105"
                      style="background-color: var(--primary-green)">
                {{ lang.localize('إرسال رسالة أخرى', 'Send Another Message') }}
              </button>
            </div>
          } @else {
            <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
              <div class="space-y-5">
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700">
                    {{ lang.localize('الاسم الكامل', 'Full Name') }} *
                  </label>
                  <input type="text" [(ngModel)]="form.fullName" name="fullName" required
                         class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                         [placeholder]="lang.localize('أدخل اسمك', 'Enter your name')">
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-1 text-gray-700">
                      {{ lang.localize('البريد الإلكتروني', 'Email') }} *
                    </label>
                    <input type="email" [(ngModel)]="form.email" name="email" required
                           class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                           [placeholder]="lang.localize('أدخل بريدك الإلكتروني', 'Enter your email')">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1 text-gray-700">
                      {{ lang.localize('رقم الهاتف', 'Phone') }}
                    </label>
                    <input type="tel" [(ngModel)]="form.phone" name="phone"
                           class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                           [placeholder]="lang.localize('أدخل رقم هاتفك', 'Enter your phone')">
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700">
                    {{ lang.localize('الموضوع', 'Subject') }} *
                  </label>
                  <input type="text" [(ngModel)]="form.subject" name="subject" required
                         class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                         [placeholder]="lang.localize('موضوع الرسالة', 'Message subject')">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1 text-gray-700">
                    {{ lang.localize('الرسالة', 'Message') }} *
                  </label>
                  <textarea [(ngModel)]="form.message" name="message" required rows="5"
                            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
                            [placeholder]="lang.localize('اكتب رسالتك هنا...', 'Write your message here...')">
                  </textarea>
                </div>
                @if (error()) {
                  <div class="text-red-500 text-sm">{{ error() }}</div>
                }
                <button type="submit" [disabled]="sending() || !contactForm.valid"
                        class="w-full py-3 text-white font-semibold rounded-full transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        style="background: linear-gradient(135deg, var(--primary-green), var(--primary-green-light))">
                  @if (sending()) {
                    {{ lang.localize('جارٍ الإرسال...', 'Sending...') }}
                  } @else {
                    {{ lang.localize('إرسال الرسالة', 'Send Message') }}
                  }
                </button>
              </div>
            </form>
          }
        </div>

        <!-- Contact Info Side -->
        <div class="space-y-8">
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h3 class="text-2xl font-bold mb-6" style="color: var(--primary-green-dark)">
              {{ lang.localize('معلومات الاتصال', 'Contact Information') }}
            </h3>
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                     style="background-color: var(--primary-green)">📍</div>
                <div>
                  <h4 class="font-semibold mb-1" style="color: var(--primary-green-dark)">
                    {{ lang.localize('العنوان', 'Address') }}
                  </h4>
                  <p class="text-gray-600 text-sm">
                    {{ lang.localize(
                      'واحة الفرافرة، الوادي الجديد، مصر',
                      'Farafra Oasis, New Valley, Egypt'
                    ) }}
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                     style="background-color: var(--primary-green)">📞</div>
                <div>
                  <h4 class="font-semibold mb-1" style="color: var(--primary-green-dark)">
                    {{ lang.localize('الهاتف', 'Phone') }}
                  </h4>
                  <p class="text-gray-600 text-sm" dir="ltr">+20 100 000 0000</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                     style="background-color: var(--primary-green)">✉️</div>
                <div>
                  <h4 class="font-semibold mb-1" style="color: var(--primary-green-dark)">
                    {{ lang.localize('البريد الإلكتروني', 'Email') }}
                  </h4>
                  <p class="text-gray-600 text-sm">info&#64;agriinvest.eg</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                     style="background-color: var(--primary-green)">🕐</div>
                <div>
                  <h4 class="font-semibold mb-1" style="color: var(--primary-green-dark)">
                    {{ lang.localize('ساعات العمل', 'Working Hours') }}
                  </h4>
                  <p class="text-gray-600 text-sm">
                    {{ lang.localize('الأحد - الخميس: 9 صباحاً - 5 مساءً', 'Sunday - Thursday: 9 AM - 5 PM') }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Map placeholder -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden h-64 flex items-center justify-center" style="background-color: var(--sand-dark)">
            <div class="text-center text-gray-500">
              <div class="text-4xl mb-2">🗺️</div>
              <p class="text-sm">{{ lang.localize('موقعنا على الخريطة', 'Our Location on Map') }}</p>
              <p class="text-xs text-gray-400 mt-1">Farafra Oasis, 27.0581° N, 27.9695° E</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  lang = inject(LanguageService);
  private contactService = inject(ContactService);

  form: ContactInquiry = {
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  sending = signal(false);
  submitted = signal(false);
  error = signal('');

  onSubmit() {
    this.sending.set(true);
    this.error.set('');
    this.contactService.submit(this.form).subscribe({
      next: () => {
        this.submitted.set(true);
        this.sending.set(false);
      },
      error: (err) => {
        this.error.set(this.lang.localize('حدث خطأ، حاول مرة أخرى', 'An error occurred, please try again'));
        this.sending.set(false);
      }
    });
  }

  resetForm() {
    this.form = { fullName: '', email: '', phone: '', subject: '', message: '' };
    this.submitted.set(false);
  }
}
