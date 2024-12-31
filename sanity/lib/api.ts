import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

export const getProducts = async () => {
  const allProductsQuery = defineQuery(`
        *[
            _type == "product"
        ]`);
  try {
    const products = await sanityFetch({ query: allProductsQuery });
    return products.data || [];
  } catch (error) {
    console.log(error);
  }
};

export const getSimilarProducts = async (id: string) => {
  const similarProductsQuery = defineQuery(`
        *[
            _type == "product" && categories[0]._ref == "${id}"
        ]`);
  try {
    const products = await sanityFetch({ query: similarProductsQuery });
    return products.data || [];
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (id: string | string[] | undefined) => {
  const productQuery = defineQuery(`
        *[
            _type == "product" && slug.current == "${id}"
        ]`);
  try {
    const product = await sanityFetch({ query: productQuery });
    return product.data || [];
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  const allCategoriesQuery = defineQuery(`
        *[
            _type == "category"
        ] | order(title asc)`);
  try {
    const categories = await sanityFetch({ query: allCategoriesQuery });
    return categories.data || [];
  } catch (error) {
    console.log(error);
  }
};

export const getHeaders = async () => {
  const allHeadersQuery = defineQuery(`
        *[
            _type == "header"
        ]`);
  try {
    const headers = await sanityFetch({ query: allHeadersQuery });
    return headers.data || [];
  } catch (error) {
    console.log(error);
  }
};
