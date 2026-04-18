import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  FileText,
  CreditCard,
  User,
  Settings,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  productCategories,
  solutionLinks,
  solutionGroups,
  resourceLinks,
  aboutLinks,
} from "@/lib/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    setActiveMega(null);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleMegaEnter = (key: string) => {
    clearTimeout(megaTimeout.current);
    setActiveMega(key);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 60);
  };

  const handleNavClick = (href: string) => {
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
    setActiveMega(null);
  };

  const displayName =
    user?.name?.trim() || user?.email?.split("@")[0] || user?.sub?.trim() || "Account";

  const getInitials = (name?: string | null, emailOrSub?: string | null) => {
    if (name?.trim()) {
      const parts = name.trim().split(/\s+/);
      if (parts.length > 1) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    if (emailOrSub?.trim()) return emailOrSub.trim().substring(0, 2).toUpperCase();
    return "U";
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/93 text-foreground backdrop-blur-xl">
      <div className="container mx-auto max-w-7xl min-w-0 px-4">
        <div className="flex h-16 min-w-0 items-center justify-between gap-2">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex-shrink-0"
          >
            <img
              src="/verifystack-logo.svg"
              alt="VerifyStack"
              className="h-9 w-auto max-w-[min(200px,46vw)] object-contain sm:h-11 sm:max-w-none"
            />
          </Link>

          {/* ── Desktop Navigation ──────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5">

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMegaEnter("products")}
              onMouseLeave={handleMegaLeave}
            >
              <Button variant="ghost" size="sm"
                className="flex items-center gap-1 text-[13px] font-medium text-muted-foreground hover:text-foreground px-3"
              >
                Products
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeMega === "products" && "rotate-180")} />
              </Button>

              {activeMega === "products" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50">
                  <div className="w-[520px] bg-card border border-border rounded-2xl shadow-2xl p-5 animate-fade-in">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-4 px-1">
                      Verification Products
                    </p>
                    <div className="space-y-2">
                      {productCategories.map((cat) => (
                        <button
                          key={cat.href}
                          onClick={() => handleNavClick(cat.href)}
                          className="group/card flex items-center gap-3 w-full p-3 rounded-xl border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 text-left"
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/card:bg-primary/20 transition-colors">
                            <cat.icon className="w-4.5 h-4.5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground">{cat.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug truncate">{cat.description}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover/card:text-primary group-hover/card:translate-x-0.5 transition-all flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMegaEnter("solutions")}
              onMouseLeave={handleMegaLeave}
            >
              <Button variant="ghost" size="sm"
                className="flex items-center gap-1 text-[13px] font-medium text-muted-foreground hover:text-foreground px-3"
              >
                Solutions
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeMega === "solutions" && "rotate-180")} />
              </Button>

              {activeMega === "solutions" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50">
                  <div className="w-[540px] bg-card border border-border rounded-2xl shadow-2xl p-5 animate-fade-in">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-4 px-1">
                      Verification Solutions
                    </p>
                    <div className="space-y-2">
                      {solutionLinks.map((sol) => (
                        <button
                          key={sol.href}
                          onClick={() => handleNavClick(sol.href)}
                          className="group/card flex items-center gap-3 w-full p-3 rounded-xl border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 text-left"
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/card:bg-primary/20 transition-colors">
                            <sol.icon className="w-4.5 h-4.5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground">{sol.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug truncate">{sol.description}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover/card:text-primary group-hover/card:translate-x-0.5 transition-all flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Use Cases Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMegaEnter("usecases")}
              onMouseLeave={handleMegaLeave}
            >
              <Button variant="ghost" size="sm"
                className="flex items-center gap-1 text-[13px] font-medium text-muted-foreground hover:text-foreground px-3"
              >
                Use Cases
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeMega === "usecases" && "rotate-180")} />
              </Button>

              {activeMega === "usecases" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50">
                  <div className="w-[860px] bg-card border border-border rounded-2xl shadow-2xl p-6 animate-fade-in">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-5 px-1">
                      Browse by Category
                    </p>
                    <div className="grid grid-cols-4 gap-6">
                      {solutionGroups.map((group) => (
                        <div key={group.href}>
                          <button
                            onClick={() => handleNavClick(group.href)}
                            className="flex items-center gap-2 text-[13px] font-semibold text-foreground hover:text-primary transition-colors w-full text-left mb-2"
                          >
                            <group.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            {group.title}
                          </button>
                          <div className="w-full h-px bg-border mb-3" />
                          <div className="space-y-0.5">
                            {group.useCases.map((uc) => (
                              <button
                                key={uc.href + group.href}
                                onClick={() => handleNavClick(uc.href)}
                                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground py-1 w-full text-left transition-colors group/uc"
                              >
                                <ChevronRight className="w-3 h-3 flex-shrink-0 text-primary/50 group-hover/uc:text-primary transition-colors" />
                                <span>{uc.label}</span>
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={() => handleNavClick(group.href)}
                            className="mt-3 text-xs text-primary hover:underline flex items-center gap-1 font-medium"
                          >
                            View all <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing */}
            <button
              onClick={() => handleNavClick("/pricing")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200",
                isActive("/pricing") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Pricing
            </button>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMegaEnter("resources")}
              onMouseLeave={handleMegaLeave}
            >
              <Button variant="ghost" size="sm"
                className="flex items-center gap-1 text-[13px] font-medium text-muted-foreground hover:text-foreground px-3"
              >
                Resources
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeMega === "resources" && "rotate-180")} />
              </Button>

              {activeMega === "resources" && (
                <div className="absolute top-full left-0 pt-2.5 z-50">
                  <div className="w-56 bg-card border border-border rounded-xl shadow-2xl py-2 animate-fade-in">
                    {resourceLinks.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <link.icon className="w-3.5 h-3.5 flex-shrink-0 text-primary/70" />
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMegaEnter("about")}
              onMouseLeave={handleMegaLeave}
            >
              <Button variant="ghost" size="sm"
                className="flex items-center gap-1 text-[13px] font-medium text-muted-foreground hover:text-foreground px-3"
              >
                About Us
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeMega === "about" && "rotate-180")} />
              </Button>

              {activeMega === "about" && (
                <div className="absolute top-full right-0 pt-2.5 z-50">
                  <div className="w-52 bg-card border border-border rounded-xl shadow-2xl py-2 animate-fade-in">
                    {aboutLinks.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <link.icon className="w-3.5 h-3.5 flex-shrink-0 text-primary/70" />
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* ── Desktop CTA ──────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Avatar className="w-7 h-7">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {getInitials(user?.name, user?.email || user?.sub)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{displayName}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 mr-2" />Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/dashboard/reports">
                    <DropdownMenuItem className="cursor-pointer">
                      <FileText className="w-4 h-4 mr-2" />Reports
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/dashboard/payments">
                    <DropdownMenuItem className="cursor-pointer">
                      <CreditCard className="w-4 h-4 mr-2" />Payments
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/dashboard/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/dashboard/settings">
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" />Settings
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-[13px]">Login</Button>
                </Link>
                <Link to="/run-check">
                  <Button size="sm" className="text-[13px] btn-glow">Get Started Free</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ───────────────────────────────────────────────── */}
        {isMenuOpen && (
          <div className="lg:hidden py-3 border-t border-border/50 animate-fade-in max-h-[80vh] overflow-y-auto bg-background/95">
            <nav className="flex flex-col gap-0.5">

              {/* Products */}
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "products" ? null : "products")}
                className="flex items-center justify-between px-3 py-3 text-sm font-medium text-foreground"
              >
                Products
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileExpanded === "products" && "rotate-180")} />
              </button>
              {mobileExpanded === "products" && (
                <div className="px-3 pb-3 space-y-2">
                  {productCategories.map((cat) => (
                    <button
                      key={cat.href}
                      onClick={() => handleNavClick(cat.href)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl border border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <cat.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{cat.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{cat.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Solutions */}
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "solutions" ? null : "solutions")}
                className="flex items-center justify-between px-3 py-3 text-sm font-medium text-foreground"
              >
                Solutions
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileExpanded === "solutions" && "rotate-180")} />
              </button>
              {mobileExpanded === "solutions" && (
                <div className="px-3 pb-3 space-y-2">
                  {solutionLinks.map((sol) => (
                    <button
                      key={sol.href}
                      onClick={() => handleNavClick(sol.href)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl border border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <sol.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{sol.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{sol.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Use Cases */}
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "usecases" ? null : "usecases")}
                className="flex items-center justify-between px-3 py-3 text-sm font-medium text-foreground"
              >
                Use Cases
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileExpanded === "usecases" && "rotate-180")} />
              </button>
              {mobileExpanded === "usecases" && (
                <div className="pl-3 pb-3 space-y-4">
                  {solutionGroups.map((group) => (
                    <div key={group.href}>
                      <button
                        onClick={() => handleNavClick(group.href)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-primary w-full text-left"
                      >
                        <group.icon className="w-3.5 h-3.5" />
                        {group.title}
                      </button>
                      <div className="pl-6 space-y-0.5">
                        {group.useCases.map((uc) => (
                          <button
                            key={uc.href + group.href}
                            onClick={() => handleNavClick(uc.href)}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground py-1.5 w-full text-left"
                          >
                            <ChevronRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                            {uc.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pricing */}
              <button
                onClick={() => handleNavClick("/pricing")}
                className={cn("px-3 py-3 text-sm text-left font-medium",
                  isActive("/pricing") ? "text-primary" : "text-muted-foreground"
                )}
              >
                Pricing
              </button>

              {/* Resources */}
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "resources" ? null : "resources")}
                className="flex items-center justify-between px-3 py-3 text-sm font-medium text-foreground"
              >
                Resources
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileExpanded === "resources" && "rotate-180")} />
              </button>
              {mobileExpanded === "resources" && (
                <div className="pl-6 pb-2 space-y-0.5">
                  {resourceLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground py-2 w-full text-left"
                    >
                      <link.icon className="w-3.5 h-3.5 text-primary/70" />
                      {link.label}
                    </button>
                  ))}
                </div>
              )}

              {/* About Us */}
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "about" ? null : "about")}
                className="flex items-center justify-between px-3 py-3 text-sm font-medium text-foreground"
              >
                About Us
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileExpanded === "about" && "rotate-180")} />
              </button>
              {mobileExpanded === "about" && (
                <div className="pl-6 pb-2 space-y-0.5">
                  {aboutLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground py-2 w-full text-left"
                    >
                      <link.icon className="w-3.5 h-3.5 text-primary/70" />
                      {link.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Auth CTA */}
              <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-border/50 px-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                        <LayoutDashboard className="w-4 h-4" />Dashboard
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm" className="w-full justify-start gap-2"
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                    >
                      <LogOut className="w-4 h-4" />Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">Login</Button>
                    </Link>
                    <Link to="/run-check" onClick={() => setIsMenuOpen(false)}>
                      <Button size="sm" className="w-full btn-glow">Get Started Free</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
