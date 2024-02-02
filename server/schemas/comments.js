import { defineType, defineField } from "sanity";


export default defineType({
    name: "comments",
    title: "Comments",
    type: "document",
    fields: [
        defineField({
            name: "comment",
            title: "Comment",
            type: "string"
        }),
        defineField({
            name: "user",
            title: "User",
            type: "reference",
            to: { type: "user" }
        }),
    ]
});
