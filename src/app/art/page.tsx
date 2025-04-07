'use client';

import { motion } from 'framer-motion';

export default function ArtPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="text-5xl font-bold mb-6">Art Collection</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Exploring the intersection of creativity and innovation through our
            curated collection of contemporary art.
          </p>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Art Piece Placeholders */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: item * 0.1 }}
                className="group relative aspect-square bg-gray-100 rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gray-200" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Artwork {item}</h3>
                    <p className="text-sm text-gray-200">Artist Name</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Art Programs */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Art Programs</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Supporting artists through various initiatives and collaborations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-white/20 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-4">Artist Residencies</h3>
              <p className="text-gray-300 mb-6">
                Our residency program provides artists with space, resources, and
                support to create groundbreaking work.
              </p>
              <a
                href="/residencies"
                className="inline-block px-6 py-2 border border-white rounded-full
                  hover:bg-white hover:text-black transition-colors duration-200"
              >
                Learn More
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-white/20 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-4">Exhibitions</h3>
              <p className="text-gray-300 mb-6">
                We regularly host exhibitions featuring works from our collection
                and resident artists.
              </p>
              <a
                href="#"
                className="inline-block px-6 py-2 border border-white rounded-full
                  hover:bg-white hover:text-black transition-colors duration-200"
              >
                View Schedule
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 