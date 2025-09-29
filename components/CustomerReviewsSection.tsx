"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Aisha B.",
    rating: 5,
    text: "Absolutely love the vanilla lip balm! It's so moisturizing and smells divine. My lips have never been softer. Highly recommend!",
    avatar: "https://i.pravatar.cc/48?u=aisha",
  },
  {
    id: 2,
    name: "Tunde O.",
    rating: 5,
    text: "I was skeptical at first, but this is the real deal. The lip scrub works wonders and the gloss gives a perfect shine without being sticky.",
    avatar: "https://i.pravatar.cc/48?u=tunde",
  },
  {
    id: 3,
    name: "Chiamaka E.",
    rating: 4,
    text: "Great products! The packaging is beautiful and the quality is top-notch. The lip oil is my favorite. Will be buying again.",
    avatar: "https://i.pravatar.cc/48?u=chiamaka",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 sm:h-5 sm:w-5 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

export default function CustomerReviewsSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold text-cyan-900"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            What Our Customers Say
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Real reviews from real lip care lovers.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                  src={review.avatar}
                  alt={review.name}
                />
                <div className="ml-3 sm:ml-4">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {review.name}
                  </p>
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                &quot;{review.text}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
