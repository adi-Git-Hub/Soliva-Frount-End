import { Link } from "@tanstack/react-router";

const groups: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { to: "/products", label: "All products" },
      { to: "/categories", label: "Categories" },
      { to: "/search", label: "Search" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/login", label: "Sign in" },
      { to: "/register", label: "Create account" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/40 bg-background/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div>
          <Link
            to="/"
            className="font-display text-2xl tracking-tight text-foreground"
          >
            Soliva
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Considered objects for a quieter ritual.
          </p>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <h4 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {g.title}
            </h4>
            <ul className="space-y-2">
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 text-xs text-muted-foreground md:px-8">
          <span>© {new Date().getFullYear()} Soliva. All rights reserved.</span>
          <span>Made with care</span>
        </div>
      </div>
    </footer>
  );
}
