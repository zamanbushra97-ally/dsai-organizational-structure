import { forwardRef } from 'react';
import { ChartSection } from './ChartSection';
import { SECTIONS } from '../constants/colors';
import { getSectionRoots } from '../utils/treeUtils';

export const ChartContainer = forwardRef(function ChartContainer({ orgChartData, selectedNodeId, searchQuery, onSelect, onDelete }, ref) {
  const roots = getSectionRoots(orgChartData);

  return (
    <main ref={ref} className="chart-container" id="chartContainer">
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
