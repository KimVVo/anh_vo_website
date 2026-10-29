export type Role = { title: string; place: string; dates: string; points: string[] };
export type Profile = {
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

export const profile: Profile = {
  name: "Anh Vo",
  tagline: "Senior at Spring Creek Academy, heading toward pre-med",
  about:
    "I have studied in Vietnam, Utah and Texas, and my grades have gone up every year since I arrived. I like science, helping classmates learn, and caring for animals.",
  gpa: 3.88,
  sat: 1400,
  gpaByYear: [
    { grade: "Grade 9", gpa: 3.5 },
    { grade: "Grade 10", gpa: 3.95 },
    { grade: "Grade 11", gpa: 3.94 },
    { grade: "Grade 12", gpa: 4.0, note: "in progress" },
  ],
  schools: [
    { name: "Spring Creek Academy", where: "Plano, TX", dates: "Aug 2025 – Present" },
    { name: "Layton Christian Academy", where: "Layton, UT", dates: "Aug 2024 – May 2025" },
    { name: "Nguyen Hue Middle School", where: "Ho Chi Minh City, Vietnam", dates: "Aug 2023 – May 2024" },
  ],
  honors: [
    "National Honor Society member since September 2026",
    "Highest Honor Roll, grades 10–12",
    "Ranked 2nd in class in grade 9 (GPA 9.1/10.00)",
    "Outstanding Academic Achievement in Pre-Calculus",
  ],
  competitions: [
    "Third Place, Literature, City Level Excellent Student Competition",
    "Second Place, Literature, District Level Excellent Student Competition",
    "Second Place, Science and Technology Research Competition",
    "First Place, School Level “Growing Up with Books” Competition",
  ],
  scholarships: [
    "$14,500 scholarship, Springwood School (2024)",
    "100% funding for a 3-month student exchange program in Dalat, Vietnam (2024)",
  ],
  roles: [
    {
      title: "Marketing Outreach Specialist",
      place: "Truong Khoa Jeans LLC, Ho Chi Minh City",
      dates: "May 2026 – Aug 2026",
      points: [
        "Designed promotional posters and managed social media channels for a family-owned jeans business.",
        "Increased social media reactions by 100%, attracting more customers and supporting sales.",
      ],
    },
    {
      title: "Pet Sitter",
      place: "",
      dates: "Sep 2024 – Present",
      points: [
        "Cared for 5+ dogs for friends, family members, and neighbors while their owners were away.",
        "Prepared meals, gave medication, walked, and played with dogs.",
        "Received positive feedback from dog owners on the care provided.",
      ],
    },
    {
      title: "Class Vice President",
      place: "Grades 1–9, Vietnam",
      dates: "Aug 2015 – May 2024",
      points: [
        "Ensured a class of 40 students completed homework and brought required materials daily.",
        "Organized group study sessions, paired strong students with struggling peers, and answered classmates’ lesson questions as a peer teaching assistant.",
        "Assigned duties for school dance and sports events and organized class activities to build unity.",
      ],
    },
  ],
  service: [
    "Community Service Volunteer, Layton Christian Academy and Christian Life Center Church (65 hours): distributed food to families in need in the school community and surrounding communities",
  ],
};
