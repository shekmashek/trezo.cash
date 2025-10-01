import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BudgetTracker from '../components/BudgetTracker';
import { useUI } from '../context/UIContext';
import { useData } from '../context/DataContext';
import { updateProjectOnboardingStep } from '../context/actions';

const TrezoPage = () => {
    const { uiState, uiDispatch } = useUI();
    const { dataState, dataDispatch } = useData();
    const navigate = useNavigate();
    const { activeProjectId } = uiState;
    const { projects } = dataState;

    const activeProject = useMemo(() => projects.find(p => p.id === activeProjectId), [projects, activeProjectId]);

    const handleValidation = () => {
        updateProjectOnboardingStep({ dataDispatch, uiDispatch }, { projectId: activeProjectId, step: 'flux' });
        navigate('/app/flux');
    };
    
    const showValidationButton = activeProject && activeProject.onboarding_step === 'trezo';

    return (
        <div className="p-6 max-w-full">
            {showValidationButton && (
                <div className="text-center mb-6">
                    <button
                        onClick={handleValidation}
                        className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 transition-colors"
                    >
                        Valider mon tableau et voir mon flux de trésorerie
                    </button>
                </div>
            )}
            <BudgetTracker />
        </div>
    );
};

export default TrezoPage;
