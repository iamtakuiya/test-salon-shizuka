// sections/ReservationServices.tsx

import { FormLabel } from '@/components/04.atoms/FormLabel/FormLabel';

import { ServiceGallery } from '../components/services/ServiceGallery/ServiceGallery';
import { CategoryFocusPanel } from '../components/services/CategoryFocusPanel/CategoryFocusPanel';

import type { MenuCategory } from '@/utils/constants';
import type { MenuItem } from '@/utils/constants';

import { useServiceGallery } from '../hooks/useServiceGallery';
import { MENU_CATEGORIES } from '@/utils/constants';

type Props = {
  activeCategory: MenuCategory;
  activeCategoryId: string;

  selectedItems: Record<string, MenuItem>;

  onCategorySelect: (id: string) => void;
  onItemSelect: (
    categoryId: string,
    item: MenuItem
  ) => void;
};



export function ReservationServices({
  activeCategory,
  activeCategoryId,
  selectedItems,
  onCategorySelect,
  onItemSelect,
}: Props) {

  const gallery = useServiceGallery();

  function handleItemSelect(catId: string, item: MenuItem) {
    setSelectedItems((prev) => ({ ...prev, [catId]: item }));
  }

  const activeCategory = MENU_CATEGORIES.find((c) => c.id === activeCategoryId)!;

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
          // activeCategoryId={activeCategoryId}
          // onCategorySelect={onCategorySelect}
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