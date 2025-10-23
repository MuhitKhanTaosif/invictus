import React from 'react';
import { Link } from 'react-router';

const CourseCard = ({ course }) => {
  // Generate placeholder image based on category
  const getCategoryImage = (category) => {
    const images = {
      'First Aid': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      'Mental Health': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'Professional Development': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      'Wellbeing': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    };
    return images[category] || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop';
  };

  return (
    <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl overflow-hidden transition-all duration-300 border-2 border-transparent cursor-pointer shadow-soft hover:-translate-y-2 hover:shadow-medium hover:border-primary-300 group">
      <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
        <img
          src={getCategoryImage(course.category)}
          alt={course.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/10 transition-opacity duration-300 group-hover:opacity-80"></div>
        <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {course.category}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {course.code}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-neutral-800 mb-3 transition-colors duration-300 group-hover:text-primary-600 font-heading overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
          {course.title}
        </h3>

        <p className="text-neutral-600 text-sm mb-4 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
          <span className="flex items-center gap-1">
            <span>⏱️</span>
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <span>💰</span>
            {course.cost}
          </span>
        </div>

        <Link
          to={course.path}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-1 group/btn w-full"
        >
          FIND OUT MORE
          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;


