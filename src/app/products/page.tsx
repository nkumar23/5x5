'use client';

import { motion } from 'framer-motion';

export default function ProductsPage() {
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
          <h1 className="text-5xl font-bold mb-6">Our Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Innovative solutions that bridge the gap between technology and creativity,
            designed to inspire and empower.
          </p>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[1, 2].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-64 bg-gray-200" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Featured Product {item}</h3>
                  <p className="text-gray-600 mb-6">
                    A comprehensive description of the product and its innovative
                    features that make it unique in the market.
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                      Learn More
                    </button>
                    <button className="px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors">
                      Try Demo
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Product Categories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our range of products designed for different creative needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Creative Tools', 'Digital Solutions', 'Innovation Platforms'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 border border-gray-200 rounded-2xl hover:border-black transition-colors"
              >
                <h3 className="text-2xl font-bold mb-4">{category}</h3>
                <p className="text-gray-600 mb-6">
                  Discover our suite of products designed to enhance creativity and
                  productivity in the digital age.
                </p>
                <a href="#" className="text-black font-medium hover:underline">
                  Explore {category} →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of creators and innovators who are already using our products.
            </p>
            <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 