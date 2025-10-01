import React from 'react';
import { Layers, MoreVertical, Folder } from 'lucide-react';
import { useData } from '../context/DataContext';

const ConsolidatedViewCard = ({ view }) => {
    const { dataState } = useData();
    const { projects } = dataState;

    const includedProjects = view.project_ids.map(id => projects.find(p => p.id === id)).filter(Boolean);

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                        <Layers className="w-6 h-6 text-purple-600" />
                    </div>
                    <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                        <MoreVertical size={20} />
                    </button>
                </div>
                <h3 className="font-bold text-gray-800 text-lg truncate mb-2" title={view.name}>{view.name}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                    {includedProjects.slice(0, 4).map(p => (
                        <div key={p.id} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600" title={p.name}>
                            <Folder size={12} />
                            <span className="truncate max-w-[60px]">{p.name}</span>
                        </div>
                    ))}
                    {includedProjects.length > 4 && (
                        <span className="text-xs text-gray-500 font-semibold">+{includedProjects.length - 4} autres</span>
                    )}
                </div>
            </div>
            <div className="mt-6">
                {/* Placeholder for potential future info */}
                <div className="h-1.5 bg-transparent"></div>
                 <div className="mt-4 pt-4 border-t border-transparent">
                    <span className="text-sm font-medium text-transparent">&nbsp;</span>
                    <div className="text-sm font-bold text-transparent">&nbsp;</div>
                </div>
            </div>
        </div>
    );
};

export default ConsolidatedViewCard;
