import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FormData } from '../../types';

interface StepTwoProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onPrevious: () => void;
  onNext: () => void;
  isHighValueInvestor: boolean;
}

export function StepTwo({ formData, setFormData, onPrevious, onNext, isHighValueInvestor }: StepTwoProps) {
  return (
    <div className="space-y-8">
      {/* Prior Experience */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-8 rounded-2xl shadow-lg border border-blue-500/20">
        <h3 className="text-xl font-bold text-blue-100 mb-6">Do you have any prior experience?</h3>
        <div className="space-y-4">
          {[
            { value: 'amazon', label: "I've launched on Amazon before" },
            { value: 'ecommerce', label: "I've been involved with e-commerce" },
            { value: 'research', label: "No, but I've done a lot of research" },
            { value: 'beginner', label: "I'm just getting started!" },
          ].map((option) => (
            <button
              key={option.value}
              className={`w-full p-4 rounded-xl border transition-all duration-300 ${
                formData.priorExperience === option.value
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/10 transform scale-[1.02]'
                  : 'border-blue-500/20 hover:border-blue-400/40 hover:bg-blue-500/5 text-blue-200'
              }`}
              onClick={() => setFormData({ ...formData, priorExperience: option.value as any })}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Partnership Interest */}
      <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8 rounded-2xl shadow-lg border border-blue-500/20">
        <h3 className="text-xl font-bold text-blue-100 mb-6">
          Would you be interested in partnering with our team on a product?
        </h3>
        <div className="flex gap-4">
          <button
            className={`flex-1 p-4 rounded-xl border transition-all duration-300 ${
              formData.partnershipInterest === true
                ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/10 transform scale-[1.02]'
                : 'border-blue-500/20 hover:border-blue-400/40 hover:bg-blue-500/5 text-blue-200'
            }`}
            onClick={() => setFormData({ ...formData, partnershipInterest: true })}
          >
            Yes!
          </button>
          <button
            className={`flex-1 p-4 rounded-xl border transition-all duration-300 ${
              formData.partnershipInterest === false
                ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/10 transform scale-[1.02]'
                : 'border-blue-500/20 hover:border-blue-400/40 hover:bg-blue-500/5 text-blue-200'
            }`}
            onClick={() => setFormData({ ...formData, partnershipInterest: false })}
          >
            No Thanks
          </button>
        </div>
      </div>

      {/* Main Goal */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-8 rounded-2xl shadow-lg border border-blue-500/20">
        <h3 className="text-xl font-bold text-blue-100 mb-6">
          What is your biggest goal that you hope to get out of the program?
        </h3>
        <input
          type="text"
          placeholder="e.g., Quit my job, make a great side income, make $100,000 in a year..."
          className="w-full p-4 bg-gray-800/50 border-2 border-blue-500/20 rounded-xl text-blue-100 placeholder-blue-300/30 focus:border-blue-400 focus:ring focus:ring-blue-400/20 transition-all duration-300"
          value={formData.mainGoal || ''}
          onChange={(e) => setFormData({ ...formData, mainGoal: e.target.value })}
        />
      </div>

      {/* Additional Notes */}
      <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8 rounded-2xl shadow-lg border border-blue-500/20">
        <h3 className="text-xl font-bold text-blue-100 mb-6">Anything else you want to add?</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Share any additional thoughts..."
            className="flex-1 p-4 bg-gray-800/50 border-2 border-blue-500/20 rounded-xl text-blue-100 placeholder-blue-300/30 focus:border-blue-400 focus:ring focus:ring-blue-400/20 transition-all duration-300"
            value={formData.additionalNotes || ''}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
          />
          <button
            className="px-6 py-4 bg-gray-800/50 text-blue-200 rounded-xl border border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-100 transition-all duration-300"
            onClick={() => setFormData({ ...formData, additionalNotes: "No, That's All!" })}
          >
            No, That's All!
          </button>
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
          onClick={onNext}
        >
          {isHighValueInvestor ? 'Next Step' : "Let's get started!"}
        </button>
      </div>
    </div>
  );
}