import Gallery01 from '@assets/images/03.gallery/gallery-01.png';
import Gallery02 from '@assets/images/03.gallery/gallery-02.png';
import Gallery03 from '@assets/images/03.gallery/gallery-03.png';
import Gallery04 from '@assets/images/03.gallery/gallery-04.png';
import Gallery05 from '@assets/images/03.gallery/gallery-05.png';

import GalleryMobile01 from '@assets/images/03.gallery/mobile/gallery-01-m.png';
import GalleryMobile02 from '@assets/images/03.gallery/mobile/gallery-02-m.png';
import GalleryMobile03 from '@assets/images/03.gallery/mobile/gallery-03-m.png';
import GalleryMobile04 from '@assets/images/03.gallery/mobile/gallery-04-m.png';
import GalleryMobile05 from '@assets/images/03.gallery/mobile/gallery-05-m.png';

export const galleryImages = {
  salonInterior: {
    desktop: Gallery01,
    mobile: GalleryMobile01,
  },
  hairStyling: {
    desktop: Gallery02,
    mobile: GalleryMobile02,
  },
  privateRoom: {
    desktop: Gallery03,
    mobile: GalleryMobile03,
  },
  treatment: {
    desktop: Gallery04,
    mobile: GalleryMobile04,
  },
  relaxation: {
    desktop: Gallery05,
    mobile: GalleryMobile05,
  },
} as const;