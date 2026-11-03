import { useEffect, useRef, useState } from "react";
import bakingPhoto from "../../server/src/hobbies/cooking/baking.jpg";
import cookingPhoto1 from "../../server/src/hobbies/cooking/cooking1.jpg";
import cookingPhoto2 from "../../server/src/hobbies/cooking/cooking2.jpg";
import cookingPhoto3 from "../../server/src/hobbies/cooking/cooking3.jpg";
import crochetPhoto1 from "../../server/src/hobbies/crochet/crochet1.jpg";
import crochetPhoto2 from "../../server/src/hobbies/crochet/crochet2.jpg";
import crochetPhoto3 from "../../server/src/hobbies/crochet/crochet3.jpg";
import crochetPhoto4 from "../../server/src/hobbies/crochet/crochet4.jpg";

type School = {
  name: string;
  logo?: string;
  logoBackground?: string;
  logoMark: string;
  grade: string;
  where: string;
  dates: string;
};
type Role = {
  title: string;
  place: string;
  dates: string;
  points: string[];
  evidence?: Evidence[];
};
type Evidence = { title: string; image: string; alt: string };
type Award = { text: string; evidence?: Evidence };
type Hobby = {
  title: string;
  description: string;
};
type ServiceRole = {
  title: string;
  place: string;
  dates: string;
  points: string[];
  evidence?: Evidence[];
};
type Profile = {
  name: string;
  tagline: string;
  about: string;
  profilePhoto: string;
  sat: {
    math: number;
    english: number;
    total: number;
    percentile: string;
    date: string;
  };
  gpa: string;
  schools: School[];
  honors: Award[];
  competitions: Award[];
  leadership: Role[];
  service: ServiceRole[];
  experience: Role[];
  hobbies: Hobby[];
};

const navigation = [
  ["about", "About"],
  ["education", "Education"],
  ["honors", "Awards"],
  ["leadership", "Leadership"],
  ["service", "Volunteer"],
  ["experience", "Experience"],
  ["hobbies", "Hobbies"],
];

const hobbyPhotos: Record<string, Evidence[]> = {
  Cooking: [
    { title: "Cooking", image: cookingPhoto1, alt: "Anh's cooking" },
    { title: "Baking", image: bakingPhoto, alt: "Anh's baking" },
    { title: "Cooking", image: cookingPhoto2, alt: "Anh's cooking" },
    { title: "Cooking", image: cookingPhoto3, alt: "Anh's cooking" },
  ],
  Crocheting: [
    {
      title: "Crocheting",
      image: crochetPhoto1,
      alt: "A crochet project by Anh",
    },
    {
      title: "Crocheting",
      image: crochetPhoto2,
      alt: "A crochet project by Anh",
    },
    {
      title: "Crocheting",
      image: crochetPhoto3,
      alt: "A crochet project by Anh",
    },
    {
      title: "Crocheting",
      image: crochetPhoto4,
      alt: "A crochet project by Anh",
    },
  ],
};

function PawPrint({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="16" cy="21" rx="8" ry="6.5" />
      <ellipse cx="6" cy="13" rx="3" ry="4" />
      <ellipse cx="12" cy="7.5" rx="3" ry="4.2" />
      <ellipse cx="20" cy="7.5" rx="3" ry="4.2" />
      <ellipse cx="26" cy="13" rx="3" ry="4" />
    </svg>
  );
}

function AnimalHugIcon() {
  return <img className="animal-hug-icon" src="/cat-and-dog.jpg" alt="" />;
}

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="section-title">
      <h2>{children}</h2>
    </div>
  );
}

function HighlightedText({ text }: { text: string }) {
  return text
    .split(/(\*\*.*?\*\*)/g)
    .map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={index}>{part.slice(2, -2)}</strong>
      ) : (
        part
      ),
    );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="bullet-list">
      {items.map((item) => (
        <li key={item}>
          <HighlightedText text={item} />
        </li>
      ))}
    </ul>
  );
}

