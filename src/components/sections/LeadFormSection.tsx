'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { createLeadSchema, type CreateLeadInput } from '@/lib/validators';
import { trackLeadGenerated } from '@/lib/analytics';

export default function LeadFormSection() {
  const t = useTranslations('leadForm');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'duplicate' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),
  });

  const onSubmit = async (data: CreateLeadInput) => {
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        trackLeadGenerated(data.serviceInterest);
        setSubmitStatus('success');
        reset();
      } else if (res.status === 409) {
        setSubmitStatus('duplicate');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <section id="lead-form" className="py-16 px-4 bg-gradient-to-br from-[#0D1B2E] via-[#1a1a4e] to-[#2D1B69]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {t('sectionTitle')}
          </h2>
          <p className="text-white/75 text-base sm:text-lg">
            {t('sectionSubtitle')}
          </p>
        </div>

        {/* Success message */}
        {submitStatus === 'success' && (
          <div
            role="alert"
            className="mb-6 rounded-lg bg-green-500/20 border border-green-400/40 px-5 py-4 text-green-300 text-center font-medium"
          >
            {t('successMessage')}
          </div>
        )}

        {/* Error messages */}
        {(submitStatus === 'duplicate' || submitStatus === 'error') && (
          <div
            role="alert"
            className="mb-6 rounded-lg bg-red-500/20 border border-red-400/40 px-5 py-4 text-red-300 text-center font-medium"
          >
            {submitStatus === 'duplicate' ? t('errorDuplicate') : t('errorGeneral')}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5"
        >
          {/* customerName */}
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-white/90 mb-1">
              {t('customerName')} <span className="text-red-400">*</span>
            </label>
            <input
              id="customerName"
              type="text"
              placeholder={t('customerNamePlaceholder')}
              {...register('customerName')}
              className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition"
            />
            {errors.customerName && (
              <p className="mt-1 text-xs text-red-400">{t('validation.nameRequired')}</p>
            )}
          </div>

          {/* email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
              {t('email')} <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder={t('emailPlaceholder')}
              {...register('email')}
              className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{t('validation.emailInvalid')}</p>
            )}
          </div>

          {/* phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-1">
              {t('phone')} <span className="text-red-400">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder={t('phonePlaceholder')}
              {...register('phone')}
              className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-400">{t('validation.phoneInvalid')}</p>
            )}
          </div>

          {/* serviceInterest */}
          <div>
            <label htmlFor="serviceInterest" className="block text-sm font-medium text-white/90 mb-1">
              {t('serviceInterest')} <span className="text-red-400">*</span>
            </label>
            <select
              id="serviceInterest"
              {...register('serviceInterest')}
              defaultValue=""
              className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition appearance-none"
            >
              <option value="" disabled className="bg-[#0A1628] text-white/50">
                {t('serviceInterestPlaceholder')}
              </option>
              <option value="AWS_Migration" className="bg-[#0A1628] text-white">
                {t('serviceOptions.awsMigration')}
              </option>
              <option value="AI_Integration" className="bg-[#0A1628] text-white">
                {t('serviceOptions.aiIntegration')}
              </option>
              <option value="Both" className="bg-[#0A1628] text-white">
                {t('serviceOptions.both')}
              </option>
            </select>
            {errors.serviceInterest && (
              <p className="mt-1 text-xs text-red-400">{t('validation.serviceRequired')}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#4A9EE8] to-[#7B4FD4] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-opacity shadow-lg"
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {isSubmitting ? t('submitting') : t('submitButton')}
          </button>
        </form>
      </div>
    </section>
  );
}
