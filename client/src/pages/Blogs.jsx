import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Professional Development",
    excerpt: "Exploring the latest trends and innovations in professional development and how they're shaping the future of work.",
    author: "Sarah Johnson",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "Professional Development",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Building Effective Teams in Remote Environments",
    excerpt: "Learn the essential strategies for creating and maintaining high-performing teams in distributed work environments.",
    author: "Michael Chen",
    date: "December 12, 2024",
    readTime: "7 min read",
    category: "Leadership",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    featured: false
  },
  {
    id: 3,
    title: "Mental Health in the Workplace: A Comprehensive Guide",
    excerpt: "Understanding the importance of mental health support in modern workplaces and implementing effective wellness programs.",
    author: "Dr. Emily Rodriguez",
    date: "December 10, 2024",
    readTime: "8 min read",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    featured: false
  },
  {
    id: 4,
    title: "First Aid Training: Essential Skills for Everyone",
    excerpt: "Why first aid training is crucial for workplace safety and how to implement effective training programs.",
    author: "James Wilson",
    date: "December 8, 2024",
    readTime: "6 min read",
    category: "Safety",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    featured: false
  },
  {
    id: 5,
    title: "The Art of Effective Communication",
    excerpt: "Master the skills of clear, persuasive communication that drives results in both personal and professional settings.",
    author: "Lisa Thompson",
    date: "December 5, 2024",
    readTime: "4 min read",
    category: "Communication",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    featured: false
  },
  {
    id: 6,
    title: "Workplace Safety: Beyond Compliance",
    excerpt: "Creating a culture of safety that goes beyond meeting regulations to truly protect and empower your workforce.",
    author: "Robert Martinez",
    date: "December 3, 2024",
    readTime: "9 min read",
    category: "Safety",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    featured: false
  }
];

const categories = ["All", "Professional Development", "Leadership", "Wellness", "Safety", "Communication"];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20 min-h-screen bg-neutral-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-warm-200 via-warm-300 to-warm-400 py-16 lg:py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-warm-100/20 via-transparent to-warm-200/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 font-heading"
          >
            Blog
          </motion.h1>
          <div className="text-neutral-700 font-medium">
            <a 
              href="/" 
              className="text-neutral-700 hover:text-neutral-900 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-all duration-300 backdrop-blur-sm"
            >
              HOME
            </a>
            <span className="mx-2">&gt;</span>
            <span className="text-neutral-900 underline font-semibold">BLOG</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 py-20">
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-primary-50 hover:border-primary-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.find(post => post.featured) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">Featured Post</h2>
            {(() => {
              const featuredPost = filteredPosts.find(post => post.featured);
              return (
                <Link to={`/blog/${featuredPost.id}`} className="block group">
                  <div className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300 group-hover:-translate-y-1">
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <div className="h-64 md:h-full bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
                          <img
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                              Featured
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/2 p-8">
                        <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            {featuredPost.author}
                          </span>
                          <span>{featuredPost.date}</span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                          {featuredPost.title}
                        </h3>
                        <p className="text-neutral-600 leading-relaxed mb-6">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                            {featuredPost.category}
                          </span>
                          <span className="text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
                            Read More →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })()}
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">
            {selectedCategory === "All" ? "All Posts" : `${selectedCategory} Posts`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.id}`} className="block group">
                  <div className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300 group-hover:-translate-y-1">
                    <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-neutral-600 mb-3">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                          {post.category}
                        </span>
                        <span className="text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">Stay Updated</h3>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            Get the latest insights on professional development, leadership, and workplace wellness delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

