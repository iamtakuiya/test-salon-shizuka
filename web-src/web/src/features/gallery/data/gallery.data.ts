import type { GalleryItem } from '../types/gallery.types';

import { galleryImages } from './gallery.images';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'salon-interior',
    image: galleryImages.salonInterior.desktop,
    imageMobile: galleryImages.salonInterior.mobile,
    alt: 'Salon interior',
    label: 'Salon Interior',
  },
  {
    id: 'hair-styling',
    image: galleryImages.hairStyling.desktop,
    imageMobile: galleryImages.hairStyling.mobile,
    alt: 'Hair styling',
    label: 'Hair Styling',
  },
  {
    id: 'private-room',
    image: galleryImages.privateRoom.desktop,
    imageMobile: galleryImages.privateRoom.mobile,
    alt: 'Private room',
    label: 'Private Room',
  },
  {
    id: 'treatment',
    image: galleryImages.treatment.desktop,
    imageMobile: galleryImages.treatment.mobile,
    alt: 'Treatment',
    label: 'Treatment',
  },
  {
    id: 'relaxation',
    image: galleryImages.relaxation.desktop,
    imageMobile: galleryImages.relaxation.mobile,
    alt: 'Relaxation',
    label: 'Relaxation',
  },
];