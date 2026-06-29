"use client";

import { motion } from "framer-motion";

const stats = [
  { number: "50+", label: "Health Facilities" },
  { number: "10K+", label: "Patients Reached" },
  { number: "24/7", label: "AI Assistance" },
  { number: "100+", label: "Communities Connected" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">
        {stats.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * .1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-3">
              {item.number}
            </h2>

            <p>{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}