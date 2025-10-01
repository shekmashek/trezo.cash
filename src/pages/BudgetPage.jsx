import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Save, Share2, Search } from 'lucide-react';
import BudgetStateView from '../components/BudgetStateView';
import { useUI } from '../context/UIContext';
import { useData } from '../context/DataContext';
import { updateProjectOnboardingStep } from '../context/actions';

const BudgetPage = () => {
    const [mode, setModeState] = useState(() => sessionStorage.getItem('budgetPageMode') || 'lecture');
    const [searchTerm, setSearchTerm] = useState('');
    const { uiState, uiDispatch } = useUI();
    const { dataState, dataDispatch } = useData();
    const { activeProjectId } = uiState;
    const { projects } = dataState;
    const navigate = useNavigate();

    const activeProject = useMemo(() => projects.find(p => p.id === activeProjectId), [projects, activeProjectId]);
    const showValidationButton = activeProject && activeProject.onboarding_step === 'budget';

    const isConsolidated = activeProjectId === 'consolidated' || activeProjectId?.startsWith('consolidated_view_');

    const handleValidation = () => {
        updateProjectOnboardingStep({ dataDispatch, uiDispatch }, { projectId: activeProjectId, step: 'accounts' });
        navigate('/app/comptes');
    };

    const setMode = (newMode) => {
        sessionStorage.setItem('budgetPageMode', newMode);
        setModeState(newMode);
    };

    const handleToggleMode = () => {
        const newMode = mode === 'lecture' ? 'edition' : 'lecture';
        setMode(newMode);
    };

    const handleShare = () => {
        uiDispatch({ type: 'OPEN_SHARE_PROJECT_DRAWER' });
    };

    return (
        <div className="p-6 max-w-full">
            <div className="mb-6 flex justify-between items-center">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher par tiers..."
                        className="w-full pl-10 pr-4 py-2 border-b-2 border-transparent bg-transparent focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                <div className="flex-grow flex justify-center">
                    {showValidationButton && (
                        <button
                            onClick={handleValidation}
                            className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 transition-colors"
                        >
                            Valider mon budget et passer à la mise en place de mes comptes
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={handleToggleMode}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        {mode === 'lecture' ? <><Edit size={16} /><span>Editer votre budget</span></> : <><Save size={16} /><span>Sauver votre budget</span></>}
                    </button>
                    <button
                        onClick={handleShare}
                        disabled={isConsolidated}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Share2 size={16} />
                        <span>Partager ce projet</span>
                    </button>
                </div>
            </div>
            
            <BudgetStateView mode={mode} setMode={setMode} searchTerm={searchTerm} />
        </div>
    );
};

export default BudgetPage;
