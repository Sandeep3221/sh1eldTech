import type { Metadata } from 'next';
import { Container, SectionHeading, Action, RevealGroup } from '@/components/ui';
import { FooterSection } from '@/components/layout/FooterSection';
import { services } from '@/data/services';
import { padIndex } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Seven disciplines, one team — cybersecurity, web and app engineering, UI/UX design, branding, SEO and digital marketing from SH1ELD Tech.',
};

export default function ServicesPage() {
  return (
    <main id="main" className="relative w-full bg-ink-900 text-white pt-[var(--header-h)]">
      {/* ── Hero ── */}
      <section className="u-section">
        <Container>
          <RevealGroup>
            <SectionHeading
              as="h1"
              scale="xl"
              label="SERVICES"
              title={
                <>
                  Six disciplines.
                  <br />
                  One team.
                </>
              }
              lede="We build, design, secure and grow digital products — end to end, from Gangtok, Sikkim."
            />
          </RevealGroup>
        </Container>
      </section>

      {/* ── Service entries ── */}
      <section className="pb-section">
        <Container>
          <div className="flex flex-col gap-0">
            {services.map((service, i) => {
              const even = i % 2 === 0;

              return (
                <RevealGroup key={service.slug}>
                  {/* Hairline separator */}
                  <hr className="u-rule mb-10 sm:mb-16" />

                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 pb-10 sm:pb-16">
                    {/* ── Image / Visual ── */}
                    <div
                      className={
                        even
                          ? 'order-1 lg:order-1'
                          : 'order-1 lg:order-2'
                      }
                    >
                      {/* Standard image */}
                      <div
                        data-reveal="scale"
                        className="relative aspect-[4/3] w-full overflow-hidden rounded-panel-lg border border-hairline"
                      >
                        <img
                          src={service.image!}
                          alt={service.imageAlt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo hover:scale-[1.03]"
                        />
                      </div>
                    </div>

                    {/* ── Text content ── */}
                    <div
                      className={`flex flex-col justify-center gap-5 sm:gap-6 ${
                        even ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
                      }`}
                    >
                      {/* Discipline */}
                      <div data-reveal="fade" className="flex items-center gap-4">
                        <span className="t-meta font-mono text-fg-tertiary">
                          {service.discipline}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        data-reveal="up"
                        className="t-display-md font-heading font-semibold text-fg-primary"
                      >
                        {service.title}
                      </h2>

                      {/* Summary */}
                      <p
                        data-reveal="up"
                        className="text-lg font-medium text-mint sm:text-xl"
                      >
                        {service.summary}
                      </p>

                      {/* Description */}
                      <p
                        data-reveal="up"
                        className="t-body-lg t-pretty text-fg-secondary"
                      >
                        {service.description}
                      </p>

                      {/* Capabilities */}
                      <ul
                        data-reveal="up"
                        className="grid grid-cols-2 gap-x-6 gap-y-2.5"
                      >
                        {service.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-center gap-2.5 text-sm text-fg-secondary"
                          >
                            <span
                              aria-hidden
                              className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint"
                            />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </RevealGroup>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="u-section border-t border-hairline">
        <Container>
          <RevealGroup>
            <div className="flex flex-col items-center gap-6 text-center">
              <h2
                data-reveal="up"
                className="t-display-md font-heading font-semibold text-fg-primary"
              >
                Ready to start?
              </h2>
              <p
                data-reveal="up"
                className="t-body-lg text-fg-secondary"
              >
                Tell us what you need. We&apos;ll figure out the right
                way to help.
              </p>
              <div data-reveal="fade">
                <Action href="/contact" size="lg">
                  Let&apos;s talk
                </Action>
              </div>
            </div>
          </RevealGroup>
        </Container>
      </section>

      <FooterSection />
    </main>
  );
}
