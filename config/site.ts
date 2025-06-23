import {
  RectangleGroupIcon,
  UserIcon,
  BanknotesIcon,
  CalendarDateRangeIcon,
  UserGroupIcon,
  HeartIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "PEMOEDA",
  description:
    "Website resmi karang taruna dukuh Klumpit Kulon. Satukan Pemuda Majukan Desa.",
  navItems: [
    {
      label: "Beranda",
      href: "/",
      icon: RectangleStackIcon,
      isActive: (path: string) => /^\/$/.test(path),
    },
    {
      label: "Keuangan",
      href: "/finance",
      icon: BanknotesIcon,
      isActive: (path: string) => /^\/finance/.test(path),
    },
    {
      label: "Donation",
      href: "/donation",
      icon: HeartIcon,
      isActive: (path: string) => /^\/donation/.test(path),
    },
    {
      label: "Acara",
      href: "/events",
      icon: CalendarDateRangeIcon,
      isActive: (path: string) => /^\/event/.test(path),
    },
    {
      label: "Akun",
      href: "/account",
      icon: UserIcon,
      isActive: (path: string) => /^\/account/.test(path),
    },
  ],
  sidebarItems: [
    {
      label: "Dashboard",
      href: "/admin",
      icon: RectangleGroupIcon,
      isActive: (path: string) => /^\/admin$/.test(path),
    },
    {
      label: "Keanggotaan",
      href: "/admin/users",
      icon: UserGroupIcon,
      isActive: (path: string) => /^\/admin\/users/.test(path),
    },
    {
      label: "Schedule Acara",
      href: "/admin/events",
      icon: CalendarDateRangeIcon,
      isActive: (path: string) => /^\/admin\/events/.test(path),
    },
    {
      label: "Kelola Keungan",
      href: "/admin/finance",
      icon: BanknotesIcon,
      isActive: (path: string) => /^\/admin\/finance/.test(path),
    },
  ],
  links: {
    github: "https://github.com/mirfanz",
    instagram: "https://www.instagram.com/mirfanz_",
  },
};
