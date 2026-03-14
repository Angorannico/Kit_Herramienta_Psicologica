
// Enrutador principal que gestiona la vista activa segun el paso del protocolo DBT.

import { useCrisisStore } from './store/useCrisisStore';
import { Layout } from './components/Layout';
import { Step1Stop } from './views/Step1Stop';
import { Step2Temperature } from './views/Step2Temperature';
import { Step3Breathing } from './views/Step3Breathing';
import { Step4Grounding } from './views/Step4Grounding';
import { Step5Facts } from './views/Step5Facts';
import { Step6WiseMind } from './views/Step6WiseMind';
import { StepModerateExit } from './views/StepModerateExit';

function App() {
  const currentStep = useCrisisStore((state) => state.currentStep);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Stop />;
      case 2:
        return <Step2Temperature />;
      case 3:
        return <Step3Breathing />;
      case 4:
        return <Step4Grounding />;
      case 5:
        return <Step5Facts />;
      case 6:
        return <Step6WiseMind />;
      case 'moderate_exit':
        return <StepModerateExit />;
      default:
        return <Step1Stop />;
    }
  };

  return <Layout>{renderCurrentStep()}</Layout>;
}

export default App;