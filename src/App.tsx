import React, { useState } from 'react';
import { Header } from './components/Header';
import { VideoSection } from './components/VideoSection';
import { ProgressBar } from './components/ProgressBar';
import { StepOne } from './components/steps/StepOne';
import { StepTwo } from './components/steps/StepTwo';
import { StepThree } from './components/steps/StepThree';
import { SkipCallModal } from './components/SkipCallModal';
import { FormData } from './types';

function App() {
  const [step, setStep] = useState(1);
  const [showSkipConfirmation, setShowSkipConfirmation] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    incomeGoal: 1000,
    investment: 0,
    productIdeas: 'none',
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async () => {
    try {
      // Convert the data to URL-encoded format
      const formBody = new URLSearchParams({
        email: formData.email,
        incomeGoal: formData.incomeGoal.toString(),
        investment: formData.investment.toString(),
        productIdeas: formData.productIdeas,
        specificIdea: formData.specificIdea || '',
        interestAreas: formData.interestAreas || '',
        priorExperience: formData.priorExperience || '',
        partnershipInterest: formData.partnershipInterest ? 'Yes' : 'No',
        mainGoal: formData.mainGoal || '',
        additionalNotes: formData.additionalNotes || '',
        submittedAt: new Date().toISOString(),
        isHighValueInvestor: (formData.investment >= 5000).toString()
      });

      const response = await fetch('https://hooks.zapier.com/hooks/catch/734669/2g9y11v/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Form submitted successfully');
      window.location.href = 'https://www.passionproductformula.com/library';
    } catch (error) {
      console.error('Error submitting form:', error);
      // Continue with redirect even if submission fails
      window.location.href = 'https://www.passionproductformula.com/library';
    }
  };

  const isHighValueInvestor = formData.investment >= 5000;
  const totalSteps = isHighValueInvestor ? 3 : 2;

  const handleNext = () => {
    if (step === 2 && !isHighValueInvestor) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const handleBookCall = () => {
    // When they book a call, submit the form without showing the skip warning
    handleSubmit();
  };

  const handleSkipCall = () => {
    // Only show the warning if they haven't clicked the booking link
    const hasClickedBooking = sessionStorage.getItem('hasClickedBooking') === 'true';
    if (!hasClickedBooking) {
      setShowSkipConfirmation(true);
    } else {
      handleSubmit();
    }
  };

  const confirmSkipCall = async () => {
    setShowSkipConfirmation(false);
    await handleSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      <div 
        className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000&h=600&blur=50')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay'
        }}
      >
        <ProgressBar
          currentStep={step}
          totalSteps={totalSteps}
          isHighValueInvestor={isHighValueInvestor}
        />

        <Header />
        <VideoSection />

        <div className="relative">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-3xl"></div>
          <div className="relative bg-gray-900/40 rounded-3xl shadow-2xl p-8 backdrop-blur-xl border border-white/10">
            {step === 1 && (
              <StepOne
                formData={formData}
                setFormData={setFormData}
                onNext={handleNext}
                formatCurrency={formatCurrency}
              />
            )}

            {step === 2 && (
              <StepTwo
                formData={formData}
                setFormData={setFormData}
                onPrevious={() => setStep(1)}
                onNext={handleNext}
                isHighValueInvestor={isHighValueInvestor}
              />
            )}

            {step === 3 && isHighValueInvestor && (
              <StepThree
                onPrevious={() => setStep(2)}
                onBookCall={handleBookCall}
                onSkipCall={handleSkipCall}
              />
            )}
          </div>
        </div>
      </div>

      {showSkipConfirmation && (
        <SkipCallModal
          onConfirm={confirmSkipCall}
          onCancel={() => setShowSkipConfirmation(false)}
        />
      )}
    </div>
  );
}

export default App;