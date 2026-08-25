'use client';

import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';

const craftCategories = [
  'Textiles',
  'Jewellery',
  'Handicrafts',
  'Handbags',
  'Shawls',
  'Pottery',
  'Woodwork',
  'Metalwork',
  'Other',
];

const deliveryOptions = [
  'I will ship myself (self-fulfillment)',
  'I need help with shipping',
  'Not sure yet',
];

export default function SellerRegistrationPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    business_name: '',
    craft_category: '',
    craft_story: '',
    city: '',
    state: '',
    pincode: '',
    delivery_preference: '',
    aadhaar_last_four: '',
    verification_consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/seller-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setSubmitStatus('success');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        business_name: '',
        craft_category: '',
        craft_story: '',
        city: '',
        state: '',
        pincode: '',
        delivery_preference: '',
        aadhaar_last_four: '',
        verification_consent: false,
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-sand-50">
      <SiteHeader />
      <section className="border-b border-ink-200/60 bg-sand-100">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-clay-600">Join ShilpKart</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight text-ink-900 md:text-6xl">Sell your craft with us</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-600">Share your story and craft with customers across India. We handle the platform, you focus on creating.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12">
        {submitStatus === 'success' ? (
          <div className="rounded-2xl border border-moss-300 bg-moss-50 p-8 text-center">
            <h2 className="font-display text-2xl text-moss-800">Application submitted!</h2>
            <p className="mt-3 text-ink-600">Thank you for applying. We'll review your application and get back to you within 3-5 business days.</p>
            <button onClick={() => setSubmitStatus('idle')} className="mt-6 font-semibold text-clay-700 hover:text-clay-800">Submit another application</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-ink-200 bg-white p-8 shadow-sm">
            <div>
              <h2 className="font-display text-xl text-ink-900">Personal Information</h2>
              <p className="mt-1 text-sm text-ink-500">Tell us about yourself</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-ink-700">Full Name *</label>
                <input type="text" id="full_name" name="full_name" required value={formData.full_name} onChange={handleChange} className="mt-1 w-full rounded-lg border border-ink-300 px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink-700">Email *</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 w-full rounded-lg border border-ink-300 px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-ink-700">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="mt-1 w-full rounded-lg border border-ink-300 px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500" />
              </div>
            </div>

            <div className="border-t border-ink-200 pt-8">
              <div>
                <h2 className="font-display text-xl text-ink-900">Business Details</h2>
                <p className="mt-1 text-sm text-ink-500">Tell us about your craft business</p>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="business_name" className="block text-sm font-medium text-ink-700">Business/Brand Name *</label>
                  <input type="text" id="business_name" name="business_name" required value={formData.business_name} onChange={handleChange} className="mt-1 w-full rounded-lg border border-ink-300 px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500" />
                </div>
                <div>
                  <label htmlFor="craft_category" className="block text-sm font-medium text-ink-700">Craft Category *</label>
                  <select id="craft_category" name="craft_category" required value={formData.craft_category} onChange={handleChange} className="mt-1 w-full rounded-lg border border-ink-300 px-4 py-2.5 text-ink-900 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500">
                    <option value="">Select a category</option>
                    {craftCategories.map((cat) => <option key={cat} value={cat.toLowerCase()}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="craft_story" className="block text-sm font-medium text-ink-700">Your Craft Story *</label>
                <textarea id="craft_story" name="craft_story" required rows={4} value={formData.craft_story} onChange={handleChange} className="mt-1 w-full rounded-lg border border-ink-300 px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500" placeholder="Share your journey, techniques, and what makes your craft special..." />
              </div>
            </div>

            <div className="border-t border-ink-200 pt-8">
              <div>
                <h2 className="font-display text-xl text-ink-900">Location & Shipping</h2>
                <p className="mt-1 text-sm text-ink-500">Where are you based and how will you ship?</p>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-ink-700">City *</label>
                  <input type="text" id="city" name="city" required value={formData.city} onChange={handleChange} className="mt-1 w-full rounded-lg border border-ink-300 px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500" />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-ink-700">State *</label>
                  <input type="text" id="state" name="state" required value={formData.state} onChange={handleChange} className="mt-1 w-full rounded-lg border border-ink-300 px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500" />
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-ink-700">Pincode *</label>
                  <input type="text" id="pincode" name="pincode" required value={formData.pincode} onChange={handleChange} className="mt-1 w-full rounded-lg border border-ink-300 px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500" />
                </div>
                <div>
                  <label htmlFor="delivery_preference" className="block text-sm font-medium text-ink-700">Delivery Preference *</label>
                  <select id="delivery_preference" name="delivery_preference" required value={formData.delivery_preference} onChange={handleChange} className="mt-1 w-full rounded-lg border border-ink-300 px-4 py-2.5 text-ink-900 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500">
                    <option value="">Select an option</option>
                    {deliveryOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-ink-200 pt-8">
              <div>
                <h2 className="font-display text-xl text-ink-900">Verification</h2>
                <p className="mt-1 text-sm text-ink-500">Help us verify your identity</p>
              </div>

              <div className="mt-6">
                <label htmlFor="aadhaar_last_four" className="block text-sm font-medium text-ink-700">Aadhaar Last 4 Digits (Optional)</label>
                <input type="text" id="aadhaar_last_four" name="aadhaar_last_four" maxLength={4} value={formData.aadhaar_last_four} onChange={handleChange} className="mt-1 w-full max-w-xs rounded-lg border border-ink-300 px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:border-clay-500 focus:outline-none focus:ring-1 focus:ring-clay-500" placeholder="e.g., 1234" />
              </div>

              <div className="mt-6 flex items-start gap-3">
                <input type="checkbox" id="verification_consent" name="verification_consent" checked={formData.verification_consent} onChange={handleCheckboxChange} className="mt-1 h-4 w-4 rounded border-ink-300 text-clay-600 focus:ring-clay-500" />
                <label htmlFor="verification_consent" className="text-sm text-ink-600">I consent to identity verification and understand that my information will be used for seller onboarding purposes only. *</label>
              </div>
            </div>

            {submitStatus === 'error' && (
              <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                <p className="font-medium">Submission failed</p>
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="border-t border-ink-200 pt-6">
              <button type="submit" disabled={isSubmitting || !formData.verification_consent} className="w-full rounded-lg bg-ink-900 px-6 py-3 font-semibold text-sand-50 transition hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <p className="mt-3 text-center text-sm text-ink-500">All fields marked with * are required</p>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
