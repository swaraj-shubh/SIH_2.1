import React from 'react';
import { Activity, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import TRLProgressionChart from '../charts/TRLProgressionChart';
import SCurveChart from '../charts/SCurveChart';
import HypeCycleChart from '../charts/HypeCycleChart';

const OverviewTab = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
          <Activity className="h-5 w-5" />
          TRL Progression Tracking
        </h3>
        <TRLProgressionChart data={data.analysis} />
        {/* <div className="mt-4 p-4 bg-slate-800/40 backdrop-blur-sm rounded border border-blue-500/30">
          <h4 className="font-semibold text-sm mb-2 text-blue-300">Evidence</h4>
          <ul className="space-y-1">
            {(data.analysis?.trlProgression?.evidence ?? []).map((ev, i) => (
              <li key={i} className="text-sm text-blue-100 flex items-start gap-2">
                <ChevronRight className="h-4 w-4 mt-0.5 text-blue-400 flex-shrink-0" />
                {ev}
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
            <TrendingUp className="h-5 w-5" />
            S-Curve Analysis
          </h3>
          <SCurveChart data={data.analysis} />
          {/* <p className="text-sm text-blue-300 mt-2">{data.analysis?.sCurveData?.analysis}</p> */}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
            <Zap className="h-5 w-5" />
            Hype Cycle Position
          </h3>
          <HypeCycleChart data={data.analysis} />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-blue-300">Time to Mainstream:</span>
            <span className="font-semibold text-white">{data.analysis?.hypeCycle?.timeToMainstream}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;