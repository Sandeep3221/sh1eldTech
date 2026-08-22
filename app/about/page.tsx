import type { Metadata } from 'next';
import { Container, SectionHeading, Action, RevealGroup } from '@/components/ui';
import { FooterSection } from '@/components/layout/FooterSection';
import { company, locations, stats } from '@/data/company';
import { services } from '@/data/services';
import { padIndex } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About',
  description:
    'SH1ELD Tech — a security-first digital engineering team from Gangtok, Sikkim. Seven disciplines, two locations, one standard.',
};

export default function AboutPage() {
  return (
    <main id="main" className="relative w-full bg-ink-900 text-white pt-[var(--header-h)]">
      {/* ── Hero ── */}
      <section className="u-section">
        <Container>
          <RevealGroup>
            <SectionHeading
              as="h1"
              scale="xl"
              index="03"
              label="ABOUT"
              title={
                <>
                  Built in Sikkim.
                  <br />
                  Shipped everywhere.
                </>
              }
              lede={`${company.name} is a security-first digital engineering team. We build, test and launch products — from Gangtok, for anywhere.`}
            />
          </RevealGroup>
        </Container>
      </section>

      {/* ── Story ── */}
      <section className="pb-section">
        <Container width="narrow">
          <RevealGroup>
            <div className="flex flex-col gap-6">
              <p
                data-reveal="up"
                className="t-body-lg t-pretty leading-relaxed text-fg-secondary"
              >
                Founded in {company.founded}, {company.name} started with one conviction:
                security should not be an afterthought bolted on at the end. We build
                products and then test them the way an attacker would — same team, same
                standard.
              </p>
              <p
                data-reveal="up"
                className="t-body-lg t-pretty leading-relaxed text-fg-secondary"
              >
                From two locations in Sikkim, we cover seven disciplines end to end. No
                handoffs between agencies, no broken telephone. One team that designs,
                engineers, secures and grows.
              </p>
            </div>
          </RevealGroup>
        </Container>
      </section>

      {/* ── Stats bar (light) ── */}
      <section className="bg-paper-100 py-16 sm:py-20">
        <Container>
          <RevealGroup>
            <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={stat.id}
                  data-reveal="up"
                  style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
                  className="flex flex-col gap-1.5"
                >
                  <span className="font-heading text-3xl font-bold tracking-tight text-fg-on-paper sm:text-4xl lg:text-5xl">
                    {'display' in stat
                      ? stat.display
                      : <>
                          {'value' in stat && stat.value.toLocaleString('en-IN')}
                          {'suffix' in stat && stat.suffix}
                        </>
                    }
                  </span>
                  <span className="t-meta font-mono text-fg-on-paper-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </RevealGroup>
        </Container>
      </section>

      {/* ── Disciplines grid ── */}
      <section className="u-section">
        <Container>
          <RevealGroup>
            <SectionHeading
              index="03.1"
              label="DISCIPLINES"
              title="What we bring to the table."
              className="mb-12 sm:mb-16"
            />
          </RevealGroup>

          <RevealGroup>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {services.map((service, i) => (
                <div
                  key={service.slug}
                  data-reveal="up"
                  style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}
                  className="flex flex-col gap-4 rounded-panel border border-hairline bg-ink-700 p-6 sm:p-8"
                >
                  {/* Index + discipline */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.6875rem] font-medium tracking-[0.18em] text-signal">
                      {padIndex(i + 1)}
                    </span>
                    <span className="t-meta font-mono text-fg-tertiary">
                      {service.discipline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-semibold text-fg-primary">
                    {service.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm leading-relaxed text-fg-secondary">
                    {service.summary}
                  </p>

                  {/* Capabilities */}
                  <ul className="mt-auto flex flex-col gap-2 pt-2">
                    {service.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-center gap-2.5 text-[0.8125rem] text-fg-secondary"
                      >
                        <span
                          aria-hidden
                          className="h-1 w-1 shrink-0 rounded-full bg-mint"
                        />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </RevealGroup>
        </Container>
      </section>

      {/* ── Locations ── */}
      <section className="u-section border-t border-hairline">
        <Container>
          <RevealGroup>
            <SectionHeading
              index="03.2"
              label="LOCATIONS"
              title="Where we work."
              className="mb-12 sm:mb-16"
            />
          </RevealGroup>

          <RevealGroup>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
              {locations.map((loc, i) => (
                <div
                  key={loc.label}
                  data-reveal="up"
                  style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
                  className="flex flex-col gap-4 rounded-panel border border-hairline bg-ink-700 p-6 sm:p-8"
                >
                  <h3 className="font-heading text-lg font-semibold text-fg-primary">
                    {loc.label}
                  </h3>
                  <span className="t-meta font-mono text-mint">
                    {loc.role}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    {loc.lines.map((line) => (
                      <p key={line} className="text-sm leading-relaxed text-fg-secondary">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </RevealGroup>
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
                Want to work with us?
              </h2>
              <p
                data-reveal="up"
                className="t-body-lg text-fg-secondary"
              >
                We&apos;re always open to the right project.
              </p>
              <div data-reveal="fade">
                <Action href="/contact" size="lg">
                  Start a conversation
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
