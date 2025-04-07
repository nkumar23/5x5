'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 px-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">5x5</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Where art meets innovation. We invest in visionaries, support artists,
            and build products that shape tomorrow.
          </p>
        </motion.div>
        
        {/* Abstract background pattern */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,#FFFFFF_0%,#F3F4F6_100%)]" />
      </section>

      {/* Featured Sections */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Investments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-4">Investments</h2>
              <p className="text-gray-600 mb-4">
                Supporting visionary entrepreneurs who are reshaping industries and
                creating meaningful impact.
              </p>
              <a href="/investments" className="text-black font-medium hover:underline">
                Explore Portfolio →
              </a>
            </motion.div>

            {/* Art */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-4">Art</h2>
              <p className="text-gray-600 mb-4">
                Championing creative expression through our collection, collaborations,
                and artistic initiatives.
              </p>
              <a href="/art" className="text-black font-medium hover:underline">
                View Gallery →
              </a>
            </motion.div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-4">Products</h2>
              <p className="text-gray-600 mb-4">
                Building innovative solutions that bridge the gap between technology
                and creativity.
              </p>
              <a href="/products" className="text-black font-medium hover:underline">
                Discover Products →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Residencies & Grants */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Residencies & Grants</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Supporting the next generation of artists and innovators through our
              residency programs and grant opportunities.
            </p>
            <a
              href="/residencies"
              className="inline-block px-8 py-3 border-2 border-white rounded-full
                hover:bg-white hover:text-black transition-colors duration-200"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
