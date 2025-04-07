'use client';

import { motion } from 'framer-motion';

export default function ResidenciesPage() {
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
          <h1 className="text-5xl font-bold mb-6">Residencies & Grants</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Supporting the next generation of artists and innovators through our
            comprehensive residency programs and grant opportunities.
          </p>
        </motion.div>
      </section>

      {/* Current Programs */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Current Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Artist Residency',
                duration: '3 months',
                deadline: 'March 31, 2024',
                description:
                  'A fully-funded residency program for emerging artists working at the intersection of art and technology.',
              },
              {
                title: 'Innovation Grant',
                duration: '6 months',
                deadline: 'April 15, 2024',
                description:
                  'Financial support and mentorship for entrepreneurs developing groundbreaking solutions in creative technologies.',
              },
            ].map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
                <div className="flex gap-4 mb-4">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {program.duration}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    Deadline: {program.deadline}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{program.description}</p>
                <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Program Benefits</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our programs provide comprehensive support to help you realize your vision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Financial Support',
                description: 'Monthly stipend and project funding to support your work.',
              },
              {
                title: 'Workspace & Resources',
                description: 'Access to state-of-the-art facilities and equipment.',
              },
              {
                title: 'Mentorship',
                description: 'Guidance from industry experts and established artists.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 text-center"
              >
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Application Process</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A simple and transparent process to help you focus on what matters most.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              'Submit Application',
              'Portfolio Review',
              'Interview',
              'Final Selection',
            ].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex items-center justify-center mb-4">
                  <span className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-center">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 