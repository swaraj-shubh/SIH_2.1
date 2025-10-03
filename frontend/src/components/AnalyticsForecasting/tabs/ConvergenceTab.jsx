import React from 'react';
import { GitMerge, ChevronRight } from 'lucide-react';
import ConvergenceNetwork from '../components/ConvergenceNetwork';

const ConvergenceTab = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <GitMerge className="h-5 w-5" />
          Converging Technologies
        </h3>
        <ConvergenceNetwork data={data.analysis} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-3 text-blue-900">Cross-Sector Impact</h4>
          <div className="flex flex-wrap gap-2">
            {(data.analysis?.convergenceDetection?.crossSectorImpact ?? []).map((sector, i) => (
              <span key={i} className="px-3 py-1 bg-white border border-blue-200 rounded-full text-sm">
                {sector}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold mb-3 text-purple-900">Integration Opportunities</h4>
          <ul className="space-y-2">
            {(data.analysis?.convergenceDetection?.integrationOpportunities ?? []).slice(0, 5).map((opp, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <ChevronRight className="h-4 w-4 mt-0.5 text-purple-600" />
                {opp}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConvergenceTab;