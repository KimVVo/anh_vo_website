export type Role = {
  title: string;
  place: string;
  dates: string;
  points: string[];
  evidence?: Evidence[];
};
export type School = {
  name: string;
  logo?: string;
  logoBackground?: string;
  logoMark: string;
  grade: string;
  where: string;
  dates: string;
};
export type Evidence = { title: string; image: string; alt: string };
export type Award = { text: string; evidence?: Evidence };
export type Profile = {
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
  service: Role[];
  experience: Role[];
};

export const profile: Profile = {
  name: "Anh Vo",
  tagline: "📍Plano, Texas · Senior High School Student",
  about:
    "I am an international student in Vietnam. I've studied in Utah and Texas, and each community has shaped how I learn and connect with others. I enjoy literature and science, supporting the people around me, and caring for animals.",
  profilePhoto: "/profile-photo.jpg",
  sat: {
    math: 750,
    english: 650,
    total: 1400,
    percentile: "Top 3%",
    date: "October 2026",
  },
  gpa: "3.91–4.00",
  schools: [
    {
      name: "Spring Creek Academy",
      logo: "/logos/spring-creek-academy.png",
      logoMark: "SC",
      grade: "Grades 11–12",
      where: "Plano, TX",
      dates: "Aug 2025 – Present · Expected graduation May 2027",
    },
    {
      name: "Layton Christian Academy",
      logo: "/logos/layton-christian-academy.png",
      logoBackground: "#89231d",
      logoMark: "LC",
      grade: "Grade 10",
      where: "Layton, UT",
      dates: "Aug 2024 – May 2025",
    },
    {
      name: "Nguyen Hue Middle School",
      logo: "/logos/nguyen-hue-middle-school.jpg",
      logoMark: "NH",
      grade: "Grade 9",
      where: "Ho Chi Minh City, Vietnam",
      dates: "Aug 2023 – May 2024",
    },
  ],
  honors: [
    {
      text: "**National Honor Society member**, Spring Creek Academy chapter (since September 2026)",
      evidence: {
        title: "National Honor Society Membership",
        image: "/certificates/national-honor-society.jpg",
        alt: "National Honor Society membership certificate from Spring Creek Academy for Truong Thien Anh Vo",
      },
    },
    { text: "Maintained **GPAs of 3.91–4.00** throughout grades 10–12" },
    {
      text: "**Certification of Recognition for Highest Scores**, Layton Christian Academy, grade 10 (May 2025)",
      evidence: {
        title: "Certification of Recognition for Highest Scores",
        image: "/certificates/layton-highest-scores.jpg",
        alt: "Certification of Recognition for Highest Scores awarded to Anh Vo in May 2025",
      },
    },
    {
      text: "**Outstanding Academic Achievement in Pre-Calculus**, Layton Christian Academy, grade 10 (May 2025)",
      evidence: {
        title: "Outstanding Academic Achievement in Pre-Calculus",
        image: "/certificates/layton-precalculus-achievement.jpg",
        alt: "Certificate of Recognition for Outstanding Academic Achievement in Precalculus awarded to Vo Anh in May 2025",
      },
    },
    {
      text: "**Ranked 9th among 400 students** at Nguyen Hue Middle School, grade 9 (GPA 9.1/10.00)",
    },
  ],
  competitions: [
    {
      text: "**Third Prize**, Ho Chi Minh City Excellent Student Competition in Literature (grade 9)",
      evidence: {
        title:
          "Ho Chi Minh City Excellent Student Competition in Literature — Third Prize",
        image: "/certificates/hcmc-literature-third-prize.jpg",
        alt: "Certificate and award sash for Third Prize in the city-level Literature competition",
      },
    },
    {
      text: "**Second Prize**, Tan Phu District Excellent Student Competition in Literature (grade 9)",
    },
    {
      text: "**Second Prize**, Tan Phu District Science and Engineering Competition (grade 9)",
    },
    {
      text: "**First Prize**, “Growing Up with Books” Competition at Nguyen Hue Middle School (grade 9)",
    },
  ],
  leadership: [
    {
      title: "Class President",
      place: "Grades 1–9 · Vietnam",
      dates: "Aug 2015 – May 2024",
      points: [
        "Helped a **class of 40 students** complete homework and bring required materials each day.",
        "**Organized group study sessions**, paired strong students with peers who needed support, and answered classmates’ lesson questions as a **peer teaching assistant**.",
        "Assigned duties for school dance and sports events and **organized activities** that helped build class unity.",
      ],
    },
  ],
  service: [
    {
      title: "Community Service Volunteer · 100+ hours",
      place: "Christian Life Center Church · Layton, UT",
      dates: "Aug 2024 – May 2025",
      points: [
        "**Distributed food and essential supplies** to hundreds of local families.",
        "Prepared and packaged **more than 200 nutritious meals** for local seniors.",
        "Engaged with seniors through **recreational activities and meaningful conversations**.",
      ],
      evidence: [
        {
          title: "Serving meals to local seniors",
          image: "/volunteer/senior-meal-service.jpg",
          alt: "Volunteers serving meals to seniors at a community event",
        },
        {
          title: "Community service volunteer group",
          image: "/volunteer/community-volunteer-group.jpg",
          alt: "Group of student volunteers at a community service event",
        },
      ],
    },
  ],
  experience: [
    {
      title: "Marketing Outreach Specialist",
      place: "Truong Khoa Jeans LLC · Ho Chi Minh City, Vietnam",
      dates: "May 2026 – Aug 2026",
      points: [
        "**Created promotional content** and managed social media channels for a family-owned denim business.",
        "**Increased social media reactions by double**, attracting more customers and supporting sales.",
      ],
    },
    {
      title: "Pet Sitter",
      place: "Friends, family members, and neighbors",
      dates: "Sep 2024 – Present",
      points: [
        "**Cared for five dogs** while their owners were away.",
        "Handled **feeding, medication, walks, and play** for the dogs.",
        "Earned **positive feedback** from dog owners on the care provided.",
      ],
      evidence: [
        {
          title: "Bathing a dog in my care",
          image: "/experience/pet-sitting-dog-care.jpg",
          alt: "Anh caring for a dog after bathing it",
        },
      ],
    },
  ],
};
