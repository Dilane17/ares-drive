// ============================================================
// WHATSAPP UTILITY
// Builds wa.me deep-link URLs with pre-filled booking messages
// TODO: Replace WHATSAPP_NUMBER with the real business number
// ============================================================

const WHATSAPP_NUMBER = '33600000000';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface BookingParams {
  model: string;
  dates: string;
  name: string;
  contact: string;
}

export function buildBookingMessage(params: BookingParams): string {
  const lines = [
    '🚗 Nouvelle demande de réservation — Ares Drive',
    '',
    `Modèle souhaité : ${params.model || 'Non précisé'}`,
    `Dates de location : ${params.dates || 'Non précisées'}`,
    `Nom : ${params.name || 'Non précisé'}`,
    `Contact : ${params.contact || 'Non précisé'}`,
    '',
    'Merci de me recontacter dans les plus brefs délais.',
  ];
  return lines.join('\n');
}
