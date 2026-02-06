import { metadata, viewport } from 'next-sanity/studio'
import StudioClient from './studioClient'

export const dynamic = 'force-dynamic'

export { metadata, viewport }

export default function StudioPage() {
  return <StudioClient />
}
