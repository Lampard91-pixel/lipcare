"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Aisha B.", rating: 5, text: "The Velvet Matte is my new holy grail! It's so pigmented and doesn't dry out my lips at all. I'm obsessed.", image: "/logo.jpeg" },
  { name: "Tola S.", rating: 5, text: "I love the Cherry Pop gloss. It gives the perfect shine without being sticky. Smells amazing too!", image: "/logo.jpeg" },
  { name: "Funke A.", rating: 4, text: "The Sugar Kiss scrub has saved my lips this winter. It's gentle but effective. My lipstick applies so much smoother now.", image: "/logo.jpeg" },
  { name: "Chioma O.", rating: 5, text: "Finally, a lip balm that actually works! The Vanilla Kiss balm is super hydrating and lasts for hours.", image: "/logo.jpeg" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} className={i < rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
    ))}
  </div>
);

export default function ReviewsPage() {
  return (
    <div className="bg-gray-50 py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-900" style={{ fontFamily: 'var(--font-playfair)' }}>
            Words from our Community
          </h1>
          <p className="mt-4 text-lg text-gray-600">See what our amazing customers are saying about Lipcrush.</p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {reviews.map((review, i) => (
            <motion.div key={i} variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md border flex flex-col">
              <div className="flex items-center mb-4">
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <p className="text-gray-600 italic flex-grow">"{review.text}"</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 bg-white p-8 rounded-lg shadow-lg border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-cyan-900 mb-6 text-center">Leave a Review</h2>
          <form className="space-y-4 max-w-lg mx-auto">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-900 focus:border-cyan-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="flex mt-1"><StarRating rating={5} /></div>
            </div>
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700">Review</label>
              <textarea id="review" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-900 focus:border-cyan-900"></textarea>
            </div>
            <button type="submit" className="w-full py-2.5 px-4 bg-cyan-900 text-white font-semibold rounded-lg hover:bg-cyan-800 transition">
              Submit Review
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}