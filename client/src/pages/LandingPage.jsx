import React, { useEffect } from 'react';
import Footer from '../components/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LogIn, 
  Sparkles, 
  Book, 
  Users, 
  Zap, 
  ArrowRight,
  Laptop,
  Plane,
  UtensilsCrossed,
  Heart,
  GraduationCap,
  Film
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1">
    <Icon className="w-8 h-8 text-blue-400 mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const CategoryCard = ({ title, icon: Icon }) => (
  <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 p-8 hover:border-white/20 transition-all duration-300">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="mb-4 p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
        <Icon className="w-8 h-8 text-blue-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-gray-400">
        Explore {title.toLowerCase()} content
      </p>
    </div>
  </div>
);

function LandingPage() {
  const navigate = useNavigate();
  const authenticated = useSelector((state) => state.auth.isLoggedIn);
  
  const categories = [
    { title: 'Technology', icon: Laptop },
    { title: 'Travel', icon: Plane },
    { title: 'Food', icon: UtensilsCrossed },
    { title: 'Health', icon: Heart },
    { title: 'Education', icon: GraduationCap },
    { title: 'Entertainment', icon: Film }
  ];

  useEffect(() => {
    if (authenticated) {
      navigate('/home');
    }
  }, [authenticated, navigate]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white -mb-10">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="py-20 md:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
              Muse
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Explore ideas, share thoughts, and learn together in a community of
            curious minds.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-700 to-purple-700 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Get Started <LogIn className="ml-2 h-5 w-5" />
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto ml-5 px-8 py-3 text-lg font-medium text-white bg-trabsparent rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-gray-600 hover:border-gray-500"
            >
              Sign In
            </Link>
          </motion.div>
        </div>

        {/* Categories Section */}
        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Your Interests
            </h2>
            <p className="text-gray-400">
              Explore content across various categories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                icon={category.icon}
              />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Muse?
            </h2>
            <p className="text-gray-400">
              Experience the difference with our unique features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Sparkles}
              title="AI-Powered Discovery"
              description="Find content tailored to your interests with our smart recommendation engine"
            />
            <FeatureCard
              icon={Users}
              title="Vibrant Community"
              description="Connect with like-minded individuals and engage in meaningful discussions"
            />
            <FeatureCard
              icon={Zap}
              title="Real-time Engagement"
              description="Interact with content creators and fellow readers in real-time"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-12 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of curious minds exploring new ideas every day.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-all duration-300"
            >
              Join Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;