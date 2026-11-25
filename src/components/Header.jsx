import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Globe, Heart, LayoutDashboard, LogIn, LogOut, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useBrand } from '../context/BrandContext';
import logoArBurgundy from '../assets/logo/logo-arabic-burgundy.svg';
import logoArBeige from '../assets/logo/logo-arabic-beige.svg';
import logoEnBurgundy from '../assets/logo/logo-en-burgundy.svg';
import logoEnBeige from '../assets/logo/logo-en-beige.svg';

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
  const headerRef = useRef(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();

    let ro;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      ro = new ResizeObserver(updateHeaderHeight);
      ro.observe(headerRef.current);
    }

    const updateHeaderColor = () => {
      setIsScrolled(window.scrollY > 24);
      updateHeaderHeight();
    };

    updateHeaderColor();
    window.addEventListener('scroll', updateHeaderColor, { passive: true });
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('scroll', updateHeaderColor);
      window.removeEventListener('resize', updateHeaderHeight);
      if (ro) ro.disconnect();
    };
  }, []);

  useEffect(() => {
    // Preload all logo variants into memory to ensure immediate transitions with zero flicker
    [logoArBurgundy, logoArBeige, logoEnBurgundy, logoEnBeige].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const navItems = [
    { to: '/', label: t.nav.home, end: true },
    { to: '/about', label: t.nav.story, end: false },
    { to: '/products', label: t.nav.products, end: false },
    { to: '/custom-design', label: t.nav.customDesign, end: false },
    { to: '/contact', label: t.nav.contact, end: false },
  ];

  const handleNavClick = (to) => {
    if (pathname === to) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
  };

  // One entry point for everyone: guests see "Sign In" (the single shared login page),
  // administrators see their dashboard link, signed-in customers see favorites / sign out.
  const showAuthPill = Boolean(currentAdmin) || !currentCustomer;
  const authDestination = currentAdmin ? '/admin/dashboard' : '/login';
  const authLabel = currentAdmin ? t.nav.dashboard : t.nav.signIn;
  const authLinkState = currentAdmin ? undefined : { from: pathname };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-500 ${
        isScrolled
          ? 'bg-[#4B0011] border-[#3A000D]'
          : 'bg-[#FFF7EB]/92 border-[#4B0011]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Dynamic Brand Logo */}
        <Link
          to="/"
          onClick={() => {
            setMobileOpen(false);
            handleNavClick('/');
          }}
          className="shrink-0 flex items-center transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FEDEA3] rounded"
          aria-label={language === 'ar' ? 'قروية - الصفحة الرئيسية' : 'Qerwiah - Home'}
        >
          {language === 'ar' ? (
            <div className="relative h-9 sm:h-11 flex items-center">
              <img
                src={logoArBurgundy}
                alt="قروية"
                width={410}
                height={157}
                className={`h-9 sm:h-11 w-auto max-h-full object-contain transition-opacity duration-500 ease-in-out select-none ${
                  isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                draggable={false}
              />
              <img
                src={logoArBeige}
                alt="قروية"
                width={410}
                height={157}
                className={`h-9 sm:h-11 w-auto max-h-full object-contain absolute inset-0 transition-opacity duration-500 ease-in-out select-none ${
                  isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                draggable={false}
                aria-hidden={!isScrolled}
              />
            </div>
          ) : (
            <div className="relative h-9 sm:h-11 flex items-center">
              <img
                src={logoEnBurgundy}
                alt="Qerwiah"
                width={468}
                height={135}
                className={`h-9 sm:h-11 w-auto max-h-full object-contain transition-opacity duration-500 ease-in-out select-none ${
                  isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                draggable={false}
              />
              <img
                src={logoEnBeige}
                alt="Qerwiah"
                width={468}
                height={135}
                className={`h-9 sm:h-11 w-auto max-h-full object-contain absolute inset-0 transition-opacity duration-500 ease-in-out select-none ${
                  isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                draggable={false}
                aria-hidden={!isScrolled}
              />
            </div>
          )}
        </Link>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          className={`hidden md:flex items-center gap-6 lg:gap-8 font-medium ${
            language === 'ar'
              ? 'text-[18px] lg:text-[19px]'
              : 'text-[15px] lg:text-[16px]'
          } ${
            isScrolled ? 'text-[#FFF7EB]/85' : 'text-[#2A0E14]/80'
          }`}
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => handleNavClick(item.to)}
              className={({ isActive }) =>
                `relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? `${isScrolled ? 'text-[#FFF7EB]' : 'text-[#4B0011]'} font-semibold after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[1.5px] ${
                        isScrolled ? 'after:bg-[#FEDEA3]' : 'after:bg-[#4B0011]'
                      }`
                    : isScrolled
                      ? 'hover:text-[#FEDEA3]'
                      : 'hover:text-[#4B0011]'
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
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              isScrolled
                ? 'text-[#FFF7EB] border border-[#FFF7EB]/35 hover:border-[#FFF7EB]/70'
                : 'text-[#4B0011] border border-[#4B0011]/20 hover:border-[#4B0011]/50'
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
                onClick={() => handleNavClick('/favorites')}
                aria-label={t.nav.myFavorites}
                className={({ isActive }) =>
                  `relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium rounded-full transition-colors whitespace-nowrap shrink-0 border ${
                    isScrolled
                      ? `text-[#FFF7EB] ${isActive ? 'border-[#FEDEA3]' : 'border-[#FFF7EB]/35 hover:border-[#FFF7EB]/70'}`
                      : `text-[#4B0011] ${isActive ? 'border-[#4B0011]' : 'border-[#4B0011]/20 hover:border-[#4B0011]/50'}`
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
                      isScrolled ? 'bg-[#FEDEA3] text-[#3A000D]' : 'bg-[#4B0011] text-[#FFF7EB]'
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
                className={`w-8 h-8 inline-flex items-center justify-center rounded-full border transition-colors cursor-pointer shrink-0 ${
                  isScrolled
                    ? 'text-[#FFF7EB] border-[#FFF7EB]/35 hover:border-[#FFF7EB]/70'
                    : 'text-[#4B0011] border-[#4B0011]/20 hover:border-[#4B0011]/50'
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
              onClick={() => handleNavClick(authDestination)}
              className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs sm:text-[13.5px] font-medium rounded-full transition-colors whitespace-nowrap shrink-0 shadow-sm ${
                isScrolled
                  ? 'bg-[#FFF7EB] text-[#4B0011] hover:bg-[#FEDEA3]'
                  : 'bg-[#4B0011] text-[#FFF7EB] hover:bg-[#3A000D]'
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
                : 'text-[#4B0011] border border-[#4B0011]/20'
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
                : 'text-[#4B0011] hover:bg-[#4B0011]/5'
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
                ? 'bg-[#4B0011] border-[#3A000D]'
                : 'bg-[#FFF7EB] border-[#4B0011]/10'
            }`}
          >
            <div className="px-5 py-5 flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => {
                    setMobileOpen(false);
                    handleNavClick(item.to);
                  }}
                  className={({ isActive }) =>
                    `py-2.5 px-3 rounded-lg ${
                      language === 'ar' ? 'text-[18px]' : 'text-[16px]'
                    } font-medium transition-colors ${
                      isActive
                        ? isScrolled
                          ? 'bg-[#FFF7EB]/12 text-[#FFF7EB] font-semibold'
                          : 'bg-[#4B0011]/8 text-[#4B0011] font-semibold'
                        : isScrolled
                          ? 'text-[#FFF7EB]/85 hover:bg-[#FFF7EB]/10'
                          : 'text-[#2A0E14]/85 hover:bg-[#4B0011]/5'
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
                    onClick={() => {
                      setMobileOpen(false);
                      handleNavClick('/favorites');
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? isScrolled
                            ? 'bg-[#FFF7EB]/12 text-[#FFF7EB] font-semibold'
                            : 'bg-[#4B0011]/8 text-[#4B0011] font-semibold'
                          : isScrolled
                            ? 'text-[#FFF7EB]/85 hover:bg-[#FFF7EB]/10'
                            : 'text-[#2A0E14]/85 hover:bg-[#4B0011]/5'
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
                      isScrolled ? 'text-[#FFF7EB]/85 hover:bg-[#FFF7EB]/10' : 'text-[#2A0E14]/85 hover:bg-[#4B0011]/5'
                    }`}
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                    <span>{t.nav.signOut} ({currentCustomer.name})</span>
                  </button>
                </>
              ) : null}

              {showAuthPill && (
                <div className="pt-3 mt-1 border-t border-[#4B0011]/10">
                  <Link
                    to={authDestination}
                    state={authLinkState}
                    onClick={() => {
                      setMobileOpen(false);
                      handleNavClick(authDestination);
                    }}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-full ${
                      isScrolled
                        ? 'bg-[#FFF7EB] text-[#4B0011]'
                        : 'bg-[#4B0011] text-[#FFF7EB]'
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
