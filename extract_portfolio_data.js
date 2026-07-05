// extract_portfolio_data.js
// Script to extract portfolio data from the repository and output JSON.
const fs = require('fs');
const path = require('path');

/**
 * Data structure for the extracted portfolio information.
 */
const repoRoot = "/Users/susatwikmanuri/Downloads/personal_portfolio-master";

function readFile(relPath) {
  const abs = path.join(repoRoot, relPath);
  return fs.existsSync(abs) ? fs.readFileSync(abs, "utf-8") : "";
}

function extractPersonalInfo() {
  const readme = readFile("README.md");
  const nameMatch = readme.match(/#\s+([^\n]+)/);
  const titleMatch = readme.match(/-\s+\*\*(.*?)\*\*/);
  return {
    fullName: nameMatch ? nameMatch[1].trim() : null,
    professionalTitle: titleMatch ? titleMatch[1].trim() : null,
    tagline: null,
    shortBio: null,
    longAboutMe: null,
    currentPosition: null,
    yearsOfExperience: null,
  };
}

function extractContactInfo() {
  const env = readFile(".env.example");
  const email = env.match(/EMAIL_USER\s*=\s*(.*)/);
  const phone = env.match(/PHONE\s*=\s*(.*)/);
  return {
    email: email ? email[1].trim() : null,
    phoneNumber: phone ? phone[1].trim() : null,
    address: null,
    city: null,
    state: null,
    country: null,
    timezone: null,
    availability: null,
  };
}

function extractSocialLinks() {
  const srcDir = path.join(repoRoot, "src");
  const urlRegex = /https?:\/\/[^\s'"`]+/g;
  const links = {};
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(entryPath);
      else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.js')) {
        const content = fs.readFileSync(entryPath, "utf-8");
        const matches = content.match(urlRegex);
        if (matches) {
          for (const url of matches) {
            if (url.includes('github.com')) links.github = url;
            else if (url.includes('linkedin.com')) links.linkedin = url;
            else if (url.includes('twitter.com') || url.includes('x.com')) links.twitter = url;
            else if (url.includes('medium.com')) links.medium = url;
            else if (url.includes('dev.to')) links.devto = url;
            else if (url.includes('youtube.com')) links.youtube = url;
            else if (url.includes('instagram.com')) links.instagram = url;
            else if (url.includes('leetcode.com')) links.leetcode = url;
            else if (url.includes('codechef.com')) links.codechef = url;
            else if (url.includes('hackerrank.com')) links.hackerrank = url;
            else if (url.includes('kaggle.com')) links.kaggle = url;
            else if (!links.portfolio) links.portfolio = url;
          }
        }
      }
    }
  }
  walk(srcDir);
  return links;
}

function extractSkills() {
  const skillsPath = path.join(repoRoot, "src/components/Skills.tsx");
  if (!fs.existsSync(skillsPath)) return null;
  const content = fs.readFileSync(skillsPath, "utf-8");
  const sections = [
    "Programming Languages",
    "Frontend",
    "Backend",
    "Databases",
    "AI / Machine Learning",
    "Cloud",
    "DevOps",
    "Frameworks",
    "Libraries",
    "APIs",
    "Tools",
    "Design",
    "Other Technologies",
  ];
  const result = {};
  for (const sec of sections) {
    const regex = new RegExp(`${sec}\\s*[:=]\\s*\\[([^\\]]+)\\]`, "i");
    const m = content.match(regex);
    if (m) {
      const items = m[1]
        .split(',')
        .map(s => s.replace(/[\'\"\`]/g, "").trim())
        .filter(Boolean);
      result[sec.replace(/\s+/g, "")] = items;
    } else {
      result[sec.replace(/\s+/g, "")] = null;
    }
  }
  return result;
}

function extractExperiences() {
  const expPath = path.join(repoRoot, "src/components/Timeline.tsx");
  if (!fs.existsSync(expPath)) return [];
  const content = fs.readFileSync(expPath, "utf-8");
  const items = [];
  const itemRegex = /<TimelineItem[^>]*company={\"([^\"]*)\"}[^>]*role={\"([^\"]*)\"}[^>]*duration={\"([^\"]*)\"}[^>]*location={\"([^\"]*)\"}[^>]*>([\s\S]*?)<\/TimelineItem>/g;
  let m;
  while ((m = itemRegex.exec(content)) !== null) {
    items.push({
      company: m[1] || null,
      role: m[2] || null,
      duration: m[3] || null,
      location: m[4] || null,
      responsibilities: null,
      achievements: null,
      technologiesUsed: null,
    });
  }
  return items;
}

function extractProjects() {
  const projPath = path.join(repoRoot, "src/components/Projects.tsx");
  if (!fs.existsSync(projPath)) return [];
  const content = fs.readFileSync(projPath, "utf-8");
  const projects = [];
  const projectRegex = /<ProjectCard[^>]*title={\"([^\"]*)\"}[^>]*description={\"([^\"]*)\"}[^>]*techStack={\"([^\"]*)\"}[^>]*githubUrl={\"([^\"]*)\"}[^>]*liveDemoUrl={\"([^\"]*)\"}[^>]*>/g;
  let m;
  while ((m = projectRegex.exec(content)) !== null) {
    projects.push({
      name: m[1] || null,
      description: m[2] || null,
      problemStatement: null,
      solution: null,
      features: null,
      techStack: m[3] ? m[3].split(',').map(s => s.trim()) : null,
      gitHubUrl: m[4] || null,
      liveDemoUrl: m[5] || null,
      images: null,
      videos: null,
      caseStudy: null,
      duration: null,
      teamSize: null,
    });
  }
  return projects;
}

function extractEducation() {
  const eduPath = path.join(repoRoot, "src/components/About.tsx");
  if (!fs.existsSync(eduPath)) return [];
  const content = fs.readFileSync(eduPath, "utf-8");
  const eduRegex = /<EducationItem[^>]*institution={\"([^\"]*)\"}[^>]*degree={\"([^\"]*)\"}[^>]*branch={\"([^\"]*)\"}[^>]*cgpa={\"([^\"]*)\"}[^>]*duration={\"([^\"]*)\"}[^>]*>/g;
  const list = [];
  let m;
  while ((m = eduRegex.exec(content)) !== null) {
    list.push({
      institution: m[1] || null,
      degree: m[2] || null,
      branch: m[3] || null,
      cgpa: m[4] || null,
      duration: m[5] || null,
      coursework: null,
    });
  }
  return list;
}

function extractOtherSections() {
  return {
    certifications: [],
    achievements: [],
    leadership: [],
    workshopsEvents: [],
    testimonials: [],
    blogs: [],
    resume: null,
    imagesAssets: {},
    seo: {},
    navigation: [],
    footer: {},
    theme: {},
    components: [],
    integrations: [],
  };
}

function main() {
  const data = {
    personalInformation: extractPersonalInfo(),
    contactInformation: extractContactInfo(),
    socialLinks: extractSocialLinks(),
    skills: extractSkills(),
    experience: extractExperiences(),
    projects: extractProjects(),
    education: extractEducation(),
    ...extractOtherSections(),
  };
  const outPath = path.join(repoRoot, "portfolio_data.json");
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Portfolio data extracted to ${outPath}`);
}

main();
