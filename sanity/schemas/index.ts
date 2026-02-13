import { blogPost } from './blog'
import { project } from './project'
import { service } from './service'
import { testimonial } from './testimonial'
import { teamMember } from './teamMember'
import { faq } from './faq'
import { companyLogo } from './companyLogo'
import { category } from './category'
import { siteSettings } from './siteSettings'

export const schema = {
  types: [blogPost, project, service, testimonial, teamMember, faq, companyLogo, category, siteSettings],
}
