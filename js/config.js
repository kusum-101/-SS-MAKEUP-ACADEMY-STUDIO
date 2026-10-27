/*
 * SITE CONFIGURATION — the single place to change contact details and WhatsApp messages.
 *
 * ⚠ OWNER CONFIRMATION REQUIRED BEFORE LAUNCH:
 *   - whatsappNumber: supplied by the client brief (9999619414). It could not be
 *     independently verified from public sources as the business's WhatsApp number.
 *   - Confirm the phone number, address and services with the owner.
 * See BUSINESS_RESEARCH.md for details.
 */
window.SITE_CONFIG = {
  businessName: "SS Makeup Academy & Studio",

  // Country code + number, digits only (India = 91). Used for wa.me links.
  whatsappNumber: "919999619414",

  // Shown on the page and used for tel: links.
  phoneDisplay: "+91 99996 19414",
  phoneTel: "+919999619414",

  mapsUrl: "https://maps.app.goo.gl/tiCRcnQ6YAvM84Hd7",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=28.6040951%2C77.3436514",

  // Leave empty until the official profile is confirmed; the Instagram button stays hidden while empty.
  instagramUrl: "",

  // Pre-filled WhatsApp messages. Keys are referenced by data-wa="..." attributes in index.html.
  messages: {
    default:
      "Hello! I found SS Makeup Academy & Studio online. I would like to know more about your makeup services and academy courses. Please share the available options and details.",
    course:
      "Hello! I am interested in your makeup course. Could you please share the course details, fees, and upcoming batch information?",
    bridal:
      "Hello! I am interested in bridal makeup at SS Makeup Academy & Studio. Could you please share details and availability?",
    party:
      "Hello! I would like to book party makeup at SS Makeup Academy & Studio. Could you please share details and availability?",
    engagement:
      "Hello! I am looking for engagement / reception makeup at SS Makeup Academy & Studio. Could you please share details and availability?",
    hair:
      "Hello! I would like to know about hairstyling at SS Makeup Academy & Studio. Could you please share details and availability?",
  },
};
