import { defineField, defineType } from "sanity";

export default defineType({
  name: "ctaBlock",
  title: "Call to Action Block",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonUrl",
      title: "Button URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonVariant",
      title: "Button Style",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Ghost", value: "ghost" },
        ],
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "buttonText",
    },
  },
});
