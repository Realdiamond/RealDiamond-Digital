import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemas'
import { apiVersion, dataset, projectId } from './sanity/env'
import { codeInput } from '@sanity/code-input'

export default defineConfig({
  name: 'realdiamond-digital',
  title: 'RealDiamond Digital CMS',

  projectId,
  dataset,

  plugins: [
    structureTool({ name: 'myworks', title: 'Structure' }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
  ],

  schema,
})
