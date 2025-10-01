import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useUI } from '../context/UIContext';
import { updateProjectOnboardingStep } from '../context/actions';
import ExpenseAnalysisView from '../components/ExpenseAnalysisView';

const AnalysePage = () => {
    const { dataState, dataDispatch } = useData();
    const { uiState, uiDispatch } = useUI();
    const navigate = useNavigate();
    const { activeProjectId } = uiState;
    const { projects } = dataState;

    const activeProject = useMemo(() => projects.find(p => p.id === activeProjectId), [projects, activeProjectId]);

    const handleValidation = () => {
        updateProjectOnboardingStep({ dataDispatch, uiDispatch }, { projectId: activeProjectId, step: 'completed' });
        navigate('/app/dashboard');
    };
    
    const showValidationButton = activeProject && activeProject.onboarding_step === 'analyse';

    return (
        <div className="p-6 max-w-full">
            {showValidationButton && (
                <div className="text-center mb-6">
                    <button
                        onClick={handleValidation}
                        className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 transition-colors"
                    >
                        Terminer et voir mon tableau de bord
                    </button>
                </div>
            )}
            <ExpenseAnalysisView />
        </div>
    );
};

export default AnalysePage;
