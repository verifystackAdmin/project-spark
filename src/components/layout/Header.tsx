import { useState } from "react";
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
import { Menu, X, Shield, ChevronDown, LayoutDashboard, LogOut, FileCheck, Building, BarChart, FileText, CreditCard, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { href: "/use-cases", label: "Use Cases" },
    { href: "/pricing", label: "Pricing" },
    { href: "/api-docs", label: "API Docs" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const productLinks = [
    { href: "/document-verification", label: "Individual Verification", icon: FileCheck },
    { href: "/business-verification", label: "Business Verification", icon: Building },
    { href: "/trust-score", label: "Trust Score", icon: BarChart },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const handleNavClick = (href: string) => {
    if (location.pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shield className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              VerifyStack
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
                  Product
                  <ChevronDown className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border">
                {productLinks.map((link) => (
                  <DropdownMenuItem key={link.href} onClick={() => handleNavClick(link.href)} className="cursor-pointer text-sm">
                    <link.icon className="w-4 h-4 mr-2" />
                    {link.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Avatar className="w-7 h-7">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{user?.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/dashboard"><DropdownMenuItem className="cursor-pointer"><LayoutDashboard className="w-4 h-4 mr-2" />Dashboard</DropdownMenuItem></Link>
                  <Link to="/reports"><DropdownMenuItem className="cursor-pointer"><FileText className="w-4 h-4 mr-2" />Reports</DropdownMenuItem></Link>
                  <Link to="/payments"><DropdownMenuItem className="cursor-pointer"><CreditCard className="w-4 h-4 mr-2" />Payments</DropdownMenuItem></Link>
                  <Link to="/profile"><DropdownMenuItem className="cursor-pointer"><User className="w-4 h-4 mr-2" />Profile</DropdownMenuItem></Link>
                  <Link to="/settings"><DropdownMenuItem className="cursor-pointer"><Settings className="w-4 h-4 mr-2" />Settings</DropdownMenuItem></Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-xs">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="text-xs btn-glow">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-1">
              <div className="px-3 py-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">Product</div>
              {productLinks.map((link) => (
                <button key={link.href} onClick={() => handleNavClick(link.href)}
                  className="px-6 py-2.5 text-sm text-muted-foreground hover:text-foreground text-left flex items-center gap-2">
                  <link.icon className="w-4 h-4" />{link.label}
                </button>
              ))}
              <div className="px-3 py-2 text-xs font-mono text-muted-foreground uppercase tracking-wider mt-2">Navigation</div>
              {navLinks.map((link) => (
                <button key={link.href} onClick={() => handleNavClick(link.href)}
                  className={cn("px-3 py-2.5 text-sm text-left rounded-lg",
                    isActive(link.href) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground")}>
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border/50">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2" size="sm"><LayoutDashboard className="w-4 h-4" />Dashboard</Button>
                    </Link>
                    <Button variant="destructive" size="sm" className="w-full justify-start gap-2" onClick={() => { logout(); setIsMenuOpen(false); }}>
                      <LogOut className="w-4 h-4" />Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}><Button variant="outline" size="sm" className="w-full">Login</Button></Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}><Button size="sm" className="w-full">Sign Up</Button></Link>
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
