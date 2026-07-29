import fs from "fs";
import path from "path";

export interface StoredCertificate {
  id: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  issueDate: string;
  grade?: string;
  trainerName?: string;
  trainerDesignation?: string;
  skills?: string;
  durationHours?: string;
  rollNumber?: string;
  certificationText?: string;
  status: "LIVE" | "DRAFT" | "REVOKED" | "EXPIRED";
}

const dataFilePath = path.join(process.cwd(), "src/data/certificates.json");

export function getAllCertificates(): StoredCertificate[] {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const content = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading certificates dataset:", error);
    return [];
  }
}

export function getCertificateById(id: string): StoredCertificate | null {
  const all = getAllCertificates();
  const found = all.find((c) => c.id.toUpperCase() === id.toUpperCase());
  return found || null;
}

export function issueNewCertificate(data: {
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  grade?: string;
  trainerName?: string;
  trainerDesignation?: string;
  skills?: string;
  durationHours?: string;
  rollNumber?: string;
  certificationText?: string;
  isLive?: boolean;
}): StoredCertificate {
  const all = getAllCertificates();

  // Generate Certificate ID: KTC-COURSE-YEAR-RANDOM
  const courseSlug = data.courseTitle
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 4)
    .toUpperCase();

  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const certificateId = `KTC-${courseSlug || "CERT"}-${year}-${randomNum}`;

  const todayStr = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const defaultCitation = `This is to certify that ${data.studentName} has successfully completed the ${data.durationHours || "4-Month"} ${data.courseTitle} at KodeToCareer. During the program, the student demonstrated proficiency in full-stack web development, AI-assisted development, and successfully completed practical assignments and capstone projects. We congratulate them and wish them success in their future career.`;

  const newCert: StoredCertificate = {
    id: certificateId,
    studentName: data.studentName,
    studentEmail: data.studentEmail,
    courseTitle: data.courseTitle,
    issueDate: todayStr,
    grade: data.grade || "Pass with Distinction (94%)",
    trainerName: data.trainerName || "Md Arbaaz",
    trainerDesignation: data.trainerDesignation || "Founder & Lead Tech Instructor",
    skills: data.skills || "React 19, Next.js, Node.js, Express, MongoDB, Tailwind CSS, REST APIs",
    durationHours: data.durationHours || "4-Month MERN Stack Development with AI Training Program",
    rollNumber: data.rollNumber || `KTC-REG-${year}-${Math.floor(1000 + Math.random() * 9000)}`,
    certificationText: data.certificationText || defaultCitation,
    status: data.isLive === false ? "DRAFT" : "LIVE",
  };

  all.unshift(newCert);

  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(all, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing new certificate to file:", err);
  }

  return newCert;
}

export function updateCertificateStatus(
  id: string,
  newStatus: "LIVE" | "DRAFT" | "REVOKED" | "EXPIRED"
): StoredCertificate | null {
  const all = getAllCertificates();
  const index = all.findIndex((c) => c.id.toUpperCase() === id.toUpperCase());

  if (index === -1) return null;

  all[index].status = newStatus;

  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(all, null, 2), "utf8");
  } catch (err) {
    console.error("Error updating certificate status:", err);
  }

  return all[index];
}
