import React, { useState } from 'react';
import { Calendar, Phone, ChevronLeft } from 'lucide-react';

interface StepThreeProps {
  onPrevious: () => void;
  onBookCall: () => void;
  onSkipCall: () => void;
}

export function StepThree({ onPrevious, onBookCall, onSkipCall }: StepThreeProps) {
  const [hasClickedBooking, setHasClickedBooking] = useState(false);

  const handleBookCallClick = () => {
    setHasClickedBooking(true);
    // Store the booking click in sessionStorage to persist across page refreshes
    sessionStorage.setItem('hasClickedBooking', 'true');
    // Open the calendar link in a new tab
    window.open('https://calendar.app.google/AMUfB4Zqsw2wwiFH6', '_blank');
    onBookCall();
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-8 rounded-2xl shadow-lg border border-blue-500/20">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-4">
            <Calendar className="w-12 h-12 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-blue-100">
            Book Your Free Strategy Call
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            We've noticed you're ready to make a significant investment in your future. 
            Let's schedule a free strategy call with one of our expert coaches to discuss 
            your goals and create a personalized plan for success.
          </p>
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-3 text-blue-200">
              <Phone className="w-5 h-5 text-blue-400" />
              <span>30-minute call</span>
            </div>
            <div className="flex items-center gap-3 text-blue-200">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span>Choose your time</span>
            </div>
          </div>
          <div className="pt-8">
            <button
              onClick={handleBookCallClick}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 font-semibold transform hover:scale-[1.02] inline-flex items-center gap-3"
            >
              Book Your Call
              <Calendar className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button
          className="group px-8 py-4 bg-gray-800/50 text-blue-200 rounded-xl border border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-100 transition-all duration-300 flex items-center gap-2 font-semibold"
          onClick={onPrevious}
        >
          <ChevronLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
          Previous Step
        </button>
        <button
          className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 font-semibold transform hover:scale-[1.02]"
          onClick={onSkipCall}
        >
          Skip Call & Continue
        </button>
      </div>
    </div>
  );
}