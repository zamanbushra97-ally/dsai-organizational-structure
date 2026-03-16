import { forwardRef } from 'react';
import { ChartSection } from './ChartSection';
import { SECTIONS } from '../constants/colors';
import { getSectionRoots } from '../utils/treeUtils';

export const ChartContainer = forwardRef(function ChartContainer({ orgChartData, selectedNodeId, searchQuery, onSelect, onDelete }, ref) {
  const roots = getSectionRoots(orgChartData);

  return (
    <main ref={ref} className="chart-container" id="chartContainer">
      <div className="chart-legend">
        <span className="chart-legend__label">Levels</span>
        <span className="chart-legend__badge" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white' }}>L1</span>
        <span className="chart-legend__badge" style={{ background: '#6366f1', color: 'white' }}>L2</span>
        <span className="chart-legend__badge" style={{ background: '#818cf8', color: 'white' }}>L3</span>
        <span className="chart-legend__badge" style={{ background: '#a78bfa', color: 'white' }}>L4</span>
        <span className="chart-legend__badge" style={{ background: '#c4b5fd', color: '#1e293b' }}>L5</span>
        <span className="chart-legend__badge" style={{ background: '#f9a8d4', color: '#1e293b' }}>L6</span>
        <span className="chart-legend__badge" style={{ background: '#fecaca', color: '#1e293b' }}>L7</span>
        <span className="chart-legend__badge" style={{ background: '#fed7aa', color: '#1e293b' }}>L8</span>
        <span className="chart-legend__badge" style={{ background: '#fde68a', color: '#1e293b' }}>L9</span>
        <span className="chart-legend__badge" style={{ background: '#a7f3d0', color: '#1e293b' }}>L10</span>
      </div>
      {SECTIONS.map(({ id, title, pdfFilename }) => (
        <ChartSection
          key={id}
          sectionId={id}
          title={title}
          pdfFilename={pdfFilename}
          rootNode={roots[id]}
          startDepth={0}
          orgChartData={orgChartData}
          selectedNodeId={selectedNodeId}
          searchQuery={searchQuery}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </main>
  );
});
