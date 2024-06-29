/**
 * Open an external URL in current tab.
 *
 * @param {String} url - The URL to open.
 */
export function openInplace(url) {
  window.open(url, '_self', 'noopener,noreferrer');
}

/**
 * Open an external URL in new tab.
 *
 * @param {String} url - The URL to open.
 */
export function openInNewTab(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}
