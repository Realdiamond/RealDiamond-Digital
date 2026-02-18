import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  token: process.env.SANITY_API_TOKEN, // For write operations
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  // Return null if source is invalid
  if (!source || !source.asset) {
    return null
  }
  return builder.image(source)
}

