import { Food } from '../models/Product';
import { FoodFormData } from '../models/Product';

export const foodService = {
  BASE_URL: 'https:/6766efb8560fbd14f18c8f94.mockapi.io',

  async getAll(): Promise<Food[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/product`);
      if (!response.ok) throw new Error('Error al obtener productos');
      return await response.json();
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error}`);
    }
  },

  async create(data: FoodFormData): Promise<Food> {
    try {
      const response = await fetch(`${this.BASE_URL}/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error al crear el producto');
      return await response.json();
    } catch (error) {
      throw new Error(`Error al crear el producto: ${error}`);
    }
  },

  async update(id: number, data: FoodFormData): Promise<Food> {
    console.log('Data', data);
    console.log('JSON', JSON.stringify(data));

    try {
      const response = await fetch(`${this.BASE_URL}/product/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        // Obtener detalles adicionales del error
        const errorDetails = await response.text();
        throw new Error(`Error al actualizar el producto: ${errorDetails}`);
      }

      console.log('response:', response);

      return await response.json();
    } catch (error: any) {
      // Si el error es un objeto, usar su mensaje o el mensaje por defecto
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error al actualizar el producto: ${errorMessage}`);
    }
  },

  async deleteById(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.BASE_URL}/product/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar el alimento');
    } catch (error) {
      throw new Error(`Error al eliminar el alimento: ${error}`);
    }
  },
};
