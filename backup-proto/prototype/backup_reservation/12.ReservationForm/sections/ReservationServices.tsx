// sections/ReservationServices.tsx

import { FormLabel } from '@/components/atoms/FormLabel/FormLabel';

import { ServiceGallery } from '../components/ServiceGallery/ServiceGallery';
import { CategoryFocusPanel } from '../components/CategoryFocusPanel/CategoryFocusPanel';

import type { MenuCategory } from '@/utils/constants';
import type { MenuItem } from '@/utils/constants';

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
  return (
    <>
      <section>
        <FormLabel>
          ご希望のヘアケアをお選びください
        </FormLabel>

        <ServiceGallery
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