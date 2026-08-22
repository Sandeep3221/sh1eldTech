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
                  <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-panel-lg bg-paper-100 p-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mint/20">
                      <ArrowUpRight className="h-7 w-7 text-ink-900" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-fg-on-paper">
                      Message sent!
                    </h3>
                    <p className="max-w-sm text-sm text-fg-on-paper-muted">
                      We&apos;ll get back to you within 24 hours. In the meantime,
                      feel free to explore our{' '}
                      <a href="/work" className="underline hover:text-ink-900">
                        work
                      </a>
                      .
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 rounded-panel-lg bg-paper-100 p-6 sm:p-8 lg:p-10"
                  >
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="name"
                          className="t-meta ml-1 font-mono text-fg-on-paper"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          value={formState.name}
                          onChange={handleChange}
                          className={inputBase}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="email"
                          className="t-meta ml-1 font-mono text-fg-on-paper"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="hello@example.com"
                          value={formState.email}
                          onChange={handleChange}
                          className={inputBase}
                        />
                      </div>
                    </div>

                    {/* Phone + Service */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="phone"
                          className="t-meta ml-1 font-mono text-fg-on-paper"
                        >
                          Phone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formState.phone}
                          onChange={handleChange}
                          className={inputBase}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="service"
                          className="t-meta ml-1 font-mono text-fg-on-paper"
                        >
                          Service
                        </label>
                        <div className="relative">
                          <select
                            id="service"
                            name="service"
                            value={formState.service}
                            onChange={handleChange}
                            className={`${inputBase} appearance-none pr-10`}
                          >
                            <option value="">Select a service</option>
                            {services.map((s) => (
                              <option key={s.slug} value={s.slug}>
                                {s.title}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            aria-hidden
                            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-on-paper-muted"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="budget"
                        className="t-meta ml-1 font-mono text-fg-on-paper"
                      >
                        Budget range
                      </label>
                      <div className="relative">
                        <select
                          id="budget"
                          name="budget"
                          value={formState.budget}
                          onChange={handleChange}
                          className={`${inputBase} appearance-none pr-10`}
                        >
                          <option value="">Select a range</option>
                          <option value="under-50k">Under ₹50K</option>
                          <option value="50k-2l">₹50K – ₹2L</option>
                          <option value="2l-5l">₹2L – ₹5L</option>
                          <option value="5l-plus">₹5L+</option>
                          <option value="not-sure">Not sure yet</option>
                        </select>
                        <ChevronDown
                          aria-hidden
                          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-on-paper-muted"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="message"
                        className="t-meta ml-1 font-mono text-fg-on-paper"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Tell us about your project or idea..."
                        value={formState.message}
                        onChange={handleChange}
                        className={`${inputBase} resize-none`}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="group mt-2 flex w-full items-center justify-center gap-3 rounded-[16px] bg-ink-900 px-8 py-4 font-heading text-sm font-semibold uppercase tracking-wider text-white shadow-xl transition-all duration-200 hover:bg-ink-800 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-mint sm:min-h-[52px]"
                    >
                      <span>Send message</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                  </form>
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
