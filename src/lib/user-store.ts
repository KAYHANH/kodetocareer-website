export interface UserAccount {
  id: string;
  email: string;
  password: string;
  role: "super_admin" | "trainer" | "student";
  name: string;
  createdAt: string;
}

export const DEFAULT_USERS: UserAccount[] = [
  {
    id: "user-sa-1",
    email: "kodetocareer@gmail.com",
    password: "Kforcareer",
    role: "super_admin",
    name: "KodeToCareer Super Admin",
    createdAt: "2026-01-01",
  },
  {
    id: "user-tr-1",
    email: "trainer@kodetocareer.com",
    password: "trainer123",
    role: "trainer",
    name: "Md Arbaaz (Lead Trainer)",
    createdAt: "2026-01-01",
  },
  {
    id: "user-st-1",
    email: "student@kodetocareer.com",
    password: "student123",
    role: "student",
    name: "Rahul Sharma (Student)",
    createdAt: "2026-01-01",
  },
];

const STORAGE_KEY = "ktc_user_accounts_v1";

export function getUsers(): UserAccount[] {
  if (typeof window === "undefined") return DEFAULT_USERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    const parsed: UserAccount[] = JSON.parse(raw);
    // Ensure super admin credentials are sync'd to requested kodetocareer@gmail.com & Kforcareer
    const saIndex = parsed.findIndex((u) => u.role === "super_admin" || u.email === "kodetocareer@gmail.com");
    if (saIndex === -1) {
      parsed.unshift(DEFAULT_USERS[0]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    } else {
      parsed[saIndex].email = "kodetocareer@gmail.com";
      parsed[saIndex].password = "Kforcareer";
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (err) {
    console.error("Error reading users from storage:", err);
    return DEFAULT_USERS;
  }
}

export function saveUsers(users: UserAccount[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error("Error saving users to storage:", err);
  }
}

export function addUser(user: Omit<UserAccount, "id" | "createdAt">): UserAccount {
  const users = getUsers();
  const newUser: UserAccount = {
    ...user,
    id: `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
  const updated = [newUser, ...users];
  saveUsers(updated);
  return newUser;
}

export function deleteUser(id: string) {
  const users = getUsers();
  // Prevent deleting super admin
  const filtered = users.filter((u) => u.id !== id && u.email !== "kodetocareer@gmail.com");
  saveUsers(filtered);
}

export function authenticateUser(email: string, pass: string, role: RoleType): UserAccount | null {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();
  
  const found = users.find(
    (u) =>
      u.email.trim().toLowerCase() === normalizedEmail &&
      u.password === pass &&
      u.role === role
  );

  return found || null;
}

export type RoleType = "super_admin" | "trainer" | "student";
