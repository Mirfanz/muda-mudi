import {
  HomeIcon,
  UserIcon,
  BanknotesIcon,
  CalendarDateRangeIcon,
} from "@heroicons/react/24/solid";

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
    },
    {
      label: "Keuangan",
      href: "/finance",
      icon: BanknotesIcon,
    },
    {
      label: "Acara",
      href: "/events",
      icon: CalendarDateRangeIcon,
    },
    {
      label: "Akun",
      href: "/account",
      icon: UserIcon,
    },
  ],
  links: {
    github: "https://github.com/mirfanz",
    instagram: "https://www.instagram.com/mirfanz_",
  },
};
