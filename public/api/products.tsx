import { client } from '../../src/utils/fetchClient';
import { GeneralProduct } from '../../src/types/GeneralProduct';
import { Product } from '@/types/Product';

export interface CatalogResponse {
  collection: GeneralProduct[];
  count: number;
}

export interface ProductResponse {
  product: Product;
  productId: number;
}

export const getCatalogProducts = (
  category: string,
  page: number,
  paramsString: string = '',
) => {
  const pathSegments = ['/products', page ? String(page) : null].filter(
    Boolean,
  );
  const basePath = pathSegments.join('/');

  const queryParts = [
    category && `category=${category}`,
    paramsString.replace(/^\?/, ''),
  ].filter(Boolean);

  const queryString = queryParts.length ? `?${queryParts.join('&')}` : '';

  const fullUrl = `${basePath}${queryString}`;
  console.log(fullUrl);

  return client.get<CatalogResponse>(fullUrl);
};

export const getProduct = (path: string) => {
  return client.get<ProductResponse>(path);
};

// export const getTodos = () => {
//   return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
// };
// export const addTodo = (newTodo: Omit<Todo, 'id'>) => {
//   return client.post<Todo>(`/todos`, newTodo);
// };

// export const deleteTodo = (todoId: number) => {
//   return client.delete(`/todos/${todoId}`);
// };

// export const updateTodo = (todoId: number, data: Partial<Todo>) => {
//   return client.patch<Todo[]>(`/todos/${todoId}`, data);
// };
