/**
 * Centralized field sizing tokens.
 * Change values here to resize all form fields across mobile and desktop at once.
 */

/** Height for all text/select/date input controls */
export const fieldHeight = 'h-11 sm:h-9'

/**
 * Height for SelectTrigger, which uses data-size attributes to support sm/default variants.
 * Mirrors fieldHeight but expressed as data-attribute variants.
 */
export const fieldHeightDataAttr = 'data-[size=default]:h-11 data-[size=default]:sm:h-9'

/** Vertical padding for dropdown list items (combobox, select) */
export const fieldItemPadding = 'py-3 sm:py-1.5'

/** Font size for field labels */
export const fieldLabelSize = 'text-base sm:text-sm'
