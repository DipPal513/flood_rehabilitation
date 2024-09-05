"use client";
import React from 'react';
import { events } from '../../../../public/data/events'; // Assuming your events data is here
import { useParams } from 'next/navigation';

const BlogPage = () => {
    const {slug} = useParams();
  const blog = events.find((e) => e.id == slug); // Fetch the first blog for demo purposes

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Blog Content */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Blog Image */}
        <div className="w-full h-64 sm:h-96">
          <img
            src={blog.img}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog Details */}
        <div className="p-6">
          {/* Blog Title */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            {blog.title}
          </h1>

          {/* Blog Description (HTML Content) */}
          <div
            className="text-gray-600 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.desc }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
