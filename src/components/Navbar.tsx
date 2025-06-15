
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  name: string;
  path: string;
  authRequired?: boolean;
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Market', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Learn', path: '/learn' },
    { name: 'Portfolio', path: '/portfolio', authRequired: true },
    { name: 'Alerts', path: '/alerts', authRequired: true },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when navigating
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-morphism-strong shadow-sm py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/8249fda5-44eb-4ad0-a142-a6cfbd792e31.png" alt="CoinCruncher Logo" className="h-10 w-auto" />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems
              .filter(item => !item.authRequired || isAuthenticated)
              .map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-crypto-red"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden sm:flex"
                    aria-label="User menu"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="font-normal text-sm text-muted-foreground">Signed in as</div>
                    <div className="font-medium truncate">{user?.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden sm:flex items-center space-x-4">
              <Link to="/auth?mode=login" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                Sign In
              </Link>
              <Button asChild>
                <Link to="/auth?mode=register">Sign Up</Link>
              </Button>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-morphism animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="flex sm:hidden"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex sm:hidden relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-crypto-red"></span>
                </Button>
              )}
            </div>
            
            <nav className="flex flex-col space-y-2">
              {navItems
                .filter(item => !item.authRequired || isAuthenticated)
                .map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
            </nav>
            
            {isAuthenticated ? (
              <div className="pt-2 border-t border-border">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 rounded-md text-sm font-medium hover:bg-muted"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 w-full text-left"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-border">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/auth?mode=login">Sign In</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/auth?mode=register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
