import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useUI } from '../context/UIContext';
import { updateProjectOnboardingStep } from '../context/actions';
import CashflowView from '../components/CashflowView';

const FluxPage = () => {
    const { dataState, dataDispatch } = useData();
    const { uiState, uiDispatch } = useUI();
    const navigate = useNavigate();
    const { activeProjectId } = uiState;
    const { projects } = dataState;

    const activeProject = useMemo(() => projects.find(p => p.id === activeProjectId), [projects, activeProjectId]);

    const handleValidation = () => {
        updateProjectOnboardingStep({ dataDispatch, uiDispatch }, { projectId: activeProjectId, step: 'echeancier' });
        navigate('/app/echeancier');
    };
    
    const showValidationButton = activeProject && activeProject.onboarding_step === 'flux';

    return (
        <div className="p-6 max-w-full">
            {showValidationButton && (
                <div className="text-center mb-6">
                    <button
                        onClick={handleValidation}
                        className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 transition-colors"
                    >
                        Valider mon flux et voir l'échéancier
                    </button>
                </div>
            )}
            <CashflowView />
        </div>
    );
};

export default FluxPage;
