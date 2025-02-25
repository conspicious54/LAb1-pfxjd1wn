import React from 'react';
import { AlertCircle } from 'lucide-react';

interface SkipCallModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function SkipCallModal({ onConfirm, onCancel }: SkipCallModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-blue-500/20">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <AlertCircle className="w-6 h-6 text-blue-400" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-100">
              Are you sure you want to skip the strategy call?
            </h3>
            <p className="text-blue-200">
              This call is completely free and we're offering it to you as a courtesy to develop an Amazon plan alongside you. This is an opportunity that you will not get again after you leave this page.
            </p>
            <div className="flex gap-4 pt-4">
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 font-semibold"
              >
                Go Back
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-6 py-3 bg-gray-800 text-blue-200 rounded-xl border border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-100 transition-all duration-300 font-semibold"
              >
                Yes, Skip Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}