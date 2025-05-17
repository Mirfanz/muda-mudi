import {
  RectangleGroupIcon,
  HomeIcon,
  UserIcon,
  BanknotesIcon,
  CalendarDateRangeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "MudaMudi",
  description:
    "Website resmi karang taruna dukuh Klumpit Kulon. Satukan Pemuda Majukan Desa.",
  navItems: [
    {
      label: "Beranda",
      href: "/",
      icon: HomeIcon,
      isActive: (path: string) => /^\/$/.test(path),
    },
    {
      label: "Keuangan",
      href: "/finance",
      icon: BanknotesIcon,
      isActive: (path: string) => /^\/finance/.test(path),
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
      label: "Anggota",
      href: "/admin/users",
      icon: UserGroupIcon,
      isActive: (path: string) => /^\/admin\/users/.test(path),
    },
    {
      label: "Keungan",
      href: "/admin/finance",
      icon: BanknotesIcon,
      isActive: (path: string) => /^\/admin\/finance/.test(path),
    },
    {
      label: "Donations",
      href: "/admin/donation",
      icon: HeartIcon,
      isActive: (path: string) => /^\/admin\/donation/.test(path),
    },
    {
      label: "Settings",
      href: "/admin/setting",
      icon: Cog6ToothIcon,
      isActive: (path: string) => /^\/admin\/setting/.test(path),
    },
    {
      label: "Keluar",
      href: "#",
      icon: ArrowLeftStartOnRectangleIcon,
      isActive: (path: string) => false,
    },
  ],
  links: {
    github: "https://github.com/mirfanz",
    instagram: "https://www.instagram.com/mirfanz_",
  },
};
