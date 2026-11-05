/* ============================================================
   PORTFOLIO CONTENT — one file drives every page.
   In `heroLines`, the entry with {serif: true} is the purple italic word.
   ============================================================ */

/* Public asset paths are prefixed with the deploy base (e.g. /imtechwiz-folio/ on GitHub Pages) */
const PUB = import.meta.env.BASE_URL;

const PORTFOLIO = {
  /* ---------- Identity ---------- */
  name: "Imran Khan",
  first: "Imran",
  last: "Khan",
  initials: "IK",
  role: "Founding SDET",
  location: "Bengaluru, India",
  cv: `${PUB}Imran_Khan_CV.pdf`,

  /* Hero: line 1 "BREAKING things", line 2 "ON PURPOSE." — {serif:true} = purple italic word */
  heroLines: [
    [{ text: "Breaking" }, { text: "things", serif: true }],
    [{ text: "on purpose." }],
  ],
  heroIntro:
    "a Founding SDET from Bengaluru, building the test infrastructure at OpenFX that keeps cross-border payments from breaking — so users never see it happen.",

  /* ---------- Contact ---------- */
  email: "imran.techwiz@gmail.com",
  linkedin: "https://www.linkedin.com/in/imrankhan227",
  github: "https://github.com/imrantechwiz",
  website: "https://imrantechwiz.github.io/Imtechwiz/",

  /* ---------- Work experience (home) ---------- */
  workBlurb:
    "My 4-year journey started as an SDET intern at Harness, grew into owning authentication quality, then crossed over to the developer side as SDE 1 and SDE 2 on Harness Core. Today I'm the Founding SDET at OpenFX, building the automation framework for cross-border payments from scratch.",

  companies: [
    {
      name: "OpenFX",
      mark: "FX", logo: `${PUB}logos/openfx.svg`,
      color: "#8c6ff7",
      sub: "Cross-border payments · 2026 — now",
      roles: [{ title: "Founding SDET", yr: "2026 —", note: "Test framework from zero: API, UI, E2E" }],
    },
    {
      name: "Harness",
      mark: "H", logo: `${PUB}logos/harness.png`,
      color: "#f4f4f7",
      sub: "CI/CD platform · 2022 — 2026",
      roles: [
        { title: "SDE 2", yr: "2025 — 26", note: "Platform quality & productivity" },
        { title: "SDE 1", yr: "2023 — 25", note: "Harness Core · Spring Boot, Go, Terraform" },
        { title: "SDET I", yr: "2023", note: "AuthN: SAML, SCIM, OAuth, SSO" },
        { title: "SDET Intern", yr: "2022 — 23", note: "Selenium, Rest Assured · PPO" },
      ],
    },
    {
      name: "HighRadius",
      mark: "HR", logo: `${PUB}logos/highradius.png`,
      color: "#4caf50",
      sub: "Fintech SaaS · 2022",
      roles: [{ title: "SWE Intern", yr: "2022", note: "Full-stack AI B2B app · React, Java, MySQL" }],
    },
  ],

  /* ---------- Wins (case studies) ---------- */
  wins: [
    {
      label: "At Harness",
      num: "4h → <1h",
      title: "Cut time-to-fix for failing tests from four hours to under one",
      text: "Rebuilt the test frameworks, wired JaCoCo for E2E coverage and pushed coverage to 89% — failures became obvious instead of mysterious.",
      tags: ["JaCoCo", "Java", "Test frameworks"],
      tone: "",
    },
    {
      label: "At Harness",
      num: "−75%",
      title: "Reduced automation effort by 75% with AI-driven tooling",
      text: "Introduced global prompts and the Agents.md framework so engineers generate and maintain automation with AI instead of by hand.",
      tags: ["AI agents", "Agents.md", "Productivity"],
      tone: "purple",
    },
    {
      label: "At Harness",
      num: "FedRAMP",
      title: "Led FIPS & FedRAMP compliance sign-off from the quality side",
      text: "Coordinated cross-team efforts to get regulatory delivery over the line for SMP customers.",
      tags: ["Compliance", "FIPS", "Cross-team"],
      tone: "lav",
    },
    {
      label: "At OpenFX",
      num: "0 → 1",
      title: "Built a fintech test framework from scratch",
      text: "API, UI and end-to-end coverage from user onboarding to multi-currency settlement, plus CI/CD gates and reusable test utilities.",
      tags: ["Playwright", "API testing", "CI/CD"],
      tone: "lime",
    },
  ],

  /* ---------- Hobbies ---------- */
  hobbiesBlurb: "I'm usually at a chessboard, a Codeforces round, or mentoring someone through their first automation framework.",
  hobbies: [
    { emoji: "♟️", text: "Chess" },
    { emoji: "⌨️", text: "Competitive coding" },
    { emoji: "🧑‍🏫", text: "Mentoring" },
    { emoji: "☕", text: "Filter coffee" },
  ],

  /* ---------- Experience (detail page) ---------- */
  experience: [
    {
      company: "OpenFX",
      role: "Founding SDET",
      period: "Aug 2026 — Present",
      location: "Bengaluru",
      summary: "Technical anchor for the application platform and onboarding at a cross-border payments startup.",
      points: [
        "Built the test automation framework from scratch — API, UI and end-to-end — from user onboarding through multi-currency settlement.",
        "Established CI/CD integration, structured code reviews and reusable test utilities that raised release velocity while protecting financial data integrity.",
        "Mentor junior engineers on testing strategies for fintech-grade reliability.",
      ],
      stack: ["Java", "Playwright", "REST", "CI/CD", "Payments"],
    },
    {
      company: "Harness",
      role: "SDE 2",
      period: "Apr 2025 — Aug 2026",
      location: "Bengaluru",
      summary: "Led platform quality and productivity engineering after promotion.",
      points: [
        "Integrated AI-driven automation with global prompts and the Agents.md framework — 75% less automation effort.",
        "Integrated JaCoCo for end-to-end code coverage; frameworks reached 89% coverage.",
        "Contract-testing proof of concept that increased integration reliability and deployment frequency.",
        "Cut mean time to test-failure resolution from four hours to under one.",
        "Led the FIPS and FedRAMP compliance sign-off from the quality side for SMP customers.",
      ],
      stack: ["Java", "Spring Boot", "JaCoCo", "AI Agents", "Contract Testing"],
    },
    {
      company: "Harness",
      role: "SDE 1",
      period: "Nov 2023 — Apr 2025",
      location: "Bengaluru",
      summary: "Backend engineering on Harness Core — microservices, security and internal tooling.",
      points: [
        "Java Spring Boot, Golang and Terraform across Harness Core.",
        "Secret management on GCP KMS and HashiCorp Vault; IP allow-listing for application security.",
        "Designed and shipped microservices with a focus on scalability.",
        "Extended the Admin Portal so CSEs could self-serve licensing tasks.",
      ],
      stack: ["Spring Boot", "Go", "Terraform", "GCP KMS", "Vault"],
    },
    {
      company: "Harness",
      role: "SDET I",
      period: "Apr 2023 — Nov 2023",
      location: "Bengaluru",
      summary: "Owned quality for the platform's authentication surface.",
      points: [
        "Tested LDAP, SAML, SCIM, OAuth and SSO against Okta, OneLogin, Azure AD and Google.",
        "Automated Just-in-Time provisioning, OpenAPI and performance testing.",
      ],
      stack: ["Java", "Rest Assured", "Selenium", "SAML", "OAuth"],
    },
    {
      company: "Harness",
      role: "SDET Intern",
      period: "Apr 2022 — Apr 2023",
      location: "Bengaluru",
      summary: "Test plan → execution → automation, end to end. Received a pre-placement offer.",
      points: [
        "Coordinated regression testing and defect triage with developers.",
        "Built POCs for new features and automated critical cases in Java.",
        "Maintained the Selenium / Rest Assured framework; built JIRA dashboards for bug tracking.",
      ],
      stack: ["Java", "Selenium", "Rest Assured", "JIRA"],
    },
    {
      company: "HighRadius",
      role: "SWE Intern",
      period: "Jan 2022 — Apr 2022",
      location: "Hyderabad",
      summary: "Built a full-stack, AI-enabled B2B cloud application.",
      points: ["React front end; Java servlets with MySQL via JDBC.", "Python regression model to predict invoice payment dates."],
      stack: ["React", "Java", "MySQL", "Python"],
    },
  ],

  /* ---------- Skills ---------- */
  skillGroups: [
    { title: "Languages", color: "#8c6ff7", skills: ["Java", "Go", "Python", "JavaScript", "SQL"] },
    { title: "Testing", color: "#c8f542", skills: ["Selenium", "Playwright", "Rest Assured", "Contract testing", "Performance testing", "JaCoCo"] },
    { title: "Backend & infra", color: "#3d3d3d", skills: ["Spring Boot", "Microservices", "Terraform", "GCP KMS", "HashiCorp Vault", "Harness CI/CD", "Docker"] },
    { title: "Domain", color: "#e4d9ff", skills: ["Cross-border payments", "AuthN — SAML · OAuth · SCIM", "FIPS / FedRAMP", "AI-assisted automation", "Mentoring"] },
  ],
  certifications: [
    { title: "Java Foundations Certified Junior Associate", by: "Oracle" },
    { title: "Software Engineer — Product", by: "HackerRank" },
    { title: "Data Structures in Java", by: "Certification" },
    { title: "Code Gladiators Semi-Finalist", by: "TechGig" },
    { title: "The Life of Happiness and Fulfillment", by: "Coursera" },
  ],
  languages: [
    { name: "English", level: "Full professional" },
    { name: "Hindi", level: "Professional working" },
    { name: "Punjabi", level: "Limited working" },
    { name: "Urdu", level: "Limited working" },
    { name: "Telugu", level: "Elementary" },
  ],

  /* ---------- Education ---------- */
  education: [
    { school: "Lovely Professional University", degree: "B.Tech, Computer Science (Hons.)", detail: "Full-stack development & automation testing", period: "2019 — 2023" },
    { school: "Army Public School", degree: "Class XII, CBSE — Non-medical (PCM)", detail: "Senior secondary", period: "2017 — 2019" },
    { school: "Army Public School", degree: "Class X, CBSE", detail: "Secondary", period: "2017" },
  ],
  awards: [
    { title: "Geek of the Week", by: "Harness" },
    { title: "All India Major Udai Singh Quiz", by: "AWES" },
    { title: "AWES Quiz — National Finale", by: "APS Secunderabad" },
    { title: "AWES Command Level Quiz", by: "AWES" },
    { title: "AWES Merit Certificate", by: "AWES" },
  ],
  publications: [{ title: "Floor Coloring", by: "Research publication", url: "" }],
};

export default PORTFOLIO;
