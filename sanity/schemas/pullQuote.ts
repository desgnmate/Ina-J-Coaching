import { defineField, defineType } from "sanity";

export default defineType({
  name: "pullQuote",
  title: "Pull Quote",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Quote Text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
      type: "string",
      description: "Who said or wrote this quote",
    }),
  ],
  preview: {
    select: {
      title: "text",
      subtitle: "attribution",
    },
  },
});
