import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Show this project in the homepage featured section',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web Design', value: 'web' },
          { title: 'SEO', value: 'seo' },
          { title: 'Branding', value: 'branding' },
          { title: 'E-commerce', value: 'ecommerce' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(250),
    }),
    defineField({
      name: 'image',
      title: 'Main Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'results',
      title: 'Key Results',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'E.g., "3x Conversion Rate", "First Page Rankings"',
    }),
    defineField({
      name: 'client',
      title: 'Client Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Client Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'industry',
          title: 'Industry',
          type: 'string',
        },
        {
          name: 'size',
          title: 'Company Size',
          type: 'string',
          placeholder: 'e.g., 50-100 employees',
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 5,
      description: 'The problem the client was facing',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      rows: 5,
      description: 'How you solved the problem',
    }),
    defineField({
      name: 'strategy',
      title: 'Strategy Points',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points describing your approach',
    }),
    defineField({
      name: 'services',
      title: 'Services Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 3,
        },
        {
          name: 'author',
          title: 'Author',
          type: 'string',
        },
        {
          name: 'role',
          title: 'Role',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'duration',
      title: 'Project Duration',
      type: 'string',
      placeholder: 'e.g., 12 weeks',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      placeholder: 'e.g., 2024',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image',
      client: 'client.name',
    },
    prepare(selection) {
      const { title, category, client } = selection
      return {
        title,
        subtitle: `${category} - ${client || 'No client'}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Year, New',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
})
