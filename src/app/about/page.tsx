'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
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
          <h1 className="text-5xl font-bold mb-6">About 5x5</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are a unique venture that bridges the worlds of art, technology, and
            innovation, fostering creativity and entrepreneurship.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8"
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg">
                To create a dynamic ecosystem where art and entrepreneurship converge,
                fostering innovation and creative expression that pushes boundaries
                and creates meaningful impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8"
            >
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-600 text-lg">
                To be the leading platform where artists, entrepreneurs, and innovators
                come together to shape the future of creative technology and cultural
                expression.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide our work and relationships.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description:
                  'We believe in pushing boundaries and exploring new possibilities.',
              },
              {
                title: 'Collaboration',
                description:
                  'We foster meaningful partnerships that create lasting impact.',
              },
              {
                title: 'Impact',
                description:
                  'We strive to make a positive difference in art and technology.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 border border-gray-200 rounded-2xl"
              >
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Our Team</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A diverse group of professionals passionate about art, technology, and
              innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <motion.div
                key={member}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gray-800 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Team Member {member}</h3>
                <p className="text-gray-400">Position</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 