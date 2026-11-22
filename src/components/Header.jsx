import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Globe, Heart, LayoutDashboard, LogIn, LogOut, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useBrand } from '../context/BrandContext';

export const Header = () => {
  const {
    t,
    toggleLanguage,
    currentAdmin,
    language,
    currentCustomer,
    favoriteIds,
    logoutCustomer,
  } = useBrand();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderColor = () => setIsScrolled(window.scrollY > 24);

    updateHeaderColor();
    window.addEventListener('scroll', updateHeaderColor, { passive: true });
    return () => window.removeEventListener('scroll', updateHeaderColor);
  }, []);

  const navItems = [
    { to: '/', label: t.nav.home, end: true },
    { to: '/about', label: t.nav.story, end: false },
    { to: '/products', label: t.nav.products, end: false },
    { to: '/custom-design', label: t.nav.customDesign, end: false },
    { to: '/contact', label: t.nav.contact, end: false },
  ];

  // One entry point for everyone: guests see "Sign In" (the single shared login page),
  // administrators see their dashboard link, signed-in customers see favorites / sign out.
  const showAuthPill = Boolean(currentAdmin) || !currentCustomer;
  const authDestination = currentAdmin ? '/admin/dashboard' : '/login';
  const authLabel = currentAdmin ? t.nav.dashboard : t.nav.signIn;
  const authLinkState = currentAdmin ? undefined : { from: pathname };

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-500 ${
        isScrolled
          ? 'bg-[#640018] border-[#4A0011]'
          : 'bg-[#FFF7EB]/92 border-[#640018]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className={`text-base sm:text-lg lg:text-xl font-semibold tracking-tight whitespace-nowrap shrink-0 flex items-center gap-2 ${
            isScrolled ? 'text-[#FFF7EB]' : 'text-[#640018]'
          }`}
          style={{
            fontFamily:
              language === 'ar'
                ? '"Noto Kufi Arabic", "Playfair Display", serif'
                : '"Playfair Display", "Noto Kufi Arabic", serif',
          }}
        >
          <span>AL QERWIAH – القروية</span>
        </Link>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          className={`hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium ${
            isScrolled ? 'text-[#FFF7EB]/85' : 'text-[#2A0E14]/80'
          }`}
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? `${isScrolled ? 'text-[#FFF7EB]' : 'text-[#640018]'} font-semibold after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[1.5px] ${
                        isScrolled ? 'after:bg-[#FEDEA3]' : 'after:bg-[#640018]'
                      }`
                    : isScrolled
                      ? 'hover:text-[#FEDEA3]'
                      : 'hover:text-[#640018]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Language Switcher & Admin Login / Dashboard */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleLanguage}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              isScrolled
                ? 'text-[#FFF7EB] border border-[#FFF7EB]/35 hover:border-[#FFF7EB]/70'
                : 'text-[#640018] border border-[#640018]/20 hover:border-[#640018]/50'
            }`}
            aria-label="Switch Language"
          >
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.nav.switchLangLabel}</span>
          </button>

          {currentCustomer ? (
            <>
              <NavLink
                to="/favorites"
                aria-label={t.nav.myFavorites}
                className={({ isActive }) =>
                  `relative inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-full transition-colors whitespace-nowrap shrink-0 border ${
                    isScrolled
                      ? `text-[#FFF7EB] ${isActive ? 'border-[#FEDEA3]' : 'border-[#FFF7EB]/35 hover:border-[#FFF7EB]/70'}`
                      : `text-[#640018] ${isActive ? 'border-[#640018]' : 'border-[#640018]/20 hover:border-[#640018]/50'}`
                  }`
                }
              >
                <Heart
                  className={`w-3.5 h-3.5 ${favoriteIds.length > 0 ? 'fill-current' : ''}`}
                  aria-hidden="true"
                />
                <span className="hidden lg:inline">{t.nav.myFavorites}</span>
                {favoriteIds.length > 0 && (
                  <span
                    className={`min-w-[1.25rem] h-5 px-1 rounded-full text-[10px] leading-5 text-center tabular-nums ${
                      isScrolled ? 'bg-[#FEDEA3] text-[#4A0011]' : 'bg-[#640018] text-[#FFF7EB]'
                    }`}
                  >
                    {favoriteIds.length}
                  </span>
                )}
              </NavLink>
              <button
                type="button"
                onClick={logoutCustomer}
                aria-label={`${t.nav.signOut} (${currentCustomer.name})`}
                title={`${t.nav.signOut} (${currentCustomer.name})`}
                className={`w-9 h-9 inline-flex items-center justify-center rounded-full border transition-colors cursor-pointer shrink-0 ${
                  isScrolled
                    ? 'text-[#FFF7EB] border-[#FFF7EB]/35 hover:border-[#FFF7EB]/70'
                    : 'text-[#640018] border-[#640018]/20 hover:border-[#640018]/50'
                }`}
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </>
          ) : null}

          {showAuthPill && (
            <Link
              to={authDestination}
              state={authLinkState}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full transition-colors whitespace-nowrap shrink-0 shadow-sm ${
                isScrolled
                  ? 'bg-[#FFF7EB] text-[#640018] hover:bg-[#FEDEA3]'
                  : 'bg-[#640018] text-[#FFF7EB] hover:bg-[#4A0011]'
              }`}
            >
              {currentAdmin ? (
                <LayoutDashboard className="w-3.5 h-3.5 text-[#FEDEA3]" aria-hidden="true" />
              ) : (
                <LogIn className="w-3.5 h-3.5 text-[#FEDEA3]" aria-hidden="true" />
              )}
              <span>{authLabel}</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleLanguage}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-full cursor-pointer whitespace-nowrap ${
              isScrolled
                ? 'text-[#FFF7EB] border border-[#FFF7EB]/35'
                : 'text-[#640018] border border-[#640018]/20'
            }`}
            aria-label="Switch Language"
          >
            {t.nav.switchLangLabel}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`p-2 rounded-lg cursor-pointer ${
              isScrolled
                ? 'text-[#FFF7EB] hover:bg-[#FFF7EB]/10'
                : 'text-[#640018] hover:bg-[#640018]/5'
            }`}
            aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`md:hidden overflow-hidden border-t transition-colors duration-500 ${
              isScrolled
                ? 'bg-[#640018] border-[#4A0011]'
                : 'bg-[#FFF7EB] border-[#640018]/10'
            }`}
          >
            <div className="px-5 py-5 flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? isScrolled
                          ? 'bg-[#FFF7EB]/12 text-[#FFF7EB] font-semibold'
                          : 'bg-[#640018]/8 text-[#640018] font-semibold'
                        : isScrolled
                          ? 'text-[#FFF7EB]/85 hover:bg-[#FFF7EB]/10'
                          : 'text-[#2A0E14]/85 hover:bg-[#640018]/5'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {currentCustomer ? (
                <>
                  <NavLink
                    to="/favorites"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? isScrolled
                            ? 'bg-[#FFF7EB]/12 text-[#FFF7EB] font-semibold'
                            : 'bg-[#640018]/8 text-[#640018] font-semibold'
                          : isScrolled
                            ? 'text-[#FFF7EB]/85 hover:bg-[#FFF7EB]/10'
                            : 'text-[#2A0E14]/85 hover:bg-[#640018]/5'
                      }`
                    }
                  >
                    <Heart className="w-4 h-4" aria-hidden="true" />
                    <span>{t.nav.myFavorites}</span>
                    {favoriteIds.length > 0 && (
                      <span className="tabular-nums text-xs opacity-80">({favoriteIds.length})</span>
                    )}
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => {
                      logoutCustomer();
                      setMobileOpen(false);
                    }}
                    className={`flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium text-start cursor-pointer ${
                      isScrolled ? 'text-[#FFF7EB]/85 hover:bg-[#FFF7EB]/10' : 'text-[#2A0E14]/85 hover:bg-[#640018]/5'
                    }`}
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                    <span>{t.nav.signOut} ({currentCustomer.name})</span>
                  </button>
                </>
              ) : null}

              {showAuthPill && (
                <div className="pt-3 mt-1 border-t border-[#640018]/10">
                  <Link
                    to={authDestination}
                    state={authLinkState}
                    onClick={() => setMobileOpen(false)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-full ${
                      isScrolled
                        ? 'bg-[#FFF7EB] text-[#640018]'
                        : 'bg-[#640018] text-[#FFF7EB]'
                    }`}
                  >
                    {currentAdmin ? (
                      <LayoutDashboard className="w-4 h-4 text-[#FEDEA3]" aria-hidden="true" />
                    ) : (
                      <LogIn className="w-4 h-4 text-[#FEDEA3]" aria-hidden="true" />
                    )}
                    <span>{authLabel}</span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
