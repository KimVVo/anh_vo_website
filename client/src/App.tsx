import { useEffect, useState } from "react";

type School = { name: string; where: string; dates: string };
type Role = { title: string; place: string; dates: string; points: string[] };
type ServiceRole = { title: string; place: string; dates: string; points: string[] };
type BlogPost = { title: string; date: string; caption: string; image: string; category?: string };
type Profile = {
  name: string;
  tagline: string;
  about: string;
  profilePhoto: string;
  sat: { math: number; english: number; total: number; percentile: string; date: string };
  gpa: string;
  schools: School[];
  honors: string[];
  competitions: string[];
  leadership: Role[];
  service: ServiceRole[];
  experience: Role[];
  blogPosts: BlogPost[];
};

const navigation = [
  ["about", "About"],
  ["education", "Education"],
  ["honors", "Awards"],
  ["leadership", "Leadership"],
  ["service", "Volunteer"],
  ["experience", "Experience"],
  ["blog", "Blog"],
];

function PawPrint({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <ellipse cx="16" cy="21" rx="8" ry="6.5" />
      <ellipse cx="6" cy="13" rx="3" ry="4" />
      <ellipse cx="12" cy="7.5" rx="3" ry="4.2" />
      <ellipse cx="20" cy="7.5" rx="3" ry="4.2" />
      <ellipse cx="26" cy="13" rx="3" ry="4" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m3.5 10 8.5-7 8.5 7v10a1 1 0 0 1-1 1h-5.3v-6.5H9.8V21H4.5a1 1 0 0 1-1-1z" strokeLinejoin="round" />
    </svg>
  );
}

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: string }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{children}</h2>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="bullet-list">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function RoleCard({ role }: { role: Role | ServiceRole }) {
  return (
    <article className="role-card">
      <div className="role-heading">
        <div>
          <h3>{role.title}</h3>
          <p className="role-place">{role.place}</p>
        </div>
        <p className="role-dates">{role.dates}</p>
      </div>
      <BulletList items={role.points} />
    </article>
  );
}

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [failed, setFailed] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => {
        if (!response.ok) throw new Error(`Portfolio request failed: ${response.status}`);
        return response.json() as Promise<Profile>;
      })
      .then(setProfile)
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return <p className="loading-message">Could not load the portfolio. Start the API with <code>npm run dev</code>.</p>;
  }
  if (!profile) return <p className="loading-message">Loading portfolio…</p>;

  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <a className="home-link" href="#about" aria-label="Return to the About section" title="Back to About">
            <HomeIcon />
          </a>
          <nav className="site-nav" aria-label="Portfolio sections">
            {navigation.map(([id, label]) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="about-section" id="about">
          <div className="paw-trail" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((step) => <PawPrint key={step} className={`trail-paw trail-paw-${step + 1}`} />)}
          </div>
          <div className="about-inner">
            <div className="about-copy">
              <p className="eyebrow light-eyebrow">A little about me</p>
              <h1>Hi, I’m <span>{profile.name}.</span></h1>
              <p className="tagline">{profile.tagline}</p>
              <p className="about-text">{profile.about}</p>
              <a className="primary-link" href="#education">Get to know me <span aria-hidden="true">↓</span></a>
            </div>
            <div className="portrait-wrap">
              <div className="portrait-frame">
                {!photoFailed ? (
                  <img
                    className="portrait"
                    src={profile.profilePhoto}
                    alt={`${profile.name} portrait`}
                    onError={() => setPhotoFailed(true)}
                  />
                ) : (
                  <div className="portrait-placeholder">
                    <PawPrint />
                    <span>Add a profile photo</span>
                  </div>
                )}
              </div>
              <span className="portrait-note">Plano, Texas · Ho Chi Minh City, Vietnam</span>
            </div>
          </div>
          <div className="about-bottom">
            <div><strong>{profile.sat.total}</strong><span>SAT score</span></div>
            <div><strong>{profile.gpa}</strong><span>GPA range · grades 10–12</span></div>
            <div><strong>100+</strong><span>Volunteer hours</span></div>
          </div>
        </section>

        <div className="content">
          <section className="content-section education-section" id="education">
            <SectionTitle eyebrow="The journey so far">Education</SectionTitle>
            <div className="education-layout">
              <div className="school-list">
                {profile.schools.map((school, index) => (
                  <article className="school-card" key={school.name}>
                    <span className="school-number">0{index + 1}</span>
                    <div>
                      <h3>{school.name}</h3>
                      <p>{school.where}</p>
                      <span className="school-dates">{school.dates}</span>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="sat-card">
                <p className="eyebrow">A recent milestone</p>
                <h3>SAT</h3>
                <p className="sat-total">{profile.sat.total}<span> / 1600</span></p>
                <div className="sat-split">
                  <span><strong>{profile.sat.math}</strong> Math</span>
                  <span><strong>{profile.sat.english}</strong> English</span>
                </div>
                <p className="sat-note">{profile.sat.percentile} nationally · {profile.sat.date}</p>
              </aside>
            </div>
          </section>

          <section className="content-section honors-section" id="honors">
            <SectionTitle eyebrow="Hard work, recognized">Awards &amp; honors</SectionTitle>
            <div className="honors-grid">
              <article className="info-card">
                <div className="card-icon" aria-hidden="true">✦</div>
                <h3>Academic honors</h3>
                <BulletList items={profile.honors} />
              </article>
              <article className="info-card competition-card">
                <div className="card-icon" aria-hidden="true">✳</div>
                <h3>Competitions</h3>
                <BulletList items={profile.competitions} />
              </article>
            </div>
          </section>

          <section className="content-section" id="leadership">
            <SectionTitle eyebrow="Showing up for others">Leadership</SectionTitle>
            <div className="role-list">
              {profile.leadership.map((role) => <RoleCard key={role.title} role={role} />)}
            </div>
          </section>

          <section className="content-section service-section" id="service">
            <SectionTitle eyebrow="Giving back">Volunteer work</SectionTitle>
            <div className="role-list">
              {profile.service.map((role) => <RoleCard key={role.title} role={role} />)}
            </div>
          </section>

          <section className="content-section" id="experience">
            <SectionTitle eyebrow="Learning by doing">Experience</SectionTitle>
            <div className="role-list">
              {profile.experience.map((role) => <RoleCard key={role.title} role={role} />)}
            </div>
          </section>

          <section className="content-section blog-section" id="blog">
            <SectionTitle eyebrow="Little moments, lately">Life &amp; notes</SectionTitle>
            {profile.blogPosts.length > 0 ? (
              <div className="blog-grid">
                {profile.blogPosts.map((post) => (
                  <article className="blog-card" key={`${post.title}-${post.date}`}>
                    <img src={post.image} alt={post.title} loading="lazy" />
                    <div className="blog-card-copy">
                      {post.category && <p className="eyebrow">{post.category}</p>}
                      <h3>{post.title}</h3>
                      <p className="blog-date">{post.date}</p>
                      <p>{post.caption}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="blog-empty">
                <div className="empty-photo" aria-hidden="true"><PawPrint /></div>
                <div>
                  <h3>A space for everyday stories.</h3>
                  <p>Personal photos, little adventures, and snapshots from daily life will find a home here soon.</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <a className="footer-home" href="#about" aria-label="Return to the About section"><HomeIcon /></a>
        <p>Made with care by {profile.name}</p>
        <a href="#about">Back to top ↑</a>
      </footer>
    </>
  );
}
