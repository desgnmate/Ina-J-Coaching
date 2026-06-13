import { defineField, defineType } from "sanity";

export default defineType({
  name: "codeBlock",
  title: "Code Block",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "JavaScript", value: "javascript" },
          { title: "TypeScript", value: "typescript" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "Python", value: "python" },
          { title: "Shell", value: "shell" },
          { title: "JSON", value: "json" },
          { title: "Markdown", value: "markdown" },
          { title: "Plain Text", value: "text" },
        ],
      },
      initialValue: "javascript",
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      rows: 10,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "filename",
      title: "Filename",
      type: "string",
      description: "Optional filename to display above the code block",
    }),
  ],
  preview: {
    select: {
      title: "filename",
      subtitle: "language",
      code: "code",
    },
    prepare(selection) {
      const { title, code, subtitle } = selection;
      return {
        title: title || "Code Block",
        subtitle: `${subtitle} - ${code?.substring(0, 50)}...`,
      };
    },
  },
});
