import { Food } from '../models/Food';
import { FoodFormData } from '../models/Food';

export const foodService = {
  BASE_URL: 'https://67604df16be7889dc35d8988.mockapi.io',

  async getAll(): Promise<Food[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/food`);
      if (!response.ok) throw new Error('Error al obtener alimentos');
      return await response.json();
    } catch (error) {
      throw new Error(`Error al obtener alimentos: ${error}`);
    }
  },

  async create(data: FoodFormData): Promise<Food> {
    try {
      const response = await fetch(`${this.BASE_URL}/food`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error al crear el alimento');
      return await response.json();
    } catch (error) {
      throw new Error(`Error al crear el alimento: ${error}`);
    }
  },

  async update(id: string, data: FoodFormData): Promise<Food> {
    try {
      const response = await fetch(`${this.BASE_URL}/food/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error al actualizar el alimento');
      return await response.json();
    } catch (error) {
      throw new Error(`Error al actualizar el alimento: ${error}`);
    }
  },

  async deleteById(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.BASE_URL}/food/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar el alimento');
    } catch (error) {
      throw new Error(`Error al eliminar el alimento: ${error}`);
    }
  },
};
