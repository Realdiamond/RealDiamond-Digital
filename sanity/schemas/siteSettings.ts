import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'availabilityEnabled',
      title: 'Show Availability Badge',
      type: 'boolean',
      description: 'Toggle to show/hide the availability badge on the site',
      initialValue: true,
    }),
    defineField({
      name: 'availabilityMessage',
      title: 'Availability Message',
      type: 'string',
      description: 'The message to display in the availability badge',
      initialValue: 'Currently accepting new projects',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'availabilityColor',
      title: 'Badge Color',
      type: 'string',
      description: 'The color of the status dot',
      options: {
        list: [
          { title: 'Green (Available)', value: 'green' },
          { title: 'Yellow (Limited)', value: 'yellow' },
          { title: 'Red (Unavailable)', value: 'red' },
        ],
      },
      initialValue: 'green',
    }),
  ],
})
