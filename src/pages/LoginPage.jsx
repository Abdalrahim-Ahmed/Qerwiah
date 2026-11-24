import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, UserRound } from 'lucide-react';
import { useBrand } from '../context/BrandContext';
import { LiquidButton } from '../components/LiquidButton';

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-[#FFF7EB] border border-[#4B0011]/20 focus:border-[#4B0011] focus:outline-none text-sm text-[#2A0E14] ltr:text-left rtl:text-right';

const MODES = ['signin', 'register'];

/**
 * The ONE login page for everyone. Administrators and customers use the same form:
 * the role is decided by the configured administrator accounts (see `login` in
 * BrandContext), so an admin is sent to the dashboard and a customer back to the site.
 * The "Create account" tab only ever creates regular customer accounts.
 */
export const LoginPage = () => {
  const { t, login, registerCustomer, currentAdmin, currentCustomer } = useBrand();
  const location = useLocation();
  const navigate = useNavigate();

  const reason = location.state?.reason ?? null;
  const pendingProductId = location.state?.pendingProductId ?? null;
  const requestedFrom = location.state?.from;
  const from =
    typeof requestedFrom === 'string' && requestedFrom.startsWith('/') && requestedFrom !== '/login'
      ? requestedFrom
      : '/';

  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Already signed in: go where the session belongs.
  if (currentAdmin && !reason) return <Navigate to="/admin/dashboard" replace />;
  if (currentCustomer) return <Navigate to={from} replace />;

  const a = t.auth;

  const switchMode = (next) => {
    setMode(next);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password || (mode === 'register' && !name.trim())) {
      setError(a.validationError);
      return;
    }

    if (mode === 'register') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setError(a.emailError);
      if (password.length < 6) return setError(a.passwordError);
      const res = registerCustomer({ name, email, password }, pendingProductId);
      if (!res.ok) setError(a.existsError);
      return; // the signed-in customer is redirected by the check above
    }

    const res = login(email, password, pendingProductId);
    if (!res.ok) {
      setError(res.reason === 'inactive' ? a.inactiveError : a.invalidError);
      return;
    }
    if (res.role === 'admin') navigate('/admin/dashboard', { replace: true });
    // customers are redirected by the check above once their session is set
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-5 py-14">
      <div className="w-full max-w-md rounded-2xl bg-[#FFF7EB] border border-[#DFAC6D]/60 shadow-lg p-7 sm:p-10">
        <div className="text-center">
          <div className="w-11 h-11 rounded-full bg-[#4B0011]/10 text-[#4B0011] flex items-center justify-center mx-auto mb-4">
            <UserRound className="w-5 h-5" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#4B0011]">{a.title}</h1>
          <p className="mt-2 text-xs sm:text-sm text-[#2A0E14]/75 leading-relaxed">{a.subtitle}</p>
        </div>

        {reason === 'favorite' && (
          <p
            data-testid="auth-favorite-message"
            role="status"
            className="mt-5 flex items-start gap-2.5 p-3 rounded-lg bg-[#FEDEA3]/45 border border-[#DFAC6D]/60 text-xs sm:text-sm text-[#3A000D]"
          >
            <Heart className="w-4 h-4 mt-0.5 shrink-0 fill-[#4B0011] text-[#4B0011]" aria-hidden="true" />
            <span>{a.favoritesPrompt}</span>
          </p>
        )}

        <div
          role="tablist"
          className="mt-6 flex items-center gap-0.5 p-1.5 rounded-full bg-[#F4E8D5] border border-[#DFAC6D]/45"
        >
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => switchMode(m)}
              className={`flex-1 px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer ${
                mode === m
                  ? 'bg-[#4B0011] text-[#FFF7EB] shadow-sm'
                  : 'text-[#4B0011]/80 hover:text-[#4B0011]'
              }`}
            >
              {m === 'signin' ? a.signInTab : a.registerTab}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          {error && (
            <p
              role="alert"
              className="p-3 rounded-lg bg-[#4B0011]/10 border border-[#4B0011]/30 text-xs sm:text-sm text-[#4B0011]"
            >
              {error}
            </p>
          )}

          {mode === 'register' && (
            <div>
              <label htmlFor="auth-name" className="block text-xs font-medium text-[#4B0011] mb-2">
                {a.nameLabel}
              </label>
              <input
                id="auth-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-xs font-medium text-[#4B0011] mb-2">
              {a.emailLabel}
            </label>
            <input
              id="auth-email"
              type="email"
              dir="ltr"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-xs font-medium text-[#4B0011] mb-2">
              {a.passwordLabel}
            </label>
            <input
              id="auth-password"
              type="password"
              dir="ltr"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
            {mode === 'register' && (
              <p className="mt-1.5 text-xs text-[#2A0E14]/55">{a.passwordHint}</p>
            )}
          </div>

          <LiquidButton type="submit" variant="burgundy" className="w-full">
            <span>{mode === 'signin' ? a.signInBtn : a.registerBtn}</span>
          </LiquidButton>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#4B0011]/80 hover:text-[#4B0011]"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
            <span>{a.backHome}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
