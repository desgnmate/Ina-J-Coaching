import { defineField, defineType } from "sanity";

export default defineType({
  name: "embedBlock",
  title: "Embed Block",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "Paste a YouTube, Instagram, or other embeddable URL",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "url",
      subtitle: "caption",
    },
    prepare(selection) {
      return {
        ...selection,
        title: selection.title || "Embed",
        subtitle: selection.subtitle || "Embedded content",
      };
    },
  },
});
