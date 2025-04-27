import { GeneralProduct } from '@/types/GeneralProduct';

const baseCountofItems = 10;

export const getHotPrice = (items: GeneralProduct[]) => {
  return [...items]
    .sort((a, b) => {
      const firstDiference = a.fullPrice - a.price;
      const secondDiference = b.fullPrice - b.price;
      return firstDiference - secondDiference;
    })
    .slice(0, baseCountofItems);
};
export const getNewModels = (items: GeneralProduct[]) => {
  return [...items].sort((a, b) => b.year - a.year).slice(0, baseCountofItems);
};

export const getRandom = (items: GeneralProduct[]) => {
  const randomIdxArr = generateRandomIdx(items.length, baseCountofItems);
  return items.filter((_, idx) => randomIdxArr.includes(idx));
};

function generateRandomIdx(itemsLength: number, count: number) {
  const indexes = new Set();

  while (indexes.size < count) {
    const randomIndex = Math.floor(Math.random() * itemsLength);
    indexes.add(randomIndex);
  }

  return Array.from(indexes);
}
