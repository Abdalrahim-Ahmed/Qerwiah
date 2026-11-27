/**
 * Utility functions for consistent product pricing and crafting time formatting.
 */

/**
 * Formats a product's price in English numerical digits with comma separators and "EGP" currency.
 *
 * Examples:
 * - 1250 -> "1,250 EGP"
 * - 850  -> "850 EGP"
 * - 2000 -> "2,000 EGP"
 *
 * Returns null if the price is unavailable, inquiry-only, or not a positive number.
 *
 * @param {number|string|object|null} rawPrice
 * @returns {string|null}
 */
export function formatProductPrice(rawPrice) {
  if (rawPrice === null || rawPrice === undefined) {
    return null;
  }

  let value = rawPrice;
  if (typeof rawPrice === 'object') {
    value = rawPrice.amount ?? rawPrice.value ?? rawPrice.en ?? rawPrice.ar;
  }

  if (typeof value === 'string') {
    // If it's a non-numeric string like an inquiry label, return null
    const cleaned = value
      .trim()
      .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
      .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
      .replace(/,/g, '');
    const parsed = Number(cleaned);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }
    value = parsed;
  }

  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    const formattedNumber = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(value);
    return `${formattedNumber} EGP`;
  }

  return null;
}

/**
 * Retrieves the formatted crafting time duration for a product.
 * Returns null if no verified crafting duration exists or if value is <= 0.
 *
 * @param {object} product
 * @param {string} language
 * @param {object} t
 * @returns {string|null}
 */
export function getProductCraftingTime(product, language = 'ar', t = null) {
  if (!product) return null;

  const rawHours = product.craftHours ?? product.craftingHours ?? product.craftingTime;
  if (rawHours === null || rawHours === undefined || rawHours === '') {
    return null;
  }

  const num = typeof rawHours === 'number' ? rawHours : Number(rawHours);
  if (!Number.isFinite(num) || num <= 0) {
    return null;
  }

  const unit = t?.productsPage?.hoursUnit || (language === 'ar' ? 'ساعة' : 'hrs');
  return `${num} ${unit}`;
}
