import React from 'react';

export default function ReadBlog() {
  return (
    <div className="pt-20 min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-5 py-20">
        {/* Blog Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 font-heading">
            Blog Detail
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full"></div>
        </div>

        {/* Blog Content */}
        <article className="bg-white rounded-2xl shadow-soft overflow-hidden">
          {/* Blog Header Section */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 md:p-12 border-b border-primary-200">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 font-heading">
                Sample Blog Post Title
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-4 text-neutral-600 mb-6">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  By Author Name
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  December 15, 2024
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  5 min read
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  Training
                </span>
                <span className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm font-medium">
                  Development
                </span>
                <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
                  Professional Growth
                </span>
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-neutral-600 leading-relaxed mb-8 text-center">
                This is a placeholder for the blog content. The actual blog post content will be implemented here with proper formatting, images, and rich text elements.
              </p>
              
              <div className="bg-neutral-50 rounded-xl p-6 mb-8 border-l-4 border-primary-500">
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">Key Takeaways</h3>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold mt-1">•</span>
                    Important point about the topic
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold mt-1">•</span>
                    Another key insight to consider
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold mt-1">•</span>
                    Practical application of the concepts
                  </li>
                </ul>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              <p className="text-neutral-600 leading-relaxed mb-6">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>

          {/* Blog Footer */}
          <div className="bg-neutral-50 border-t border-neutral-200 p-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.734a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664L7.555 9.5A1 1 0 006 10.333z" />
                  </svg>
                  Like
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L3 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  Comment
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3 3 0 000-1.38l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  Share
                </button>
              </div>
              <div className="text-sm text-neutral-500">
                Last updated: December 15, 2024
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200"></div>
                <div className="p-6">
                  <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">
                    Related Blog Post Title {item}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                    Brief description of the related blog post content...
                  </p>
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span>Dec 10, 2024</span>
                    <span>3 min read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



