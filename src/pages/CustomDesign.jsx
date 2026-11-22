import { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  CheckCircle2,
  ImagePlus,
  Lightbulb,
  MessageCircle,
  PhoneCall,
  Scissors,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useBrand } from '../context/BrandContext';
import { LiquidButton } from '../components/LiquidButton';
import { HeritageImage } from '../components/HeritageImage';
import { BRAND_IMAGES } from '../data/seedData';

const MAX_IMAGES = 5;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

// ISO region codes; names are localized at runtime with Intl.DisplayNames.
const COUNTRY_CODES = [
  'EG', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'JO', 'LB', 'IQ', 'SY', 'PS', 'YE', 'LY', 'TN', 'DZ',
  'MA', 'SD', 'SO', 'DJ', 'MR', 'US', 'CA', 'GB', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'CH', 'AT',
  'SE', 'NO', 'DK', 'FI', 'IE', 'PT', 'GR', 'TR', 'CY', 'AU', 'NZ', 'JP', 'KR', 'CN', 'IN', 'SG',
  'MY', 'ID', 'ZA', 'NG', 'KE', 'BR', 'MX', 'RU',
];

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  productType: '',
  size: '',
  material: '',
  colors: '',
  description: '',
  budget: '',
  deadline: '',
  contactMethod: 'whatsapp',
  consent: false,
};

const fieldBase =
  'w-full px-4 py-3 rounded-xl bg-[#FFF7EB] border text-sm text-[#2A0E14] placeholder:text-[#2A0E14]/40 focus:outline-none transition-colors';
const fieldOk = 'border-[#640018]/20 focus:border-[#640018]';
const fieldBad = 'border-[#B3261E] focus:border-[#B3261E]';

