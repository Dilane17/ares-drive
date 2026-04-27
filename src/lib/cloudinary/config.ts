// src/lib/cloudinary/config.ts
// ============================================================
// Cloudinary configuration
// Used by upload components and image transformation helpers
// ============================================================

export const cloudinaryConfig = {
  cloudName:    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  folders: {
    vehicles: 'ares-drive/vehicles',
    heroes:   'ares-drive/heroes',
    about:    'ares-drive/about',
  },
} as const

// ============================================================
// Helper — build optimized Cloudinary URL
// Automatically serves WebP, resized to given width
// ============================================================
export function getCloudinaryUrl(
  publicId: string,
  width: number = 800,
  quality: string = 'auto'
): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  
  // Explications des filtres ajoutés :
  // a_exif : Si l'image a été prise à la verticale (ex: smartphone) et sauvegardée tournée, ça la remet droite automatiquement.
  // e_improve : Ajuste automatiquement le contraste et l'exposition (meilleure qualité).
  // e_sharpen:150 : Défloute et rend l'image plus nette.
  return `https://res.cloudinary.com/${cloud}/image/upload/w_${width},q_${quality},f_auto,a_exif,e_improve,e_sharpen:150/${publicId}`
}
