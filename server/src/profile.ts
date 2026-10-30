export type Role = { title: string; place: string; dates: string; points: string[] };
export type School = { name: string; where: string; dates: string };
export type BlogPost = { title: string; date: string; caption: string; image: string; category?: string };
export type Profile = {
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
  service: Role[];
  experience: Role[];
  blogPosts: BlogPost[];
};

export const profile: Profile = {
  name: "Anh Vo",
  tagline: "Student in Plano, Texas · Curious across cultures · Committed to community",
  about:
    "I’ve studied in Vietnam, Utah, and Texas, and each community has shaped how I learn and connect with others. I enjoy literature and science, supporting the people around me, and caring for animals.",
  profilePhoto: "/profile.jpg",
  sat: {
    math: 750,
    english: 650,
    total: 1400,
    percentile: "Top 3%",
    date: "October 2026",
  },
  gpa: "3.91–4.00",
  schools: [
    { name: "Spring Creek Academy", where: "Plano, TX", dates: "Aug 2025 – Present · Expected graduation May 2027" },
    { name: "Layton Christian Academy", where: "Layton, UT", dates: "Aug 2024 – May 2025" },
    { name: "Nguyen Hue Middle School", where: "Ho Chi Minh City, Vietnam", dates: "Aug 2023 – May 2024" },
  ],
  honors: [
    "National Honor Society member, Spring Creek Academy chapter (since September 2026)",
    "Maintained GPAs of 3.91–4.00 throughout grades 10–12",
    "Certification of Recognition for Highest Scores, Layton Christian Academy, grade 10 (May 2025)",
    "Certification of Recognition for Outstanding Academic Achievement in Pre-Calculus, Layton Christian Academy, grade 10 (May 2025)",
    "Ranked 9th among 400 students at Nguyen Hue Middle School, grade 9 (GPA 9.1/10.00)",
  ],
  competitions: [
    "Third Prize, Ho Chi Minh City Excellent Student Competition in Literature (grade 9)",
    "Second Prize, Tan Phu District Excellent Student Competition in Literature (grade 9)",
    "Second Prize, Tan Phu District Science and Engineering Competition (grade 9)",
    "First Prize, “Growing Up with Books” Competition at Nguyen Hue Middle School (grade 9)",
  ],
  leadership: [
    {
      title: "Class President",
      place: "Grades 1–9 · Vietnam",
      dates: "Aug 2015 – May 2024",
      points: [
        "Helped a class of 40 students complete homework and bring required materials each day.",
        "Organized group study sessions, paired strong students with peers who needed support, and answered classmates’ lesson questions as a peer teaching assistant.",
        "Assigned duties for school dance and sports events and organized activities that helped build class unity.",
      ],
    },
  ],
  service: [
    {
      title: "Community Service Volunteer · 100+ hours",
      place: "Christian Life Center Church · Layton, UT",
      dates: "Aug 2024 – May 2025",
      points: [
        "Coordinated distribution of food and essential supplies to hundreds of families in need in the Layton school and local community.",
        "Prepared and packaged more than 200 nutritious meals for local seniors.",
        "Connected with seniors through recreational games, activities, and conversations at regular senior home events.",
      ],
    },
  ],
  experience: [
    {
      title: "Marketing Outreach Specialist",
      place: "Truong Khoa Jeans LLC · Ho Chi Minh City, Vietnam",
      dates: "May 2026 – Aug 2026",
      points: [
        "Designed promotional posts and videos and managed social media channels for a family-owned jeans business.",
        "Increased social media reactions by 100%, attracting more customers and supporting sales.",
      ],
    },
    {
      title: "Pet Sitter",
      place: "Friends, family members, and neighbors",
      dates: "Sep 2024 – Present",
      points: [
        "Cared for five dogs while their owners were away.",
        "Prepared meals, gave medication, walked, and played with the dogs.",
        "Received positive feedback from dog owners on the care provided.",
      ],
    },
  ],
  blogPosts: [],
};
