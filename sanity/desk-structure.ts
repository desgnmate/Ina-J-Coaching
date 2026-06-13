import type { StructureBuilder } from "sanity/structure";

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Blog section
      S.listItem()
        .title("Blog Posts")
        .child(
          S.list()
            .title("Blog Posts")
            .items([
              S.listItem()
                .title("All Posts")
                .child(
                  S.documentTypeList("post")
                    .title("All Posts")
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .title("Published Posts")
                .child(
                  S.documentList()
                    .title("Published Posts")
                    .filter('_type == "post" && defined(publishedAt)')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .title("Drafts")
                .child(
                  S.documentList()
                    .title("Drafts")
                    .filter('_type == "post" && !defined(publishedAt)'),
                ),
              S.listItem()
                .title("Featured Posts")
                .child(
                  S.documentList()
                    .title("Featured Posts")
                    .filter('_type == "post" && featured == true')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ]),
                ),
            ]),
        ),
      // Divider
      S.divider(),
      // Categories
      S.listItem()
        .title("Categories")
        .child(S.documentTypeList("category").title("Categories")),
      // Authors
      S.listItem()
        .title("Authors")
        .child(S.documentTypeList("author").title("Authors")),
      // Divider
      S.divider(),
      // All document types that aren't handled above
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["post", "category", "author"].includes(listItem.getId()!),
      ),
    ]);
