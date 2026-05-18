import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut, 
  ChevronRight, 
  CreditCard, 
  Bell, 
  ShieldCheck,
  Plus
} from "lucide-react";
import { useSession } from "@/features/auth/hooks/useSession";
import { useLogout } from "@/features/auth/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SolivaLogo } from "@/components/SolivaLogo";
import { ProductCard } from "@/features/catalog/components/ProductCard";
import { useProducts } from "@/features/catalog/api";

export const Route = createFileRoute("/_public/profile")({
  component: ProfilePage,
});

type Tab = "overview" | "orders" | "wishlist" | "addresses" | "settings";

function ProfilePage() {
  const session = useSession();
  const navigate = useNavigate();
  const logout = useLogout();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { data: products = [] } = useProducts({ limit: 4 });

  useEffect(() => {
    if (!session) {
      navigate({ to: "/login" });
    }
  }, [session, navigate]);

  if (!session) return null;

  const sidebarLinks = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-luxury-beige pt-32 pb-24 z-10">
      {/* Background Mesh (Global Consistency) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.04),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(252,231,243,0.5),transparent_60%)] opacity-80" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_70%_80%,rgba(243,236,226,1),transparent_50%),radial-gradient(circle_at_30%_90%,rgba(245,130,13,0.06),transparent_40%)] opacity-70" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          
          {/* LEFT SIDEBAR: LUXURY NAVIGATION PANEL */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-80 flex-shrink-0 bg-white/10 border border-brown/5 rounded-[3rem] p-8 backdrop-blur-md shadow-sm"
          >
            <div className="flex flex-col items-center text-center mb-10">
              <div className="relative mb-4 group">
                <div className="h-24 w-24 rounded-full bg-cream border border-brown/10 flex items-center justify-center overflow-hidden shadow-inner group-hover:shadow-lg transition-all duration-500">
                  <User className="h-10 w-10 text-brown/40" />
                </div>
                <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-orange-glow border-2 border-white flex items-center justify-center shadow-sm">
                  <ShieldCheck className="h-3 w-3 text-white" />
                </div>
              </div>
              <h2 className="font-display text-2xl text-brown-deep tracking-tight font-bold">{session.user.name}</h2>
              <p className="text-xs font-mono text-brown/50 tracking-widest uppercase mt-1">{session.user.role} member</p>
            </div>

            <nav className="flex flex-col gap-2">
              {sidebarLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 group ${
                    activeTab === link.id 
                      ? "bg-white/40 text-brown-deep shadow-sm border border-brown/5" 
                      : "text-brown/60 hover:bg-white/20 hover:text-brown-deep"
                  }`}
                >
                  <link.icon className={`h-4 w-4 ${activeTab === link.id ? "text-orange-glow" : "opacity-70 group-hover:opacity-100"}`} />
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold">{link.label}</span>
                  {activeTab === link.id && (
                    <motion.div layoutId="tab-indicator" className="ml-auto">
                      <ChevronRight className="h-3 w-3 text-orange-glow" />
                    </motion.div>
                  )}
                </button>
              ))}
              
              <Separator className="my-4 bg-brown/10" />
              
              <button
                onClick={() => logout.mutate()}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl text-brown/60 hover:bg-red-500/5 hover:text-red-500 transition-all duration-500 group"
              >
                <LogOut className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold">Sign out</span>
              </button>
            </nav>
          </motion.aside>

          {/* RIGHT CONTENT AREA: DYNAMIC MODULES */}
          <main className="flex-1 w-full min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    <header className="mb-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="block h-px w-6 bg-brown/20" />
                        <span className="font-mono text-[10px] tracking-[0.6em] text-orange-glow uppercase font-bold">
                          DASHBOARD
                        </span>
                      </div>
                      <h1 className="font-display text-4xl md:text-6xl text-brown-deep tracking-tight leading-none">
                        Welcome back, <br />
                        <span className="italic font-serif text-orange-glow">{session.user.name.split(" ")[0]}</span>.
                      </h1>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {[
                        { label: "Active Orders", value: "01", icon: Package },
                        { label: "Wishlist Items", value: "04", icon: Heart },
                        { label: "Saved Addresses", value: "02", icon: MapPin },
                      ].map((stat, i) => (
                        <div key={i} className="bg-white/10 border border-brown/5 rounded-[2.5rem] p-8 backdrop-blur-md shadow-sm group hover:-translate-y-1 transition-all duration-500">
                          <stat.icon className="h-5 w-5 text-orange-glow/60 mb-4" />
                          <div className="font-mono text-3xl text-brown-deep font-black mb-1">{stat.value}</div>
                          <div className="font-mono text-[8px] tracking-[0.2em] text-brown/60 uppercase font-bold">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white/10 border border-brown/5 rounded-[3rem] p-10 backdrop-blur-md shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="font-display text-2xl text-brown-deep tracking-tight">Recent activity</h3>
                        <Button variant="link" className="text-orange-glow p-0 h-auto font-mono text-[9px] tracking-widest uppercase">View all</Button>
                      </div>
                      <div className="space-y-6">
                        {[1, 2].map((_, i) => (
                          <div key={i} className="flex items-center gap-6 p-4 rounded-2xl bg-white/20 border border-brown/5">
                            <div className="h-12 w-12 rounded-xl bg-cream flex items-center justify-center">
                              <Package className="h-5 w-5 text-brown/30" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-bold text-brown-deep uppercase tracking-wide">Order #SLV-26001</span>
                                <span className="text-[10px] font-mono text-orange-glow font-bold uppercase">Processing</span>
                              </div>
                              <p className="text-xs text-brown/60 italic">Ordered 2 days ago • 1 item • ₹1,299.00</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="space-y-8">
                    <header className="mb-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="block h-px w-6 bg-brown/20" />
                        <span className="font-mono text-[10px] tracking-[0.6em] text-orange-glow uppercase font-bold">
                          SYSTEM ARCHIVE
                        </span>
                      </div>
                      <h1 className="font-display text-4xl md:text-6xl text-brown-deep tracking-tight leading-none">Order history</h1>
                    </header>

                    <div className="space-y-6">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="bg-white/10 border border-brown/5 rounded-[3rem] p-8 md:p-12 backdrop-blur-md shadow-sm group">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-brown/10">
                            <div className="flex flex-col gap-1">
                              <span className="font-mono text-[9px] tracking-[0.2em] text-brown/50 uppercase font-bold">Ref: SLV-2600{i + 1}</span>
                              <span className="font-display text-xl text-brown-deep italic">Placed on May 1{i}, 2026</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right flex flex-col items-end">
                                <span className="font-mono text-[9px] tracking-[0.2em] text-brown/50 uppercase font-bold">Total</span>
                                <span className="font-display text-xl text-brown-deep font-bold">₹1,299.00</span>
                              </div>
                              <div className="px-4 py-1.5 rounded-full bg-orange-glow/10 border border-orange-glow/20 text-orange-glow font-mono text-[9px] font-black uppercase tracking-widest">
                                {i === 0 ? "Delivered" : "In Transit"}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="h-24 w-20 rounded-2xl overflow-hidden bg-cream border border-brown/5 flex-shrink-0">
                              <img src="/pink.png" alt="Product" className="h-full w-full object-contain p-2 mix-blend-multiply opacity-80" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-display text-xl text-brown-deep font-bold tracking-tight mb-1 uppercase">Soliva Sunwrap 01</h4>
                              <p className="text-xs text-brown/60 italic max-w-sm mb-4">Edition 01 — Blush Pink / Universal Size</p>
                              <Button variant="outline" className="rounded-full h-8 text-[9px] tracking-widest uppercase border-brown/20 text-brown/60 hover:text-brown-deep">Track package</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "wishlist" && (
                  <div className="space-y-8">
                    <header className="mb-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="block h-px w-6 bg-brown/20" />
                        <span className="font-mono text-[10px] tracking-[0.6em] text-orange-glow uppercase font-bold">
                          SAVED SELECTIONS
                        </span>
                      </div>
                      <h1 className="font-display text-4xl md:text-6xl text-brown-deep tracking-tight leading-none">Your wishlist</h1>
                    </header>

                    {products.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                        {products.map((p) => (
                          <div key={p.id} className="bg-white/10 border border-brown/5 rounded-[3rem] p-6 backdrop-blur-md group">
                            <ProductCard product={p} />
                            <div className="mt-4 pt-4 border-t border-brown/10 flex justify-between items-center">
                              <Button variant="ghost" className="text-red-500/60 hover:text-red-500 p-0 h-auto font-mono text-[8px] tracking-widest uppercase">Remove</Button>
                              <Button className="rounded-full bg-brown-deep text-white px-6 h-9 text-[9px] tracking-widest uppercase">Move to cart</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white/10 border border-brown/5 rounded-[3rem] p-20 backdrop-blur-md shadow-sm text-center">
                        <Heart className="h-12 w-12 text-brown/20 mx-auto mb-6" />
                        <h3 className="font-display text-2xl text-brown-deep italic mb-2">Nothing saved yet</h3>
                        <p className="text-sm text-brown/50 mb-8 max-w-xs mx-auto italic">Browse our collections to find your favorite editions.</p>
                        <Button asChild className="rounded-full bg-brown-deep text-white px-10 py-6 uppercase font-bold tracking-[0.2em] text-[10px]">
                          <Link to="/products">Explore collection</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "addresses" && (
                  <div className="space-y-8">
                    <header className="mb-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="block h-px w-6 bg-brown/20" />
                        <span className="font-mono text-[10px] tracking-[0.6em] text-orange-glow uppercase font-bold">
                          SAVED NODES
                        </span>
                      </div>
                      <h1 className="font-display text-4xl md:text-6xl text-brown-deep tracking-tight leading-none">Addresses</h1>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: "Home", addr: "42, Shanti Niketan, New Delhi, 110021" },
                        { label: "Work", addr: "Atelier SOLIVA, Level 4, DLF Cyber City, Gurgaon" }
                      ].map((addr, i) => (
                        <div key={i} className="bg-white/10 border border-brown/5 rounded-[2.5rem] p-8 backdrop-blur-md shadow-sm group">
                          <div className="flex items-start justify-between mb-4">
                            <div className="h-10 w-10 rounded-2xl bg-cream flex items-center justify-center">
                              <MapPin className="h-4 w-4 text-brown/40" />
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" className="text-brown/40 hover:text-brown-deep p-0 h-auto font-mono text-[8px] tracking-widest uppercase">Edit</Button>
                            </div>
                          </div>
                          <h4 className="font-mono text-[10px] tracking-[0.2em] text-brown-deep uppercase font-black mb-2">{addr.label}</h4>
                          <p className="text-sm text-brown/70 leading-relaxed font-light italic">{addr.addr}</p>
                        </div>
                      ))}
                      <button className="bg-white/5 border border-dashed border-brown/20 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 group hover:bg-white/10 transition-all duration-500">
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Plus className="h-4 w-4 text-brown/40" />
                        </div>
                        <span className="font-mono text-[9px] tracking-[0.3em] text-brown/60 uppercase font-bold">Add new address</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-8">
                    <header className="mb-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="block h-px w-6 bg-brown/20" />
                        <span className="font-mono text-[10px] tracking-[0.6em] text-orange-glow uppercase font-bold">
                          CALIBRATION
                        </span>
                      </div>
                      <h1 className="font-display text-4xl md:text-6xl text-brown-deep tracking-tight leading-none">Settings</h1>
                    </header>

                    <div className="bg-white/10 border border-brown/5 rounded-[3rem] p-10 md:p-14 backdrop-blur-md shadow-sm">
                      <form className="space-y-12">
                        <section className="space-y-8">
                          <h3 className="font-mono text-[11px] tracking-[0.4em] text-brown/40 uppercase font-black">Personal Info</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <label className="font-mono text-[9px] tracking-widest text-brown/60 uppercase font-bold ml-4">Full Name</label>
                              <Input defaultValue={session.user.name} className="h-14 rounded-full border-brown/10 bg-white/5 px-8 text-brown-deep placeholder:text-brown/20 focus:border-orange-glow transition-all" />
                            </div>
                            <div className="space-y-3">
                              <label className="font-mono text-[9px] tracking-widest text-brown/60 uppercase font-bold ml-4">Email Address</label>
                              <Input defaultValue={session.user.email} className="h-14 rounded-full border-brown/10 bg-white/5 px-8 text-brown-deep placeholder:text-brown/20 focus:border-orange-glow transition-all" />
                            </div>
                          </div>
                        </section>

                        <section className="space-y-8">
                          <h3 className="font-mono text-[11px] tracking-[0.4em] text-brown/40 uppercase font-black">Security</h3>
                          <div className="space-y-3 max-w-md">
                            <label className="font-mono text-[9px] tracking-widest text-brown/60 uppercase font-bold ml-4">Current Password</label>
                            <Input type="password" placeholder="••••••••" className="h-14 rounded-full border-brown/10 bg-white/5 px-8 text-brown-deep placeholder:text-brown/20 focus:border-orange-glow transition-all" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <label className="font-mono text-[9px] tracking-widest text-brown/60 uppercase font-bold ml-4">New Password</label>
                              <Input type="password" placeholder="••••••••" className="h-14 rounded-full border-brown/10 bg-white/5 px-8 text-brown-deep placeholder:text-brown/20 focus:border-orange-glow transition-all" />
                            </div>
                            <div className="space-y-3">
                              <label className="font-mono text-[9px] tracking-widest text-brown/60 uppercase font-bold ml-4">Confirm Password</label>
                              <Input type="password" placeholder="••••••••" className="h-14 rounded-full border-brown/10 bg-white/5 px-8 text-brown-deep placeholder:text-brown/20 focus:border-orange-glow transition-all" />
                            </div>
                          </div>
                        </section>

                        <div className="pt-8 flex justify-end">
                          <Button className="rounded-full bg-brown-deep text-white px-12 py-7 uppercase font-bold tracking-[0.2em] text-[11px] shadow-lg hover:bg-brown hover:shadow-xl transition-all duration-500">
                            Save changes
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
