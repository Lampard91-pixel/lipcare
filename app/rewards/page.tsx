import { Gift, DollarSign, Star, ArrowRight } from 'lucide-react';

const RewardTier = ({ title, points, description, bgColor }: { title: string, points: string, description: string, bgColor: string }) => (
  <div className={`p-6 rounded-lg shadow-md ${bgColor} text-white`}>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-3xl font-extrabold my-2">{points}</p>
    <p className="text-sm">{description}</p>
  </div>
);

export default function RewardsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Gift className="mx-auto h-16 w-16 text-pink-500" />
          <h1 className="mt-4 text-4xl font-extrabold text-cyan-900" style={{ fontFamily: 'var(--font-playfair)' }}>
            Lipcrush Rewards
          </h1>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
            Join our loyalty program and get rewarded for your love of lip care. Earn points, unlock exclusive perks, and enjoy the best of Lipcrush.
          </p>
          <button className="mt-6 bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition shadow-lg">
            Join Now & Get 50 Points
          </button>
        </section>

        {/* How to Earn Points */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-cyan-900 text-center mb-8">How to Earn Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Star className="mx-auto h-10 w-10 text-cyan-800" />
              <h3 className="mt-4 font-semibold text-lg">Sign Up</h3>
              <p className="text-gray-600">Get 50 points just for joining.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <DollarSign className="mx-auto h-10 w-10 text-cyan-800" />
              <h3 className="mt-4 font-semibold text-lg">Shop</h3>
              <p className="text-gray-600">Earn 1 point for every ₦1 spent.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <Gift className="mx-auto h-10 w-10 text-cyan-800" />
              <h3 className="mt-4 font-semibold text-lg">Birthday Treat</h3>
              <p className="text-gray-600">Get 100 bonus points on your birthday.</p>
            </div>
          </div>
        </section>

        {/* How to Redeem Points */}
        <section>
          <h2 className="text-2xl font-bold text-cyan-900 text-center mb-8">Redeem Your Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RewardTier
              title="₦500 Off"
              points="100 PTS"
              description="A sweet little discount for your next purchase."
              bgColor="bg-cyan-700"
            />
            <RewardTier
              title="₦1,500 Off"
              points="250 PTS"
              description="Perfect for stocking up on your favorites."
              bgColor="bg-cyan-800"
            />
            <RewardTier
              title="Free Shipping"
              points="500 PTS"
              description="Get your order delivered to your doorstep for free."
              bgColor="bg-cyan-900"
            />
          </div>
        </section>

        {/* FAQ Link */}
        <section className="text-center mt-16">
            <a href="/faq" className="text-cyan-800 font-semibold group">
                <span>Have questions? Check out our Rewards FAQ</span>
                <ArrowRight className="inline-block ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
        </section>
      </main>
    </div>
  );
}

