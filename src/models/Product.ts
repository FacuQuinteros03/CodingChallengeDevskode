export enum StarTypes {
  'One' = '1',
  'Two' = '2',
  'Three' = '3',
  'Four' = '4',
  'Five' = '5',
}

export interface Food {
  id: number;
  name: string;
  ingredients: string;
  price: number;
  stock: boolean;
  image_url: string;
  stars: StarTypes;
}

export type FoodFormData = {
  id: number;
  name: string;
  ingredients: string;
  price: number;
  stock: boolean;
  stars: StarTypes;
  image_url: string;
};

export interface FoodFormProps {
  onSubmit: (data: FoodFormData) => Promise<void>;
  onUpdate?: (foodId: number, updatedFood: FoodFormData) => Promise<void>;
  initialData?: FoodFormData;
  submitLabel: string;
  onClose?: () => void;
}

export interface FoodListProps {
  foods: Food[];
  setFoods: (newFoods: Food[]) => void;
}

export interface FilterOptions {
  name: string;
  minPrice: number | null;
  maxPrice: number | null;
  stars: StarTypes | null;
}

export interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  showCreateFoodModal: () => void;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
