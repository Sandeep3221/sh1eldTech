'use client';

import React, { useState } from 'react';
import { Container, RevealGroup } from '@/components/ui';
import { FooterSection } from '@/components/layout/FooterSection';
import { company, locations } from '@/data/company';
import { services } from '@/data/services';
import { Mail, Phone, MapPin, ArrowUpRight, ChevronDown } from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputBase =
    'w-full bg-paper-200 border border-black/10 rounded-[16px] px-5 py-3.5 text-fg-on-paper placeholder:text-fg-on-paper-muted/50 focus:outline-none focus:border-ink-900 focus:ring-1 focus:ring-ink-900 transition-all duration-200 min-h-[48px] text-[15px]';

  return (
    <main id="main" className="relative w-full bg-ink-900 text-white pt-[var(--header-h)]">
      {/* ── Hero ── */}
      <section className="u-section">
        <Container>
          <RevealGroup>
            {/* Manual SectionHeading pattern for client component */}
            <div className="w-full">
              <div
                data-reveal="fade"
                className="mb-8 flex items-center gap-4 sm:mb-10 sm:gap-5"
              >
                <span className="t-meta font-mono text-fg-tertiary">
                  CONTACT
                </span>
                <span
                  aria-hidden
                  className="h-px flex-1 origin-left bg-white/10"
                />
              </div>

              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                <h1
                  data-reveal="up"
                  className="t-display-xl font-heading font-semibold t-balance text-fg-primary max-w-[18ch] lg:max-w-[22ch]"
                >
                  Let&apos;s build
                  <br />
                  something.
                </h1>
                <p
                  data-reveal="up"
                  className="t-body-lg t-pretty max-w-[52ch] text-fg-secondary lg:max-w-[38ch] lg:pb-2"
                >
                  Tell us what you&apos;re working on. We&apos;ll figure out the right
                  way to help.
                </p>
              </div>
            </div>
          </RevealGroup>
        </Container>
      </section>

      {/* ── Main content ── */}
      <section className="pb-section">
        <Container>
          <RevealGroup>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
              {/* ── Form (3 cols) ── */}
              <div data-reveal="up" className="lg:col-span-3">
                {submitted ? (
                  <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-[32px] bg-white p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#a2ff4d]/20">
                      <ArrowUpRight className="h-7 w-7 text-[#08090C]" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-black">
                      Request Sent
                    </h3>
                    <p className="max-w-sm text-sm text-slate-500">
                      We&apos;ll get back to you within 24 hours. In the meantime,
                      feel free to explore our{' '}
                      <a href="/work" className="underline hover:text-[#08090C] font-semibold">
                        work
                      </a>
                      .
                    </p>
                  </div>
                ) : (
                  <div className="w-full bg-white rounded-[32px] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    <form
                      onSubmit={handleSubmit}
                      className="relative z-10 flex flex-col gap-5 sm:gap-6"
                    >
                      {/* Top Row: Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-black font-bold ml-2">Name</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formState.name}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-[20px] px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#08090C] focus:ring-1 focus:ring-[#08090C] focus:bg-white transition-all duration-300"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-black font-bold ml-2">Email</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="hello@example.com"
                            value={formState.email}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-[20px] px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#08090C] focus:ring-1 focus:ring-[#08090C] focus:bg-white transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Bottom Row: Description */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-black font-bold ml-2">Description</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          required
                          placeholder="Tell us about your project or idea..."
                          value={formState.message}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-[20px] px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#08090C] focus:ring-1 focus:ring-[#08090C] focus:bg-white transition-all duration-300 resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="mt-4 w-full">
                        <button type="submit" className="group w-full flex items-center justify-center gap-3 bg-[#08090C] hover:bg-slate-800 text-white font-heading font-bold text-sm sm:text-base tracking-widest uppercase py-4 sm:py-5 rounded-[20px] transition-all duration-300 shadow-xl hover:shadow-2xl">
                          <span>Submit Request</span>
                          <ArrowUpRight className="w-5 h-5 text-[#a2ff4d] group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* ── Info sidebar (2 cols) ── */}
              <div
                data-reveal="up"
                style={{ ['--reveal-delay' as string]: '120ms' }}
                className="flex flex-col gap-4 lg:col-span-2"
              >
                {/* Direct contact */}
                <div className="flex flex-col gap-5 rounded-panel border border-hairline bg-ink-700 p-6 sm:p-8">
                  <h3 className="font-heading text-base font-semibold text-fg-primary">
                    Direct contact
                  </h3>
                  <a
                    href={`mailto:${company.email}`}
                    className="group flex items-center gap-3 font-mono text-sm text-fg-secondary transition-colors hover:text-mint"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-ink-600 transition-colors group-hover:border-mint/30 group-hover:bg-mint/10">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="break-all">{company.email}</span>
                  </a>
                  <a
                    href={`tel:${company.phoneHref}`}
                    className="group flex items-center gap-3 font-mono text-sm text-fg-secondary transition-colors hover:text-mint"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-ink-600 transition-colors group-hover:border-mint/30 group-hover:bg-mint/10">
                      <Phone className="h-4 w-4" />
                    </span>
                    {company.phone}
                  </a>
                </div>

                {/* Locations */}
                {locations.map((loc) => (
                  <div
                    key={loc.label}
                    className="flex flex-col gap-3 rounded-panel border border-hairline bg-ink-700 p-6 sm:p-8"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-ink-600">
                        <MapPin className="h-4 w-4 text-fg-tertiary" />
                      </span>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-heading text-base font-semibold text-fg-primary">
                          {loc.label}
                        </h3>
                        <span className="t-meta font-mono text-mint">
                          {loc.role}
                        </span>
                      </div>
                    </div>
                    <div className="ml-12 flex flex-col gap-0.5">
                      {loc.lines.map((line) => (
                        <p
                          key={line}
                          className="text-sm leading-relaxed text-fg-secondary"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Response time */}
                <div className="rounded-panel border border-hairline bg-ink-700/50 px-6 py-5">
                  <p className="text-sm text-fg-tertiary">
                    We typically respond within <strong className="text-fg-secondary">24 hours</strong>. 
                    For urgent enquiries, call us directly.
                  </p>
                </div>
              </div>
            </div>
          </RevealGroup>
        </Container>
      </section>

      <FooterSection />
    </main>
  );
}
