import { defineField, defineType } from "sanity";

export default defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Tip", value: "tip" },
          { title: "Note", value: "note" },
          { title: "Warning", value: "warning" },
          { title: "Important", value: "important" },
        ],
      },
      initialValue: "tip",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional title for the callout",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      text: "text",
    },
    prepare(selection) {
      const { title, text, subtitle } = selection;
      return {
        title: title || text,
        subtitle: `Callout: ${subtitle}`,
      };
    },
  },
});
