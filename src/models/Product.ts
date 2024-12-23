export enum StarTypes {
  'One' = 1,
  'Two' = 2,
  'Three' = 3,
  'Four' = 4,
  'Five' = 5,
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
  ingredients: string; // Cambiar description a ingredients
  price: number; // Cambiar price a string (email)
  stock: boolean; // Cambiar availability a stock
  stars: StarTypes; // Cambiar rating a stars (enum de estrellas)
  image_url: string; // Cambiar image a image_url
  // ID como número entero
};

// Propiedades para el componente de formulario de comida
export interface FoodFormProps {
  onSubmit: (data: FoodFormData) => Promise<void>;
  onUpdate?: (foodId: number, updatedFood: FoodFormData) => Promise<void>; // Cambiar el tipo de id a number
  initialData?: FoodFormData;
  name: string;
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
