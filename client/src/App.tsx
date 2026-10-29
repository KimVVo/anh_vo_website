import { useEffect, useState, type CSSProperties } from "react";

type Role = { title: string; place: string; dates: string; points: string[] };
type Profile = {
  name: string;
  tagline: string;
  about: string;
  gpa: number;
  sat: number;
  gpaByYear: { grade: string; gpa: number; note?: string }[];
  schools: { name: string; where: string; dates: string }[];
  honors: string[];
  competitions: string[];
  scholarships: string[];
  roles: Role[];
  service: string[];
};

const trail = [
  [6, 66, 70], [15, 56, 55], [24, 65, 70], [33, 55, 55], [42, 64, 70],
  [51, 54, 55], [60, 63, 70], [69, 53, 55], [78, 62, 70], [87, 52, 55],
];

function Paw({ x, y, r, i }: { x: number; y: number; r: number; i: number }) {
  const style = { left: `${x}%`, top: `${y}%`, animationDelay: `${0.4 + i * 0.25}s`, "--r": `${r}deg` } as CSSProperties;
  return (
    <svg className="paw absolute w-8 text-marigold" style={style} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <ellipse cx="16" cy="21" rx="8" ry="6.5" />
      <ellipse cx="6" cy="13" rx="3" ry="4" />
      <ellipse cx="12" cy="7.5" rx="3" ry="4.2" />
      <ellipse cx="20" cy="7.5" rx="3" ry="4.2" />
      <ellipse cx="26" cy="13" rx="3" ry="4" />
    </svg>
  );
}

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((t) => (
      <li key={t} className="border-l-4 border-fern pl-3 leading-snug">{t}</li>
    ))}
  </ul>
);

const H2 = ({ children }: { children: string }) => (
  <h2 className="mb-5 font-display text-3xl">{children}</h2>
);

export default function App() {
  const [p, setP] = useState<Profile | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => (r.ok ? (r.json() as Promise<Profile>) : Promise.reject()))
      .then(setP)
      .catch(() => setFailed(true));
  }, []);

  if (failed) return <p className="p-8">Could not load the portfolio. Start the API with <code>npm run dev</code>.</p>;
  if (!p) return <p className="p-8">Loading…</p>;

  return (
    <>
      <header className="relative min-h-[34rem] overflow-hidden bg-forest text-mist">
        <div className="mx-auto max-w-4xl px-6 pt-20">
          <h1 className="font-display text-6xl sm:text-8xl">{p.name}</h1>
          <p className="mt-4 max-w-md text-xl">{p.tagline}</p>
        </div>
        {trail.map(([x, y, r], i) => <Paw key={i} x={x} y={y} r={r} i={i} />)}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 90 C200 20 380 40 560 80 S980 130 1180 60 1360 40 1440 70 V160 H0Z" fill="#2f5a36" />
          <path d="M0 130 C240 80 420 110 700 120 S1180 90 1440 120 V160 H0Z" fill="#4f8a4b" />
          <path d="M0 150 C300 125 700 150 1000 140 S1340 135 1440 148 V160 H0Z" fill="#edf2ea" />
        </svg>
      </header>

      <main className="mx-auto max-w-4xl space-y-16 px-6 py-14">
        <section>
          <p className="max-w-prose text-lg leading-relaxed">{p.about}</p>
        </section>

        <section aria-labelledby="growth">
          <h2 id="growth" className="mb-1 font-display text-3xl">Growth by year</h2>
          <p className="mb-5 text-sm">GPA {p.gpa.toFixed(2)}, SAT {p.sat}. The bars show each school year and start at 3.0.</p>
          <ul className="space-y-3">
            {p.gpaByYear.map((y) => (
              <li key={y.grade} className="grid grid-cols-[6rem_1fr_6rem] items-center gap-3">
                <span>{y.grade}</span>
                <span className="h-5 rounded-full bg-forest/10">
                  <span
                    className={`bar block h-5 rounded-full ${y.note ? "bg-lake" : "bg-fern"}`}
                    style={{ width: `${(y.gpa - 3) * 100}%` }}
                  />
                </span>
                <span className="font-semibold">{y.gpa.toFixed(2)}{y.note && <small className="block font-normal">{y.note}</small>}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {p.schools.map((s) => (
              <li key={s.name} className="rounded-2xl bg-white p-4">
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm">{s.where}</p>
                <p className="text-sm text-lake">{s.dates}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-10 sm:grid-cols-2">
          <div><H2>Honors</H2><List items={p.honors} /></div>
          <div><H2>Competitions</H2><List items={p.competitions} /></div>
        </section>

        <section className="grid gap-10 sm:grid-cols-2">
          <div><H2>Scholarships</H2><List items={p.scholarships} /></div>
          <div><H2>Service</H2><List items={p.service} /></div>
        </section>

        <section>
          <H2>Experience</H2>
          <div className="space-y-8">
            {p.roles.map((r) => (
              <article key={r.title} className="border-l-4 border-lake pl-5">
                <h3 className="text-xl font-semibold">{r.title}</h3>
                <p className="text-sm">{[r.place, r.dates].filter(Boolean).join(", ")}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {r.points.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-forest py-6 text-center text-sm text-mist">{p.name}</footer>
    </>
  );
}
