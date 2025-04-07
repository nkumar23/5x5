'use client';

import { motion } from 'framer-motion';

export default function InvestmentsPage() {
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
          <h1 className="text-5xl font-bold mb-6">Our Investments</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We partner with visionary entrepreneurs who are building the future through
            innovative technologies and groundbreaking ideas.
          </p>
        </motion.div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Portfolio Item Placeholder */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Company {item}</h3>
                <p className="text-gray-600 mb-4">
                  A brief description of the company and what makes it unique in its market.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    Technology
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    Innovation
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Approach */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Our Investment Approach</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              We focus on early-stage companies that demonstrate strong potential for
              growth and innovation in their respective markets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Vision</h3>
                <p className="text-gray-600">
                  We look for entrepreneurs with clear vision and the ability to
                  execute on ambitious goals.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Innovation</h3>
                <p className="text-gray-600">
                  Our portfolio companies are at the forefront of technological
                  innovation in their industries.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Impact</h3>
                <p className="text-gray-600">
                  We prioritize investments that have the potential to create
                  meaningful impact in the world.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 