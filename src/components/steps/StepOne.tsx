import React from 'react';
import { DollarSign, Briefcase, Target, Lock, Mail, ChevronRight } from 'lucide-react';
import { FormData } from '../../types';

interface StepOneProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
  formatCurrency: (amount: number) => string;
}

export function StepOne({ formData, setFormData, onNext, formatCurrency }: StepOneProps) {
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.email.includes('@')) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleNext} className="space-y-8">
      {/* Email Input */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-blue-500/10 border border-blue-500/20 group">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors duration-300">
            <Mail className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-blue-100">What's your email address?</h3>
        </div>
        <input
          type="email"
          required
          placeholder="Enter your email address..."
          className="w-full p-4 bg-gray-800/50 border-2 border-blue-500/20 rounded-xl text-blue-100 placeholder-blue-300/30 focus:border-blue-400 focus:ring focus:ring-blue-400/20 transition-all duration-300"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      {/* Income Goal Slider */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-blue-500/10 border border-blue-500/20 group">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors duration-300">
            <DollarSign className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-blue-100">How much do you hope to make?</h3>
        </div>
        <input
          type="range"
          min="1000"
          max="50000"
          step="1000"
          value={formData.incomeGoal}
          onChange={(e) => setFormData({ ...formData, incomeGoal: parseInt(e.target.value) })}
          className="w-full h-3 bg-blue-900/50 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-blue-800/50"
          style={{
            backgroundImage: 'linear-gradient(to right, rgb(59, 130, 246), rgb(99, 102, 241))',
            backgroundSize: `${((formData.incomeGoal - 1000) / (50000 - 1000)) * 100}% 100%`,
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="mt-6 text-center">
          <p className="text-4xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text animate-gradient">
            {formatCurrency(formData.incomeGoal)}/month
          </p>
          <p className="text-lg text-blue-200/80 mt-2">
            ({formatCurrency(formData.incomeGoal * 12)}/year)
          </p>
        </div>
      </div>

      {/* Investment Slider */}
      <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-blue-500/10 border border-blue-500/20 group">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors duration-300">
            <Briefcase className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-blue-100">How much do you have to invest?</h3>
        </div>
        <input
          type="range"
          min="0"
          max="25000"
          step="500"
          value={formData.investment}
          onChange={(e) => setFormData({ ...formData, investment: parseInt(e.target.value) })}
          className="w-full h-3 bg-blue-900/50 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-blue-800/50"
          style={{
            backgroundImage: 'linear-gradient(to right, rgb(59, 130, 246), rgb(99, 102, 241))',
            backgroundSize: `${(formData.investment / 25000) * 100}% 100%`,
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="mt-6 text-center">
          <p className="text-4xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text animate-gradient">
            {formatCurrency(formData.investment)}
          </p>
        </div>
      </div>

      {/* Product Ideas */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-8 rounded-2xl shadow-lg border border-blue-500/20 group">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors duration-300">
            <Target className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-blue-100">Do you have any product ideas yet?</h3>
        </div>
        <div className="space-y-4">
          {[
            { value: 'exact', label: 'I know exactly what I want to launch' },
            { value: 'some', label: 'I have some ideas' },
            { value: 'none', label: 'No ideas yet' },
          ].map((option) => (
            <button
              type="button"
              key={option.value}
              className={`w-full p-4 rounded-xl border transition-all duration-300 ${
                formData.productIdeas === option.value
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/10 transform scale-[1.02]'
                  : 'border-blue-500/20 hover:border-blue-400/40 hover:bg-blue-500/5 text-blue-200'
              }`}
              onClick={() => setFormData({ ...formData, productIdeas: option.value as any })}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Questions */}
      {formData.productIdeas === 'exact' && (
        <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8 rounded-2xl shadow-lg border border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-blue-100">What's your product idea?</h3>
          </div>
          <p className="text-blue-200/80 mb-6">
            Your idea is completely confidential and will never be shared with others.
          </p>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter your product idea..."
              className="flex-1 p-4 bg-gray-800/50 border-2 border-blue-500/20 rounded-xl text-blue-100 placeholder-blue-300/30 focus:border-blue-400 focus:ring focus:ring-blue-400/20 transition-all duration-300"
              value={formData.specificIdea || ''}
              onChange={(e) => setFormData({ ...formData, specificIdea: e.target.value })}
            />
            <button
              type="button"
              className="px-6 py-4 bg-gray-800/50 text-blue-200 rounded-xl border border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-100 transition-all duration-300"
              onClick={() => setFormData({ ...formData, specificIdea: 'prefer_not_to_say' })}
            >
              I prefer not to say
            </button>
          </div>
        </div>
      )}

      {(formData.productIdeas === 'some' || formData.productIdeas === 'none') && (
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-8 rounded-2xl shadow-lg border border-blue-500/20">
          <h3 className="text-xl font-bold text-blue-100 mb-6">What are your biggest areas of interest?</h3>
          <input
            type="text"
            placeholder="e.g., Supplements, Health and Wellness, Flashcard Deck"
            className="w-full p-4 bg-gray-800/50 border-2 border-blue-500/20 rounded-xl text-blue-100 placeholder-blue-300/30 focus:border-blue-400 focus:ring focus:ring-blue-400/20 transition-all duration-300"
            value={formData.interestAreas || ''}
            onChange={(e) => setFormData({ ...formData, interestAreas: e.target.value })}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-[1.02]"
        >
          Next Step
          <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </form>
  );
}