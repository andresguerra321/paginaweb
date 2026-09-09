/**
 * Cloudflare Worker — AG Private Engineering
 * Handles secure endpoints and serves static assets.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, ''); // Normalize trailing slash

    // Secure WhatsApp redirection (protects phone number from web scrapers & bots)
    if (pathname === '/contacto/whatsapp' || pathname === '/whatsapp') {
      const defaultText = "Hola Andrés, vi tu sitio web y me gustaría hablar sobre un proyecto";
      const customText = url.searchParams.get('text') || defaultText;
      const phone = "573185602203";
      const targetUrl = `https://wa.me/${phone}?text=${encodeURIComponent(customText)}`;
      
      return Response.redirect(targetUrl, 302);
    }

    // Pass-through to Cloudflare Static Assets
    return env.ASSETS.fetch(request);
  }
};
