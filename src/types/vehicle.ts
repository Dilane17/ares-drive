// ============================================================
// VEHICLE TYPES
// Core domain model for Ares Drive rental vehicles
// ============================================================

export type VehicleCategory = 'Supercar' | 'GT' | 'Sport' | 'SUV' | 'Cabriolet';

export interface VehicleSpecs {
  power: string;      // e.g. "770 ch"
  acceleration: string; // e.g. "2.8s (0-100)"
  topSpeed: string;   // e.g. "350 km/h"
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: VehicleCategory;
  price: number;        // EUR per day, minimum
  tagline: string;      // Short poetic line (Cardo italic in UI)
  image: string;        // Path relative to /public
  specs?: VehicleSpecs;
}
