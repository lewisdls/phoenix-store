import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "description",
      type: "string",
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    }),
    defineField({
      name: "versions",
      type: "array",
      of: [
        {
          name: "version",
          type: "object",
          fields: [
            {
              name: "size",
              type: "string",
              options: {
                list: [
                  { title: "Small", value: "Small" },
                  { title: "Medium", value: "Medium" },
                  { title: "Large", value: "Large" },
                ],
              },
              validation: (rule) => rule.required(),
            },
            {
              name: "color",
              type: "string",
              options: {
                list: [
                  { title: "Blue", value: "Blue" },
                  { title: "Black", value: "Black" },
                  { title: "Brown", value: "Brown" },
                  { title: "Green", value: "Green" },
                  { title: "Gray", value: "Gray" },
                  { title: "Peach", value: "Peach" },
                  { title: "Red", value: "Red" },
                  { title: "White", value: "White" },
                  { title: "Yellow", value: "Yellow" },
                ],
              },
              validation: (rule) => rule.required(),
            },
            {
              name: "stock",
              type: "number",
              validation: (rule) => rule.required().min(0).integer(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "color",
              type: "string",
              options: {
                list: [
                  { title: "Blue", value: "Blue" },
                  { title: "Black", value: "Black" },
                  { title: "Brown", value: "Brown" },
                  { title: "Gray", value: "Gray" },
                  { title: "Green", value: "Green" },
                  { title: "Peach", value: "Peach" },
                  { title: "Red", value: "Red" },
                  { title: "White", value: "White" },
                  { title: "Yellow", value: "Yellow" },
                ],
              },
            },
            {
              name: "images",
              type: "array",
              of: [{ name: "image", type: "image" }],
            },
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isTrending",
      type: "boolean",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      price: "price",
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `${select.price}`,
      };
    },
  },
});
