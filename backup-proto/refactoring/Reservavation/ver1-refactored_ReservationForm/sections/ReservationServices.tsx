// sections/ReservationServices.tsx

import { FormLabel } from '@/components/04.atoms/FormLabel/FormLabel';

import { ServiceGallery } from '../components/services/ServiceGallery/ServiceGallery';
import { CategoryFocusPanel } from '../components/services/CategoryFocusPanel/CategoryFocusPanel';

import type { MenuCategory } from '@/utils/constants';
import type { MenuItem } from '@/utils/constants';

import { useServiceGalleryController } from '../hooks/useServiceGalleryController';

type Props = {
  activeCategory: MenuCategory;
  activeCategoryId: string;

  selectedItems: Record<string, MenuItem>;

  onCategorySelect: (id: string) => void;

  onItemSelect: (
    categoryId: string,
    item: MenuItem
  ) => void;

  gallery: ReturnType<
    typeof useServiceGalleryController
  >;
};


export function ReservationServices({
  activeCategory,
  activeCategoryId, // <- don't leave this or others out!
  selectedItems,
  gallery,
  onCategorySelect,
  onItemSelect,
}: Props) {

  return (
    <>
      <section>
        <FormLabel>
          ご希望のヘアケアをお選びください
        </FormLabel>

        <ServiceGallery
          page={gallery.page}
          totalPages={gallery.totalPages}
          onNext={gallery.next}
          onPrev={gallery.prev}
          onPageSelect={gallery.goTo} // Maps to your new hook's goTo function
          perPage={gallery.perPage}
          isGrid={gallery.isGrid}
          activeCategoryId={activeCategoryId}
          onCategorySelect={onCategorySelect}
        />
      </section>

      <section>
        <FormLabel>
          {activeCategory.category} — メニュー
        </FormLabel>

        <CategoryFocusPanel
          category={activeCategory}
          selectedItems={selectedItems}
          onItemSelect={onItemSelect}
        />
      </section>
    </>
  );
}