/** Downscale an image to a small JPEG data URL so it fits comfortably in localStorage. */
function fileToThumbnail(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read failed'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('decode failed'));
      img.onload = () => {
        const maxSide = 480;
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('no canvas'));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export const CustomDesign = () => {
  const { t, language, getWhatsAppLink, submitCustomRequest } = useBrand();
  const c = t.customDesign;
  const prefersReduced = useReducedMotion();
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(INITIAL_FORM);
  const [images, setImages] = useState([]);
  const [imageNote, setImageNote] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [requestId, setRequestId] = useState(null);

  const countries = useMemo(() => {
    let names = null;
    try {
      names = new Intl.DisplayNames([language], { type: 'region' });
    } catch {
      names = null;
    }
    return COUNTRY_CODES.map((code) => ({
      code,
      label: names?.of(code) || code,
    })).sort((a, b) => {
      if (a.code === 'EG') return -1;
      if (b.code === 'EG') return 1;
      return a.label.localeCompare(b.label, language);
    });
  }, [language]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = c.errorRequired;
    if (!form.email.trim()) e.email = c.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = c.errorEmail;
    const digits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) e.phone = c.errorRequired;
    else if (digits.length < 7 || digits.length > 15) e.phone = c.errorPhone;
    if (!form.country) e.country = c.errorRequired;
    if (!form.productType) e.productType = c.errorRequired;
    if (form.description.trim().length < 10) e.description = c.errorDescription;
    if (!form.consent) e.consent = c.errorConsent;
    return e;
  };

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;

    let note = '';
    const accepted = [];
    for (const file of files) {
      if (!file.type.startsWith('image/') || file.size > MAX_IMAGE_BYTES) {
        note = c.referencesLimit;
        continue;
      }
      accepted.push(file);
    }
    const room = MAX_IMAGES - images.length;
    if (accepted.length > room) note = c.referencesLimit;

    try {
      const thumbs = await Promise.all(accepted.slice(0, Math.max(room, 0)).map(fileToThumbnail));
      setImages((prev) => [...prev, ...thumbs].slice(0, MAX_IMAGES));
    } catch {
      note = c.referencesLimit;
    }
    setImageNote(note);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      document.getElementById(`cd-${firstKey}`)?.focus();
      return;
    }
    setSubmitting(true);
    const id = submitCustomRequest({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      country: form.country,
      productType: form.productType,
      size: form.size.trim(),
      material: form.material,
      colors: form.colors.trim(),
      description: form.description.trim(),
      referenceImages: images,
      budget: form.budget,
      deadline: form.deadline,
      contactMethod: form.contactMethod,
    });
    setRequestId(id);
    setSubmitting(false);
    setForm(INITIAL_FORM);
    setImages([]);
    setImageNote('');
    window.requestAnimationFrame(scrollToForm);
  };

  const stepIcons = [Lightbulb, Scissors, PhoneCall];

  const fieldClass = (key) =>
    `${fieldBase} ${errors[key] ? fieldBad : fieldOk}`;

  const Label = ({
    htmlFor,
    text,
    required,
  }) => (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-[#640018] mb-2">
      {text}
      {required ? (
        <span className="text-[#B3261E]" aria-hidden="true"> *</span>
      ) : (
        <span className="text-[#2A0E14]/50 font-normal"> · {c.optional}</span>
      )}
    </label>
  );

  const FieldError = ({ id, msg }) =>
    msg ? (
      <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-[#B3261E]">
        {msg}
      </p>
    ) : null;

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <div>
      {/* A. Hero */}
      <section className="relative pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <motion.p
                initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xs sm:text-sm font-medium text-[#8A8861] tracking-wide"
              >
                {c.kicker}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold text-[#640018] leading-[1.15] text-balance"
              >
                {c.heroTitle}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-base sm:text-lg text-[#2A0E14]/82 leading-relaxed max-w-xl"
              >
                {c.heroSubtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
              >
                <LiquidButton variant="burgundy" onClick={scrollToForm}>
                  <span>{c.heroCta}</span>
                </LiquidButton>
                <LiquidButton
                  variant="outline"
                  onClick={() =>
                    document
                      .getElementById('cd-steps')
                      ?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' })
                  }
                >
                  <span>{c.heroSecondary}</span>
                </LiquidButton>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative w-full max-w-[20rem] sm:max-w-[30rem] justify-self-center"
            >
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-3xl overflow-hidden border border-[#DFAC6D]/45 shadow-[0_24px_60px_-28px_rgba(100,0,24,0.55)]">
                <HeritageImage
                  src={BRAND_IMAGES.artisanHands}
                  alt={language === 'ar' ? 'حرفية تنسج قطعة يدوية' : 'Artisan handweaving a custom piece'}
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A0011]/55 via-transparent to-transparent" />
              </div>
              {/* Small inset: finished piece */}
              <div className="hidden sm:block absolute -bottom-6 ltr:-left-6 rtl:-right-6 w-28 lg:w-36 aspect-square rounded-2xl overflow-hidden border-4 border-[#FFF7EB] shadow-lg">
                <HeritageImage
                  src={BRAND_IMAGES.clutchOasis}
                  alt={language === 'ar' ? 'كلتش من ألياف الموز' : 'Banana-fiber clutch'}
                  containerClassName="w-full h-full"
                />
              </div>
              <p className="absolute top-4 ltr:left-4 rtl:right-4 px-4 py-2 rounded-full bg-[#FFF7EB]/92 backdrop-blur text-[#640018] text-xs font-medium border border-[#DFAC6D]/50">
                {c.heroBadge}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* B. How it works */}
      <section id="cd-steps" className="py-16 sm:py-24 bg-[#F4E8D5]/70 border-y border-[#640018]/10 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div {...fadeUp()} className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium text-[#8A8861]">{c.stepsKicker}</p>
            <h2 className="mt-2 text-2xl sm:text-4xl font-semibold text-[#640018] text-balance">
              {c.stepsTitle}
            </h2>
          </motion.div>

          <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {c.steps.map((step, i) => {
              const Icon = stepIcons[i] || Lightbulb;
              return (
                <motion.li
                  key={step.title}
                  {...fadeUp(i * 0.1)}
                  className="group relative rounded-2xl bg-[#FFF7EB] border border-[#640018]/12 p-7 sm:p-8"
                >
                  <span
                    className="absolute top-5 ltr:right-6 rtl:left-6 text-5xl font-semibold text-[#DFAC6D]/40 tabular-nums select-none transition-colors duration-500 ease-out group-hover:text-[#640018] group-focus-within:text-[#640018] motion-reduce:transition-none"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="w-12 h-12 rounded-full bg-[#640018] text-[#FEDEA3] flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-lg sm:text-xl font-semibold text-[#640018]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#2A0E14]/78 leading-relaxed">{step.body}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* C. Request form */}
      <section ref={formRef} id="cd-form" className="py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <motion.aside
              {...fadeUp()}
              className="lg:col-span-4 lg:sticky lg:top-28 rounded-2xl bg-[#640018] text-[#FFF7EB] p-7 sm:p-9 border border-[#DFAC6D]/35 space-y-6"
            >
              <p className="text-xs sm:text-sm font-medium text-[#DFAC6D]">{c.formKicker}</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#FEDEA3] text-balance">
                {c.formTitle}
              </h2>
              <p className="text-sm text-[#FFF7EB]/82 leading-relaxed">{c.formSubtitle}</p>
              <div className="pt-5 border-t border-[#FEDEA3]/20 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#DFAC6D] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-[#FEDEA3]">{c.noteTitle}</p>
                  <p className="mt-1 text-xs text-[#FFF7EB]/78 leading-relaxed">{c.noteBody}</p>
                </div>
              </div>
            </motion.aside>

            <motion.div
              {...fadeUp(0.08)}
              className="lg:col-span-8 rounded-2xl bg-[#FFF7EB] border border-[#640018]/15 p-6 sm:p-10"
            >
              {requestId ? (
                <div className="py-10 text-center space-y-4" role="status">
                  <CheckCircle2 className="w-14 h-14 text-[#8A8861] mx-auto" aria-hidden="true" />
                  <h3 className="text-2xl font-semibold text-[#640018]">{c.successTitle}</h3>
                  <p className="text-sm text-[#2A0E14]/80 max-w-md mx-auto leading-relaxed">
                    {c.successBody}
                  </p>
                  <p className="text-xs text-[#2A0E14]/70">
                    {c.successRef}:{' '}
                    <span dir="ltr" className="font-semibold text-[#640018] tabular-nums">
                      {requestId}
                    </span>
                  </p>
                  <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                    <LiquidButton
                      variant="burgundy"
                      href={getWhatsAppLink(`${c.whatsappMessage} ${requestId}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>{c.successWhatsapp}</span>
                    </LiquidButton>
                    <LiquidButton variant="outline" onClick={() => setRequestId(null)}>
                      <span>{c.successAnother}</span>
                    </LiquidButton>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-10">
                  {Object.keys(errors).length > 0 && (
                    <p
                      role="alert"
                      className="p-3 rounded-lg bg-[#B3261E]/8 border border-[#B3261E]/30 text-xs sm:text-sm text-[#B3261E]"
                    >
                      {c.errorSummary}
                    </p>
                  )}

                  {/* Customer information */}
                  <fieldset className="space-y-5">
                    <legend className="text-lg font-semibold text-[#640018] pb-3 mb-1 border-b border-[#640018]/10 w-full">
                      {c.sectionCustomer}
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="cd-fullName" text={c.fullName} required />
                        <input
                          id="cd-fullName"
                          type="text"
                          autoComplete="name"
                          value={form.fullName}
                          onChange={(e) => update('fullName', e.target.value)}
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? 'cd-fullName-error' : undefined}
                          className={fieldClass('fullName')}
                        />
                        <FieldError id="cd-fullName" msg={errors.fullName} />
                      </div>
                      <div>
                        <Label htmlFor="cd-email" text={c.email} required />
                        <input
                          id="cd-email"
                          type="email"
                          dir="ltr"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'cd-email-error' : undefined}
                          className={`${fieldClass('email')} ltr:text-left rtl:text-right`}
                        />
                        <FieldError id="cd-email" msg={errors.email} />
                      </div>
                      <div>
                        <Label htmlFor="cd-phone" text={c.phone} required />
                        <input
                          id="cd-phone"
                          type="tel"
                          dir="ltr"
                          autoComplete="tel"
                          placeholder="+20 100 000 0000"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? 'cd-phone-error' : undefined}
                          className={`${fieldClass('phone')} ltr:text-left rtl:text-right`}
                        />
                        <FieldError id="cd-phone" msg={errors.phone} />
                      </div>
                      <div>
                        <Label htmlFor="cd-country" text={c.country} required />
                        <select
                          id="cd-country"
                          autoComplete="country"
                          value={form.country}
                          onChange={(e) => update('country', e.target.value)}
                          aria-invalid={!!errors.country}
                          aria-describedby={errors.country ? 'cd-country-error' : undefined}
                          className={fieldClass('country')}
                        >
                          <option value="">{c.countryPlaceholder}</option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.label}
                            </option>
                          ))}
                        </select>
                        <FieldError id="cd-country" msg={errors.country} />
                      </div>
                    </div>
                  </fieldset>

                  {/* Product details */}
                  <fieldset className="space-y-5">
                    <legend className="text-lg font-semibold text-[#640018] pb-3 mb-1 border-b border-[#640018]/10 w-full">
                      {c.sectionProduct}
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="cd-productType" text={c.productType} required />
                        <select
                          id="cd-productType"
                          value={form.productType}
                          onChange={(e) => update('productType', e.target.value)}
                          aria-invalid={!!errors.productType}
                          aria-describedby={errors.productType ? 'cd-productType-error' : undefined}
                          className={fieldClass('productType')}
                        >
                          <option value="">{c.productTypePlaceholder}</option>
                          {c.productTypes.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        <FieldError id="cd-productType" msg={errors.productType} />
                      </div>
                      <div>
                        <Label htmlFor="cd-size" text={c.size} />
                        <input
                          id="cd-size"
                          type="text"
                          placeholder={c.sizePlaceholder}
                          value={form.size}
                          onChange={(e) => update('size', e.target.value)}
                          className={fieldClass('size')}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cd-material" text={c.materials} />
                        <select
                          id="cd-material"
                          value={form.material}
                          onChange={(e) => update('material', e.target.value)}
                          className={fieldClass('material')}
                        >
                          <option value="">—</option>
                          {c.materialOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="cd-colors" text={c.colors} />
                        <input
                          id="cd-colors"
                          type="text"
                          placeholder={c.colorsPlaceholder}
                          value={form.colors}
                          onChange={(e) => update('colors', e.target.value)}
                          className={fieldClass('colors')}
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* Vision */}
                  <fieldset className="space-y-5">
                    <legend className="text-lg font-semibold text-[#640018] pb-3 mb-1 border-b border-[#640018]/10 w-full">
                      {c.sectionVision}
                    </legend>
                    <div>
                      <Label htmlFor="cd-description" text={c.description} required />
                      <textarea
                        id="cd-description"
                        rows={6}
                        placeholder={c.descriptionPlaceholder}
                        value={form.description}
                        onChange={(e) => update('description', e.target.value)}
                        aria-invalid={!!errors.description}
                        aria-describedby={errors.description ? 'cd-description-error' : undefined}
                        className={`${fieldClass('description')} resize-y`}
                      />
                      <FieldError id="cd-description" msg={errors.description} />
                    </div>

                    <div>
                      <p className="block text-xs font-medium text-[#640018] mb-2">
                        {c.references}
                        <span className="text-[#2A0E14]/50 font-normal"> · {c.optional}</span>
                      </p>
                      <input
                        ref={fileInputRef}
                        id="cd-references"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFiles}
                        className="sr-only"
                        tabIndex={-1}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={images.length >= MAX_IMAGES}
                        className="w-full rounded-xl border-2 border-dashed border-[#640018]/25 hover:border-[#640018]/60 bg-[#F4E8D5]/40 px-4 py-7 flex flex-col items-center gap-2 text-[#640018] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#640018]"
                      >
                        <ImagePlus className="w-6 h-6" aria-hidden="true" />
                        <span className="text-sm font-medium">{c.referencesButton}</span>
                        <span className="text-xs text-[#2A0E14]/60">{c.referencesHint}</span>
                      </button>
                      {imageNote && (
                        <p role="alert" className="mt-2 text-xs text-[#B3261E]">
                          {imageNote}
                        </p>
                      )}
                      {images.length > 0 && (
                        <ul className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
                          {images.map((src, i) => (
                            <li
                              key={i}
                              className="relative aspect-square rounded-lg overflow-hidden border border-[#640018]/15"
                            >
                              <img src={src} alt="" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                                aria-label={`${c.remove} ${i + 1}`}
                                className="absolute top-1 ltr:right-1 rtl:left-1 w-6 h-6 rounded-full bg-[#640018] text-[#FFF7EB] flex items-center justify-center cursor-pointer hover:bg-[#4A0011]"
                              >
                                <X className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </fieldset>

                  {/* Budget & contact */}
                  <fieldset className="space-y-5">
                    <legend className="text-lg font-semibold text-[#640018] pb-3 mb-1 border-b border-[#640018]/10 w-full">
                      {c.sectionExtras}
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="cd-budget" text={c.budget} />
                        <select
                          id="cd-budget"
                          value={form.budget}
                          onChange={(e) => update('budget', e.target.value)}
                          className={fieldClass('budget')}
                        >
                          <option value="">{c.budgetPlaceholder}</option>
                          {c.budgetOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="cd-deadline" text={c.deadline} />
                        <input
                          id="cd-deadline"
                          type="date"
                          dir="ltr"
                          min={new Date().toISOString().slice(0, 10)}
                          value={form.deadline}
                          onChange={(e) => update('deadline', e.target.value)}
                          className={`${fieldClass('deadline')} ltr:text-left rtl:text-right`}
                        />
                        <p className="mt-1.5 text-xs text-[#2A0E14]/55">{c.deadlineHint}</p>
                      </div>
                    </div>

                    <div role="radiogroup" aria-labelledby="cd-contact-label">
                      <p id="cd-contact-label" className="block text-xs font-medium text-[#640018] mb-2">
                        {c.contactMethod}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {c.contactMethods.map((m) => {
                          const active = form.contactMethod === m.value;
                          return (
                            <label
                              key={m.value}
                              className={`cursor-pointer px-5 py-2.5 rounded-full text-sm border transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#640018] ${
                                active
                                  ? 'bg-[#640018] border-[#640018] text-[#FFF7EB]'
                                  : 'bg-[#FFF7EB] border-[#640018]/25 text-[#640018] hover:border-[#640018]'
                              }`}
                            >
                              <input
                                type="radio"
                                name="contactMethod"
                                value={m.value}
                                checked={active}
                                onChange={() => update('contactMethod', m.value)}
                                className="sr-only"
                              />
                              {m.label}
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          id="cd-consent"
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => update('consent', e.target.checked)}
                          aria-invalid={!!errors.consent}
                          aria-describedby={errors.consent ? 'cd-consent-error' : undefined}
                          className="mt-0.5 w-4 h-4 accent-[#640018] shrink-0"
                        />
                        <span className="text-sm text-[#2A0E14]/82 leading-relaxed">{c.consent}</span>
                      </label>
                      <FieldError id="cd-consent" msg={errors.consent} />
                    </div>
                  </fieldset>

                  <div className="flex flex-wrap items-center gap-4">
                    <LiquidButton type="submit" variant="burgundy">
                      <span>{submitting ? c.submitting : c.submit}</span>
                    </LiquidButton>
                    <p className="text-xs text-[#2A0E14]/55">
                      <span className="text-[#B3261E]">*</span> {c.required}
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
