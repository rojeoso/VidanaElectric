// Standard Meta Pixel events. The base code (PageView) lives in each page's <head>.
type PixelEvent = 'Lead' | 'Contact';

export function trackPixel(event: PixelEvent) {
  window.fbq?.('track', event);
}

// Record a Contact event whenever a visitor taps any phone link on the page.
export function trackPhoneClicks() {
  document.addEventListener('click', (e) => {
    const link = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
    if (link) trackPixel('Contact');
  });
}
