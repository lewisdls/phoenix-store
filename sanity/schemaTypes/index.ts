import { type SchemaTypeDefinition } from "sanity";
import { productType } from "./productType";
import { categoryType } from "./categoryType";
import { headerType } from "./headerType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, headerType],
};
