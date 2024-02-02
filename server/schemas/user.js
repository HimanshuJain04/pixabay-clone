import { defineType, defineField } from "sanity";

export default defineType({
    name: "user",
    title: "User",
    type: "document",
    fields: [
        defineField({
            name: "displayName",
            title: "Name",
            type: "string"
        }),
        defineField({
            name: "uid",
            title: "UserId",
            type: "string"
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string"
        }),
        defineField({
            name: "phoneNumber",
            title: "Contact Number",
            type: "string"
        }),
        defineField({
            name: "imageUrl",
            title: "Profile Image",
            type: "string"
        }),
    ]
});