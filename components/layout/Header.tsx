import { nav, site } from "@/lib/content";
import { HeaderClient } from "./HeaderClient";

export function Header() {
  return <HeaderClient bookingHref={site.bookingHref} links={nav} />;
}
