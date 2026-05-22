import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Package,
  Heart,
  Settings,
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
import { SolivaLogo } from "@/components/SolivaLogo";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQ.trim()) return;
    navigate({ to: "/search", search: { q: searchQ.trim() } });
    setSearchOpen(false);
    setSearchQ("");
  }

  // Helper to get user initials for the luxury badge
  const getUserInitials = () => {
    if (!session?.user?.name) return "??";
    return session.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        // Glassmorphism shell: frosted translucent surface, saturated backdrop,
        // hairline white inset highlight, soft warm border, atmospheric shadow.
        // The ::before / ::after layers below add the sheen + bottom highlight.
        "group/header sticky top-0 z-40 w-full transition-all duration-500 ease-in-out safe-x",
        "border-b backdrop-saturate-150",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:via-white/5 before:to-transparent before:opacity-90",
        "after:pointer-events-none after:absolute after:inset-x-6 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent",
        "shadow-[0_8px_24px_-12px_rgba(58,42,34,0.18),inset_0_1px_0_rgba(255,255,255,0.45)]",
        isScrolled
          ? "h-14 bg-luxury-beige/55 backdrop-blur-2xl border-white/30"
          : "h-16 sm:h-20 bg-luxury-beige/35 backdrop-blur-xl border-white/20"
      )}
    >
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-3 sm:px-4 md:px-8">
        {/* Mobile menu */}
        <div className="flex items-center md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-transparent" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(20rem,85vw)] bg-background/95 backdrop-blur-2xl">
              <div className="mt-8 flex flex-col">
                <p className="px-3 pb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground opacity-60">
                  Navigation
                </p>
                <nav className="flex flex-col gap-1">
                  {primaryLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setMobileOpen(false)}
                      className="group relative rounded-xl px-3 py-3 text-base font-light text-foreground transition-all hover:bg-accent/50"
                      activeProps={{ className: "bg-accent font-medium" }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>

                <Separator className="my-6 opacity-40" />

                <p className="px-3 pb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground opacity-60">
                  Account
                </p>
                {session ? (
                  <div className="flex flex-col gap-1">
                    <p className="px-3 py-2 text-xs text-muted-foreground italic">
                      Signed in as {session.user.email}
                    </p>
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-base font-light text-foreground transition-all hover:bg-accent/50"
                    >
                      <User className="h-4 w-4 opacity-70" />
                      My Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout.mutate();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-base font-light text-foreground transition-all hover:bg-accent/50"
                    >
                      <LogOut className="h-4 w-4 opacity-70" />
                      Sign out
                    </button>
                  </div>
                ) : (
                  <nav className="flex flex-col gap-1">
                    {authLinks.map((l) => {
                      const Icon = l.icon;
                      return (
                        <Link
                          key={l.to}
                          to={l.to}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-light text-foreground transition-all hover:bg-accent/50"
                        >
                          <Icon className="h-4 w-4 opacity-70" />
                          {l.label}
                        </Link>
                      );
                    })}
                  </nav>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0"
        >
          <Link to="/" className="inline-flex items-center" aria-label="Soliva — home">
            <SolivaLogo
              height={isScrolled ? 28 : 32}
              className="transition-all duration-500 md:hidden"
            />
            <SolivaLogo
              size={isScrolled ? 90 : 110}
              className="hidden transition-all duration-500 md:inline-flex"
            />
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-10 md:flex">
          {primaryLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group relative text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/60 transition-all duration-500 hover:text-foreground hover:-translate-y-0.5"
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{
                className: "text-foreground",
              }}
            >
              <span>{l.label}</span>
              {/* Animated underline */}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-orange-glow transition-all duration-500 ease-out group-hover:w-full" />
              
              {l.to === "/cart" && cartCount > 0 && (
                <span className="absolute -right-5 -top-1 inline-flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-orange-glow px-1 text-[8px] font-black text-white shadow-[0_0_10px_rgba(245,130,13,0.4)]">
                  {cartCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right actions (icons for quick access) */}
        <div className="flex items-center gap-1 sm:gap-3">
          <div className="hidden md:block">
            <ApiStatusDot />
          </div>

          {/* Search overlay */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {searchOpen && (
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "min(60vw, 200px)", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  onSubmit={onSearch}
                  className="absolute right-0 flex items-center gap-1 overflow-hidden"
                >
                  <Input
                    autoFocus
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    onBlur={() => !searchQ && setSearchOpen(false)}
                    placeholder="Search…"
                    className="h-8 rounded-full border-border/40 bg-white/5 pr-8 text-xs focus:ring-0 transition-all"
                  />
                  <button 
                    type="button" 
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {!searchOpen && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-white/40 hover:backdrop-blur-md hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] hover:text-foreground transition-all"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" />
              </motion.button>
            )}
          </div>

          {/* Account dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-foreground/70 hover:bg-white/40 hover:backdrop-blur-md hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] hover:text-foreground transition-all"
                aria-label="Account"
              >
                {session ? (
                  <div className="h-5 w-5 rounded-full bg-orange-glow/10 border border-orange-glow/20 flex items-center justify-center text-[9px] font-black text-orange-glow uppercase shadow-sm">
                    {getUserInitials()}
                  </div>
                ) : (
                  <User className="h-[18px] w-[18px]" />
                )}
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              collisionPadding={12}
              className="w-[min(18rem,calc(100vw-1.5rem))] rounded-[2rem] bg-background/95 backdrop-blur-2xl border-border/40 shadow-2xl p-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(245,130,13,0.03),transparent_40%)] pointer-events-none" />
              
              {session ? (
                <>
                  <DropdownMenuLabel className="px-4 py-4 mb-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground uppercase font-bold">Authenticated Member</span>
                      <div className="truncate font-display text-lg text-brown-deep italic">{session.user.name}</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-brown/10 mb-2" />
                  
                  <div className="grid gap-1">
                    <DropdownMenuItem asChild className="rounded-xl px-4 py-3 focus:bg-white/40 transition-all cursor-pointer group">
                      <Link to="/profile" className="flex items-center w-full">
                        <User className="mr-3 h-4 w-4 text-brown/40 group-hover:text-orange-glow transition-colors" />
                        <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-brown/70 group-hover:text-brown-deep">My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl px-4 py-3 focus:bg-white/40 transition-all cursor-pointer group">
                      <Link to="/profile" className="flex items-center w-full">
                        <Package className="mr-3 h-4 w-4 text-brown/40 group-hover:text-orange-glow transition-colors" />
                        <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-brown/70 group-hover:text-brown-deep">Orders</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl px-4 py-3 focus:bg-white/40 transition-all cursor-pointer group">
                      <Link to="/profile" className="flex items-center w-full">
                        <Heart className="mr-3 h-4 w-4 text-brown/40 group-hover:text-orange-glow transition-colors" />
                        <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-brown/70 group-hover:text-brown-deep">Wishlist</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl px-4 py-3 focus:bg-white/40 transition-all cursor-pointer group">
                      <Link to="/profile" className="flex items-center w-full">
                        <Settings className="mr-3 h-4 w-4 text-brown/40 group-hover:text-orange-glow transition-colors" />
                        <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-brown/70 group-hover:text-brown-deep">Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="bg-brown/10 my-2" />
                  <DropdownMenuItem onSelect={() => logout.mutate()} className="rounded-xl px-4 py-3 focus:bg-red-500/5 transition-all cursor-pointer group text-red-500/60">
                    <LogOut className="mr-3 h-4 w-4 opacity-70 group-hover:opacity-100" />
                    <span className="font-mono text-[9px] tracking-widest uppercase font-bold">Sign out</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground opacity-60">
                    Account Access
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-brown/10 mb-2" />
                  {authLinks.map((l) => {
                    const Icon = l.icon;
                    return (
                      <DropdownMenuItem key={l.to} asChild className="rounded-xl px-4 py-3 focus:bg-accent transition-all cursor-pointer group">
                        <Link to={l.to} className="flex items-center w-full">
                          <Icon className="mr-3 h-4 w-4 text-brown/40 group-hover:text-orange-glow transition-colors" />
                          <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-brown/70 group-hover:text-brown-deep">{l.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" size="icon" asChild className="relative h-10 w-10 rounded-full hover:bg-white/40 hover:backdrop-blur-md hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]" aria-label="Cart">
              <Link to="/cart">
                <ShoppingBag className="h-[18px] w-[18px] text-foreground/70" />
                {cartCount > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-orange-glow px-1 text-[8px] font-black text-white shadow-[0_0_10px_rgba(245,130,13,0.5)]">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
