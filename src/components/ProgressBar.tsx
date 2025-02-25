import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  isHighValueInvestor: boolean;
}

export function ProgressBar({ currentStep, totalSteps, isHighValueInvestor }: ProgressBarProps) {
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm font-medium text-blue-200 mb-2">
        <span>Basic Information</span>
        <span>Experience & Goals</span>
        {isHighValueInvestor && <span>Strategy Call</span>}
      </div>
      <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: progressWidth }}
        />
      </div>
    </div>
  );
}