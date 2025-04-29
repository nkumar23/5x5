export type ContentKey = 'About' | 'Art' | 'Products' | 'Investments' | 'Grants';

export const placeholderContent: Record<ContentKey, { text: string; link: string }> = {
  'About': {
    text: 'We are a collective of builders, artists, and investors working to shape the future of technology and culture.',
    link: '/about'
  },
  'Art': {
    text: 'Explore our curated collection of digital and physical artworks at the intersection of technology and creativity.',
    link: '/art'
  },
  'Products': {
    text: 'Discover innovative products that push the boundaries of what\'s possible in technology and art.',
    link: '/products'
  },
  'Investments': {
    text: 'We invest in early-stage companies building the future of technology, art, and culture.',
    link: '/investments'
  },
  'Grants': {
    text: 'We provide grants to support innovative projects at the intersection of technology and art.',
    link: '/grants'
  }
}; 