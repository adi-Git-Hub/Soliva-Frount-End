import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  ShoppingBag,
  User,
  LogOut,
  Menu,
  X,
  LogIn,
  UserPlus,
  KeyRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ApiStatusDot } from "@/components/shared/ApiStatusDot";
import { useSession } from "@/features/auth/hooks/useSession";
import { useLogout } from "@/features/auth/api";
import { selectCartCount, useCartStore } from "@/features/cart/store";
import { cn } from "@/lib/utils";

// Primary nav — visible on desktop as text links
const primaryLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/search", label: "Search" },
  { to: "/cart", label: "Cart" },
] as const;

// Auth links — shown when signed-out (mobile sheet + account dropdown)
const authLinks = [
  { to: "/login", label: "Sign in", icon: LogIn },
  { to: "/register", label: "Create account", icon: UserPlus },
  { to: "/forgot-password", label: "Forgot password", icon: KeyRound },
] as const;

export function Header() {
  const session = useSession();
  const cartCount = useCartStore(selectCartCount);
  const logout = useLogout();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQ.trim()) return;
    navigate({ to: "/search", search: { q: searchQ.trim() } });
    setSearchOpen(false);
    setSearchQ("");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="mt-8 flex flex-col">
              <p className="px-3 pb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Browse
              </p>
              <nav className="flex flex-col gap-0.5">
                {primaryLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-base text-foreground hover:bg-accent"
                    activeProps={{ className: "bg-accent" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <Separator className="my-4" />

              <p className="px-3 pb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Account
              </p>
              {session ? (
                <div className="flex flex-col gap-0.5">
                  <p className="px-3 py-2 text-xs text-muted-foreground">
                    Signed in as {session.user.email}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      logout.mutate();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-base text-foreground hover:bg-accent"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              ) : (
                <nav className="flex flex-col gap-0.5">
                  {authLinks.map((l) => {
                    const Icon = l.icon;
                    return (
                      <Link
                        key={l.to}
                        to={l.to}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-base text-foreground hover:bg-accent"
                      >
                        <Icon className="h-4 w-4" />
                        {l.label}
                      </Link>
                    );
                  })}
                </nav>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link
          to="/"
          className="font-display text-2xl tracking-tight text-foreground"
        >
          Soliva
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {primaryLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-sm text-foreground/80 transition-colors hover:text-foreground"
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{
                className: "text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-foreground",
              }}
            >
              {l.label}
              {l.to === "/cart" && cartCount > 0 && (
                <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right actions (icons for quick access) */}
        <div className="flex items-center gap-2">
          <ApiStatusDot />
          {/* Search overlay */}
          {searchOpen ? (
            <form onSubmit={onSearch} className="flex items-center gap-1">
              <Input
                autoFocus
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                onBlur={() => !searchQ && setSearchOpen(false)}
                placeholder="Search…"
                className="h-9 w-48"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* Account dropdown — shows every auth route when signed-out */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {session ? (
                <>
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                    Signed in as
                    <div className="truncate text-foreground">
                      {session.user.email}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => logout.mutate()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                    Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {authLinks.map((l) => {
                    const Icon = l.icon;
                    return (
                      <DropdownMenuItem key={l.to} asChild>
                        <Link to={l.to}>
                          <Icon className="mr-2 h-4 w-4" />
                          {l.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart icon (still useful as quick action even with /cart in nav) */}
          <Button variant="ghost" size="icon" asChild aria-label="Cart">
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span
                  className={cn(
                    "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground",
                  )}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
