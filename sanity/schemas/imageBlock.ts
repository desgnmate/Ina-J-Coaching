import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageBlock",
  title: "Image Block",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "alignment",
      title: "Alignment",
      type: "string",
      options: {
        list: [
          { title: "Full Width", value: "full" },
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
      },
      initialValue: "full",
    }),
  ],
  preview: {
    select: {
      media: "image",
      title: "caption",
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: "Image Block",
      };
    },
  },
});