function AwardList({
  items,
  onViewEvidence,
}: {
  items: Award[];
  onViewEvidence: (evidence: Evidence) => void;
}) {
  return (
    <ul className="bullet-list">
      {items.map((award) => (
        <li key={award.text}>
          <HighlightedText text={award.text} />
          {award.evidence && (
            <button
              className="evidence-link"
              type="button"
              aria-label={`View certificate: ${award.evidence.title}`}
              onClick={() => {
                if (award.evidence) onViewEvidence(award.evidence);
              }}
            >
              View certificate <span aria-hidden="true">↗</span>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

function RoleCard({
  role,
  onViewEvidence,
}: {
  role: Role | ServiceRole;
  onViewEvidence: (evidence: Evidence) => void;
}) {
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
      {role.evidence && role.evidence.length > 0 && (
        <div className="role-evidence" aria-label="Portfolio photo evidence">
          {role.evidence.map((evidence) => (
            <button
              className="role-evidence-button"
              key={evidence.image}
              type="button"
              aria-label={`View photo: ${evidence.title}`}
              onClick={() => onViewEvidence(evidence)}
            >
              <img src={evidence.image} alt="" loading="lazy" />
              <span>
                {evidence.title} <span aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </article>
  );
}

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [failed, setFailed] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(
    null,
  );
  const evidenceDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => {
        if (!response.ok)
          throw new Error(`Portfolio request failed: ${response.status}`);
        return response.json() as Promise<Profile>;
      })
      .then(setProfile)
      .catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    const dialog = evidenceDialogRef.current;
    if (!dialog) return;
    if (selectedEvidence && !dialog.open) dialog.showModal();
    if (!selectedEvidence && dialog.open) dialog.close();
  }, [selectedEvidence]);

  if (failed) {
    return (
      <p className="loading-message">
        Could not load the portfolio. Start the API with{" "}
        <code>npm run dev</code>.
      </p>
    );
  }
  if (!profile) return <p className="loading-message">Loading portfolio…</p>;

  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <a
            className="home-link"
            href="#about"
            aria-label="Return to the About section"
            title="Back to About"
          >
            <AnimalHugIcon />
          </a>
          <nav className="site-nav" aria-label="Portfolio sections">
            {navigation.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="about-section" id="about">
          <div className="about-inner">
            <div className="about-copy">
              <h1>
                Hi, I’m <span>{profile.name}</span>
              </h1>
              <p className="tagline">{profile.tagline}</p>
              <p className="about-text">
                <HighlightedText text={profile.about} />
              </p>
              <div className="about-actions">
                <a
                  className="primary-link resume-link"
                  href="/Anh_Vo_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View resume <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div className="portrait-wrap">
              <div className="portrait-paw-trail" aria-hidden="true">
                {Array.from({ length: 8 }, (_, step) => (
                  <PawPrint
                    key={step}
                    className={`portrait-step portrait-step-${step + 1}`}
                  />
                ))}
              </div>
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
            </div>
          </div>
          <div className="about-bottom">
            <div>
              <strong>{profile.sat.total}</strong>
              <span>SAT score</span>
            </div>
            <div>
              <strong>{profile.gpa}</strong>
              <span>GPA range · grades 10–12</span>
            </div>
            <div>
              <strong>100+</strong>
              <span>Volunteer hours</span>
            </div>
          </div>
        </section>

        <div className="content">
          <section className="content-section education-section" id="education">
            <SectionTitle>Education</SectionTitle>
            <div className="education-layout">
              <div className="school-list">
                {profile.schools.map((school) => (
                  <article className="school-card" key={school.name}>
                    <span
                      className="school-logo"
                      style={{
                        backgroundColor: school.logoBackground ?? "transparent",
                      }}
                    >
                      {school.logo ? (
                        <img src={school.logo} alt={`${school.name} logo`} />
                      ) : (
                        <span aria-label={`${school.name} initials`}>
                          {school.logoMark}
                        </span>
                      )}
                    </span>
                    <div>
                      <h3>
                        {school.name}{" "}
                        <span className="school-grade">{school.grade}</span>
                      </h3>
                      <p>{school.where}</p>
                      <span className="school-dates">{school.dates}</span>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="sat-card">
                <h3>SAT</h3>
                <p className="sat-total">
                  {profile.sat.total}
                  <span> / 1600</span>
                </p>
                <div className="sat-split">
                  <span>
                    <strong>{profile.sat.math}</strong> Math
                  </span>
                  <span>
                    <strong>{profile.sat.english}</strong> English
                  </span>
                </div>
                <p className="sat-note">
                  <u>
                    <strong>{profile.sat.percentile}</strong> nationally
                  </u>{" "}
                  · {profile.sat.date}
                </p>
              </aside>
            </div>
          </section>

          <section className="content-section honors-section" id="honors">
            <SectionTitle>Awards &amp; honors</SectionTitle>
            <div className="honors-grid">
              <article className="info-card">
                <div className="card-icon" aria-hidden="true">
                  ✦
                </div>
                <h3>Academic honors</h3>
                <AwardList
                  items={profile.honors}
                  onViewEvidence={setSelectedEvidence}
                />
              </article>
              <article className="info-card competition-card">
                <div className="card-icon" aria-hidden="true">
                  ✳
                </div>
                <h3>Competitions</h3>
                <AwardList
                  items={profile.competitions}
                  onViewEvidence={setSelectedEvidence}
                />
              </article>
            </div>
          </section>

          <section className="content-section" id="leadership">
            <SectionTitle>Leadership</SectionTitle>
            <div className="role-list">
              {profile.leadership.map((role) => (
                <RoleCard
                  key={role.title}
                  role={role}
                  onViewEvidence={setSelectedEvidence}
                />
              ))}
            </div>
          </section>

          <section className="content-section service-section" id="service">
            <SectionTitle>Volunteer work</SectionTitle>
            <div className="role-list">
              {profile.service.map((role) => (
                <RoleCard
                  key={role.title}
                  role={role}
                  onViewEvidence={setSelectedEvidence}
                />
              ))}
            </div>
          </section>

          <section className="content-section" id="experience">
            <SectionTitle>Experience</SectionTitle>
            <div className="role-list">
              {profile.experience.map((role) => (
                <RoleCard
                  key={role.title}
                  role={role}
                  onViewEvidence={setSelectedEvidence}
                />
              ))}
            </div>
          </section>

          <section className="content-section hobbies-section" id="hobbies">
            <SectionTitle>Hobbies</SectionTitle>
            <p className="hobbies-intro">
              In my free time, I love cooking and crocheting.
            </p>
            <div className="hobby-grid">
              {profile.hobbies.map((hobby) => (
                <article className="role-card hobby-card" key={hobby.title}>
                  <h3>{hobby.title}</h3>
                  <p>{hobby.description}</p>
                  <div
                    className="role-evidence"
                    aria-label={`${hobby.title} photos`}
                  >
                    {hobbyPhotos[hobby.title].map((photo) => (
                      <button
                        className="role-evidence-button"
                        key={photo.image}
                        type="button"
                        aria-label={`View photo: ${photo.title}`}
                        onClick={() => setSelectedEvidence(photo)}
                      >
                        <img src={photo.image} alt="" loading="lazy" />
                        <span>
                          View photo <span aria-hidden="true">↗</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <p>Made with care ❤️ by {profile.name}</p>
        <a href="#about">Back to top ↑</a>
      </footer>
      <dialog
        ref={evidenceDialogRef}
        className="evidence-dialog"
        aria-labelledby="evidence-dialog-title"
        onClose={() => setSelectedEvidence(null)}
        onClick={(event) => {
          if (event.target === evidenceDialogRef.current) {
            setSelectedEvidence(null);
          }
        }}
      >
        {selectedEvidence && (
          <>
            <div className="evidence-dialog-heading">
              <h2 id="evidence-dialog-title">{selectedEvidence.title}</h2>
              <button
                className="evidence-close"
                type="button"
                aria-label="Close photo viewer"
                onClick={() => setSelectedEvidence(null)}
              >
                ×
              </button>
            </div>
            <img src={selectedEvidence.image} alt={selectedEvidence.alt} />
          </>
        )}
      </dialog>
    </>
  );
}
