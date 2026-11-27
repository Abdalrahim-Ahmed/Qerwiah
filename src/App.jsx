import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BrandProvider } from './context/BrandContext';
import { CinematicIntro } from './components/CinematicIntro';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BananaFiberThread } from './components/BananaFiberThread';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ContactPage } from './pages/ContactPage';
import { CustomDesign } from './pages/CustomDesign';
import { FavoritesPage } from './pages/FavoritesPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  // BrandProvider lives inside the router because the shared login flow navigates.
  return (
    <BrowserRouter>
      <BrandProvider>
        <ScrollToTop />
        <CinematicIntro />
        <div className="min-h-screen flex flex-col bg-[#FFF7EB] text-[#2A0E14]">
          <Header />
          {/* `isolate` + the thread's negative z-index keep the global wavy line behind every page's content. */}
          <main className="relative isolate flex-1">
            <BananaFiberThread />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/custom-design" element={<CustomDesign />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              {/* The old admin login URL now leads to the single shared login page. */}
              <Route path="/admin/login" element={<Navigate to="/login" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrandProvider>
    </BrowserRouter>
  );
}
