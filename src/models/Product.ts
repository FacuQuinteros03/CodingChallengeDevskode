export enum StarTypes {
  'One' = '1',
  'Two' = '2',
  'Three' = '3',
  'Four' = '4',
  'Five' = '5',
}

// Adaptar la interfaz Food al modelo product
export interface Food {
  id: number;
  name: string;
  ingredients: string;
  price: number;
  stock: boolean;
  image_url: string;
  stars: StarTypes;
}

// Datos para el formulario (crear y editar comida)
export type FoodFormData = {
  id: number;
  name: string;
  ingredients: string;
  price: number;
  stock: boolean;
  stars: StarTypes;
  image_url: string;
};

// Propiedades para el componente de formulario de comida
export interface FoodFormProps {
  onSubmit: (data: FoodFormData) => Promise<void>;
  onUpdate?: (foodId: number, updatedFood: FoodFormData) => Promise<void>;
  initialData?: FoodFormData;
  submitLabel: string;
  onClose?: () => void;
}

// Propiedades para la lista de comida
export interface FoodListProps {
  foods: Food[];
  setFoods: (newFoods: Food[]) => void;
}

// Propiedades para el componente de barra de filtros
export interface FilterBarProps {
  onAddFood: (food: Food) => void;
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>;
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
