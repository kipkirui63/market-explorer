import React from 'react';
import { Link } from 'wouter';

export default function HeroSection() {
  return (
    <div className="relative bg-[#f4faff] pt-16 pb-12">
      <div className="absolute inset-0 bg-[url('/media/brain-image.jpg')] opacity-5 bg-cover bg-center" />
      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 500 500" className="w-32 h-32" xmlns="http://www.w3.org/2000/svg">
            <path fill="#0099cc" d="M250.5 29C118 29 29 151.3 29 250c0 98.7 89 221 221.5 221S472 348.7 472 250c0-98.7-89-221-221.5-221zm-95.9 97.9c3.9 0 7.6.8 11 2.3 6.8 2.9 12.1 8.3 14.8 15.2 2.7 6.9 2.4 14.5-.8 21.1-3.2 6.7-9 11.6-16 13.7-7 2.1-14.6 1.3-21.1-2.3-6.5-3.5-11.2-9.5-13-16.5-1.7-7-1.1-13.2 4-21.2 5.2-8 13.9-12.3 21.1-12.3zm191.4 0c7.2 0 15.9 4.3 21.1 12.3 5.1 8 5.7 14.2 4 21.2-1.8 7-6.5 13-13 16.5-6.5 3.6-14.1 4.4-21.1 2.3-7-2.1-12.8-7-16-13.7-3.2-6.6-3.5-14.2-.8-21.1 2.7-6.9 8-12.3 14.8-15.2 3.4-1.5 7.1-2.3 11-2.3zm-139.3 60.4c9.7 0 17.5 7.8 17.5 17.5s-7.8 17.5-17.5 17.5-17.5-7.8-17.5-17.5 7.8-17.5 17.5-17.5zm87.3 0c9.7 0 17.5 7.8 17.5 17.5s-7.8 17.5-17.5 17.5-17.5-7.8-17.5-17.5 7.8-17.5 17.5-17.5zM158 247c6.6 0 12 5.4 12 12s-5.4 12-12 12-12-5.4-12-12 5.4-12 12-12zm182 0c6.6 0 12 5.4 12 12s-5.4 12-12 12-12-5.4-12-12 5.4-12 12-12zm-141 50c13.3 0 24 10.7 24 24s-10.7 24-24 24c-4 0-7.8-1-11.1-2.8-5.2 6-12.9 10-21.5 10-15.7 0-27.4-12.5-27.4-28.2 0-3.1.5-6.1 1.5-8.9 7-4.1 10.5-12.1 10.5-18.1H199zm70 0c0 6 3.5 14 10.5 18.1 1 2.8 1.5 5.8 1.5 8.9 0 15.7-11.7 28.2-27.4 28.2-8.6 0-16.3-4-21.5-10-3.3 1.8-7.1 2.8-11.1 2.8-13.3 0-24-10.7-24-24s10.7-24 24-24h48z"/>
          </svg>
        </div>
        <h1 className="text-5xl font-bold mb-1 text-[#003366]">Crisp AI</h1>
        <h2 className="text-2xl text-[#0099cc] mb-6">Artificial Intelligence</h2>
        <div className="w-full max-w-2xl mx-auto h-2 bg-[#0099cc] mb-8"></div>
        <p className="text-base mb-4 text-[#4a5568] max-w-2xl mx-auto">
          No longer just a futuristic concept—AI is here to revolutionize your business. Whether you're in sales, marketing, healthcare, or government, Crisp AI helps you unlock the true potential of Artificial Intelligence.
        </p>
        <p className="text-base mb-10 text-[#4a5568]">
          AI isn't one-size-fits-all, and neither are we.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/services" className="w-56 px-5 py-3 bg-[#0099cc] text-white rounded-full font-medium hover:bg-blue-600 transition">
            Get Started with Crisp AI Today!
          </Link>
          <Link href="/services" className="w-56 px-5 py-3 bg-[#0099cc] text-white rounded-full font-medium hover:bg-blue-600 transition">
            Multi-Agent Resume Analyzer
          </Link>
          <Link href="/services" className="w-56 px-5 py-3 bg-[#0099cc] text-white rounded-full font-medium hover:bg-blue-600 transition">
            AI Recruitment Assistant
          </Link>
        </div>
      </div>
    </div>
  );
}