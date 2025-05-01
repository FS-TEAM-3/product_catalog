import { ColorSlug } from '@/constants/colors';

export interface DescriptionLocale {
  title: string;
  text: string[];
}

export interface DescriptionBlock {
  _id: string;
  eng: DescriptionLocale;
  ukr: DescriptionLocale;
}

export type Product = {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: ColorSlug[];
  color: string[] | string;
  images: string[];
  description: DescriptionBlock[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[] | string;
};
