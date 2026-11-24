import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, Facebook, Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useBrand } from '../context/BrandContext';
import { LiquidButton } from '../components/LiquidButton';

export const ContactPage = () => {
  const { t, settings, language, getWhatsAppLink, submitInquiry } = useBrand();
  const prefersReduced = useReducedMotion();

  const [name, setName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phoneOrEmail.trim() || !message.trim()) {
      setError(t.contactPage.validationError);
      return;
    }
    setError('');
    submitInquiry({
      name: name.trim(),
      phoneOrEmail: phoneOrEmail.trim(),
      subject: subject.trim() || t.contactPage.kicker,
      message: message.trim(),
    });
    setName('');
    setPhoneOrEmail('');
    setSubject('');
    setMessage('');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl mb-12">
          
          <h1 className="mt-2 text-[clamp(2rem,4.5vw,60px)] font-semibold text-[#4B0011] leading-[1.18] text-balance">
            {t.contactPage.title}
          </h1>
          <p className="mt-4 text-[18px] text-[#2A0E14]/82 leading-[1.75]">
            {t.contactPage.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Direct Atelier Channels */}
          <motion.aside
            initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-2xl bg-[#4B0011] text-[#FFF7EB] p-7 sm:p-10 border border-[#DFAC6D]/35 space-y-7"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-[#FEDEA3]">
              {t.contactPage.directTitle}
            </h2>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#DFAC6D] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs text-[#FEDEA3]/80">{t.contactPage.locationLabel}</p>
                  <p className="mt-1 text-[#FFF7EB] font-medium">
                    {settings.atelierLocation[language]}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MessageCircle className="w-5 h-5 text-[#DFAC6D] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs text-[#FEDEA3]/80">{t.contactPage.whatsappLabel}</p>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    dir="ltr"
                    className="mt-1 inline-block text-[#FFF7EB] font-medium hover:text-[#FEDEA3] underline underline-offset-4 tabular-nums"
                  >
                    {settings.whatsappNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#DFAC6D] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs text-[#FEDEA3]/80">{t.contactPage.emailLabel}</p>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    aria-label="Email"
                    className="mt-1 inline-block text-[#FFF7EB] font-medium hover:text-[#FEDEA3] underline underline-offset-4"
                  >
                    {settings.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#FEDEA3]/20">
              <p className="text-xs text-[#FEDEA3]/80 mb-3">{t.contactPage.socialLabel}</p>
              <div className="flex items-center gap-3">
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-[#FEDEA3]/30 flex items-center justify-center text-[#FEDEA3] hover:bg-[#FEDEA3] hover:text-[#3A000D] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full border border-[#FEDEA3]/30 flex items-center justify-center text-[#FEDEA3] hover:bg-[#FEDEA3] hover:text-[#3A000D] transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.aside>

          {/* Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="lg:col-span-7 rounded-2xl bg-[#FFF7EB] border border-[#4B0011]/15 p-7 sm:p-10"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-[#4B0011] mb-6">
              {t.contactPage.formTitle}
            </h2>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#8A8861] mx-auto" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-[#4B0011]">
                  {t.contactPage.successTitle}
                </h3>
                <p className="text-sm text-[#2A0E14]/80 max-w-md mx-auto leading-relaxed">
                  {t.contactPage.successBody}
                </p>
                <div className="pt-2">
                  <LiquidButton
                    type="button"
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    <span>{t.contactPage.sendAnother}</span>
                  </LiquidButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {error && (
                  <p
                    role="alert"
                    className="p-3 rounded-lg bg-[#4B0011]/8 border border-[#4B0011]/25 text-xs sm:text-sm text-[#4B0011]"
                  >
                    {error}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#4B0011] mb-2"
                    >
                      {t.contactPage.nameLabel} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF7EB] border border-[#4B0011]/20 focus:border-[#4B0011] focus:outline-none text-sm text-[#2A0E14]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-channel"
                      className="block text-xs font-medium text-[#4B0011] mb-2"
                    >
                      {t.contactPage.contactLabel} *
                    </label>
                    <input
                      id="contact-channel"
                      type="text"
                      value={phoneOrEmail}
                      onChange={(e) => setPhoneOrEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF7EB] border border-[#4B0011]/20 focus:border-[#4B0011] focus:outline-none text-sm text-[#2A0E14]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-[#4B0011] mb-2"
                  >
                    {t.contactPage.subjectLabel}
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF7EB] border border-[#4B0011]/20 focus:border-[#4B0011] focus:outline-none text-sm text-[#2A0E14]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#4B0011] mb-2"
                  >
                    {t.contactPage.messageLabel} *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF7EB] border border-[#4B0011]/20 focus:border-[#4B0011] focus:outline-none text-sm text-[#2A0E14] resize-y"
                  />
                </div>

                <div className="pt-2">
                  <LiquidButton type="submit" variant="burgundy">
                    <span>{t.contactPage.submitBtn}</span>
                  </LiquidButton>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
