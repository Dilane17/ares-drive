// ============================================================
// VEHICLES DATA
// Master fleet catalogue for Ares Drive
// Images must exist under /public/images/cars/
// ============================================================

import { Vehicle } from '@/types/vehicle';

export const vehicles: Vehicle[] = [
  {
    id: 'lamborghini-aventador-svj',
    slug: 'lamborghini-aventador-svj',
    name: 'Aventador SVJ',
    brand: 'Lamborghini',
    category: 'Supercar',
    price: 1490,
    tagline: "L'audace de l'extrême.",
    image: '/images/cars/lamborghini-aventador-svj/hero.jpg',
    specs: {
      power: '770 ch',
      acceleration: '2.8s',
      topSpeed: '350 km/h',
    },
  },
  {
    id: 'ferrari-296-gtb',
    slug: 'ferrari-296-gtb',
    name: '296 GTB',
    brand: 'Ferrari',
    category: 'Supercar',
    price: 1290,
    tagline: 'Le mythe italien.',
    image: '/images/cars/ferrari-296-gtb.jpg',
    specs: {
      power: '830 ch',
      acceleration: '2.9s',
      topSpeed: '330 km/h',
    },
  },
  {
    id: 'porsche-911-gt3rs',
    slug: 'porsche-911-gt3rs',
    name: '911 GT3 RS',
    brand: 'Porsche',
    category: 'Supercar',
    price: 890,
    tagline: 'La précision chirurgicale.',
    image: '/images/cars/porsche-911-gt3rs.jpg',
    specs: {
      power: '525 ch',
      acceleration: '3.2s',
      topSpeed: '296 km/h',
    },
  },
  {
    id: 'porsche-911-carrera',
    slug: 'porsche-911-carrera',
    name: '911 Carrera',
    brand: 'Porsche',
    category: 'Sport',
    price: 690,
    tagline: 'La légende du sport automobile.',
    image: '/images/cars/porsche-911-carrera.jpg',
    specs: {
      power: '385 ch',
      acceleration: '4.2s',
      topSpeed: '293 km/h',
    },
  },
  {
    id: 'porsche-718-boxster',
    slug: 'porsche-718-boxster',
    name: '718 Boxster',
    brand: 'Porsche',
    category: 'Cabriolet',
    price: 490,
    tagline: "La liberté à l'état pur.",
    image: '/images/cars/porsche-718-boxster.jpg',
    specs: {
      power: '300 ch',
      acceleration: '5.1s',
      topSpeed: '264 km/h',
    },
  },
  {
    id: 'mercedes-amg-sl43',
    slug: 'mercedes-amg-sl43',
    name: 'AMG SL 43',
    brand: 'Mercedes',
    category: 'GT',
    price: 590,
    tagline: 'Le grand tourisme réinventé.',
    image: '/images/cars/mercedes-amg-sl43.jpg',
    specs: {
      power: '381 ch',
      acceleration: '4.9s',
      topSpeed: '275 km/h',
    },
  },
  {
    id: 'alpine-a290-gt',
    slug: 'alpine-a290-gt',
    name: 'A290 GT',
    brand: 'Alpine',
    category: 'Sport',
    price: 290,
    tagline: "L'agilité à la française.",
    image: '/images/cars/alpine-a290-gt.jpg',
    specs: {
      power: '218 ch',
      acceleration: '6.4s',
      topSpeed: '200 km/h',
    },
  },
];

// First 3 vehicles — used on the homepage FleetPreview section
export const featuredVehicles = vehicles.slice(0, 3);
