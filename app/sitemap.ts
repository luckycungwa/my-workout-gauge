import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap { return ['','/generate','/workout','/tools','/tools/1rm-calculator','/tools/bmi','/tools/tdee','/tools/protein','/history'].map(path=>({url:`https://workoutgauge.app${path}`,lastModified:new Date()})) }
