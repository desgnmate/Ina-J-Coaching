import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      description: "Category accent color",
      options: {
        list: [
          { title: "Terracotta", value: "#D46858" },
          { title: "Gold", value: "#B08180" },
          { title: "Sage", value: "#8B9D83" },
          { title: "Dusty Blue", value: "#7B9DAD" },
          { title: "Mauve", value: "#A67B8D" },
        ],
      },
      initialValue: "#D46858",
    }),
  ],
  preview: {
    select: {
      title: "title",
      color: "color",
    },
    prepare(selection) {
      const { color } = selection;
      return {
        ...selection,
        subtitle: color,
      };
    },
  },
});
