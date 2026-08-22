import type { Metadata } from 'next';
import { Container, SectionHeading, Action, RevealGroup } from '@/components/ui';
import { FooterSection } from '@/components/layout/FooterSection';
import { projects } from '@/data/projects';
import { padIndex } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected work from SH1ELD Tech — security dashboards, logistics platforms, commerce rebuilds, identity systems and field apps.',
};

export default function WorkPage() {
  /* Split projects into groups for the editorial rhythm:
     feature → standards (paired) → feature → remaining standards */
  const features = projects.filter((p) => p.weight === 'feature');
  const standards = projects.filter((p) => p.weight === 'standard');

  return (
    <main id="main" className="relative w-full bg-ink-900 text-white pt-[var(--header-h)]">
      {/* ── Hero ── */}
      <section className="u-section">
        <Container>
          <RevealGroup>
            <SectionHeading
              as="h1"
              scale="xl"
              label="SELECTED WORK"
              title={
                <>
                  Proof over
                  <br />
                  promise.
                </>
              }
              lede="Projects shipped, problems solved. Each one started with a conversation and ended with something people use."
            />
          </RevealGroup>
        </Container>
      </section>

      {/* ── Projects ── */}
      <section className="pb-section">
        <Container>
          <div className="flex flex-col gap-16 sm:gap-24">
            {/* ── Feature 1 ── */}
            {features[0] && (
              <FeatureProject project={features[0]} index={1} />
            )}

            {/* ── Standard pair ── */}
            {standards.length > 0 && (
              <RevealGroup>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                  {standards.slice(0, 2).map((project, i) => (
                    <StandardProject
                      key={project.slug}
                      project={project}
                      index={features.length > 0 ? 2 + i : 1 + i}
                    />
                  ))}
                </div>
              </RevealGroup>
            )}

            {/* ── Feature 2 ── */}
            {features[1] && (
              <FeatureProject
                project={features[1]}
                index={features.length > 0 ? 2 + Math.min(standards.length, 2) : 3}
              />
            )}

            {/* ── Remaining standards ── */}
            {standards.length > 2 && (
              <RevealGroup>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                  {standards.slice(2).map((project, i) => (
                    <StandardProject
                      key={project.slug}
                      project={project}
                      index={
                        (features.length > 1 ? features.length : 1) +
                        2 +
                        i +
                        1
                      }
                    />
                  ))}
                </div>
              </RevealGroup>
            )}
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
                Have a project in mind?
              </h2>
              <p
                data-reveal="up"
                className="t-body-lg text-fg-secondary"
              >
                We&apos;d love to hear about it. Let&apos;s start a conversation.
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

/* ──────────────────────────────────────────────────────────
   Feature Project — full-width hero image + metadata below
   ────────────────────────────────────────────────────────── */
function FeatureProject({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const idx = padIndex(index);
  return (
    <RevealGroup>
      <article className="flex flex-col gap-6 sm:gap-8">
        {/* Image */}
        <div
          data-reveal="scale"
          className="group relative aspect-[4/3] w-full overflow-hidden rounded-panel-lg border border-hairline sm:aspect-[16/9]"
        >
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
        </div>

        {/* Metadata */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div className="flex flex-col gap-2">
            {/* Year */}
            <div data-reveal="fade" className="flex items-center gap-4">
              <span className="font-mono text-xs tracking-wider text-fg-tertiary">
                {project.year}
              </span>
            </div>

            {/* Title */}
            <h3
              data-reveal="up"
              className="t-display-md font-heading font-semibold text-fg-primary"
            >
              {project.title}
            </h3>

            {/* Category */}
            <p
              data-reveal="up"
              className="t-meta font-mono text-fg-tertiary"
            >
              {project.category}
            </p>
          </div>

          <div className="flex max-w-md flex-col gap-4 sm:text-right">
            <p
              data-reveal="up"
              className="t-body text-fg-secondary"
            >
              {project.summary}
            </p>

            {/* Scope pills */}
            <div data-reveal="fade" className="flex flex-wrap gap-2 sm:justify-end">
              {project.scope.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-hairline-strong px-3 py-1 font-mono text-[0.6875rem] tracking-wider text-fg-tertiary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </RevealGroup>
  );
}

/* ──────────────────────────────────────────────────────────
   Standard Project — compact card for 2-column grid
   ────────────────────────────────────────────────────────── */
function StandardProject({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const idx = padIndex(index);
  return (
    <article className="flex flex-col gap-5">
      {/* Image */}
      <div
        data-reveal="scale"
        className="group relative aspect-[3/2] w-full overflow-hidden rounded-panel-lg border border-hairline"
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
        />
      </div>

      {/* Metadata */}
      <div className="flex flex-col gap-2">
        <div data-reveal="fade" className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-wider text-fg-tertiary">
            {project.year}
          </span>
        </div>

        <h3
          data-reveal="up"
          className="text-xl font-heading font-semibold text-fg-primary sm:text-2xl"
        >
          {project.title}
        </h3>

        <p
          data-reveal="up"
          className="t-meta font-mono text-fg-tertiary"
        >
          {project.category}
        </p>

        <p
          data-reveal="up"
          className="mt-1 text-sm leading-relaxed text-fg-secondary"
        >
          {project.summary}
        </p>

        {/* Scope pills */}
        <div data-reveal="fade" className="mt-2 flex flex-wrap gap-2">
          {project.scope.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-hairline-strong px-3 py-1 font-mono text-[0.6875rem] tracking-wider text-fg-tertiary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
