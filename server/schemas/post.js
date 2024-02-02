import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'keywords',
      title: 'Tags',
      type: 'array',
      of: [
        { type: 'string' }
      ]
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),

    defineField({
      name: 'filesource',
      title: 'FileType',
      type: 'string',
      options: {
        list: [
          {
            title: "Image",
            value: "image"
          },
          {
            title: "Others",
            value: "others"
          },
        ],
        layout: "radio"
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.filesource !== "image"
    }),
    defineField({
      name: 'otherMedia',
      title: 'Other Media',
      type: 'file',
      hidden: ({ parent }) => parent?.filesource !== "others"

    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'string',
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: { type: "user" }
    }),
    defineField({
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          type: "reference",
          to: [{ type: "comments" }]
        }
      ]
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [
        {
          type: "reference",
          to: [{ type: "user" }]
        }
      ]
    }),
  ],
});
