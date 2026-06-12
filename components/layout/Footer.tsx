import Image from "next/image";
import Link from "next/link";
import { footer, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-cream">
      <div className="container-editorial py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              aria-label="Ina J Education home"
              className="relative block h-14 w-full max-w-[21rem]"
            >
              <Image
                src="/brand/inajeducation-logo-dark.png"
                alt="Ina J Education, pet photography coaching"
                fill
                sizes="336px"
                className="object-contain object-left"
              />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/75">
              {footer.brand}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href={site.socials.instagram}
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition-colors hover:border-terracotta-soft hover:text-terracotta-soft"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <title>Instagram</title>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </Link>
              <Link
                href={site.socials.facebook}
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition-colors hover:border-terracotta-soft hover:text-terracotta-soft"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <title>Facebook</title>
                  <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4V14h2.7v8h3.4z" />
                </svg>
              </Link>
            </div>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-terracotta-soft">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-cream/75 transition-colors hover:text-cream"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-terracotta-soft">
              Reach out
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/75">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-cream">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="hover:text-cream"
                >
                  {site.phone}
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-8 text-xs text-cream/60 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {site.parent}. All rights reserved.
          </p>
          <p>
            <Link href={site.parentSite} className="hover:text-cream">
              inajphotography.com
            </Link>
            <span className="mx-3 text-cream/30">·</span>
            <span>
              Images and content © {new Date().getFullYear()} Ina J Photography
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
