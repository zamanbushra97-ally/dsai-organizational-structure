import { useRef } from 'react';
import { TreeNode } from './TreeNode';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export function ChartSection({ sectionId, title, pdfFilename, rootNode, startDepth, orgChartData, selectedNodeId, searchQuery, onSelect, onDelete, onDownloadSectionPdf }) {
  const sectionRef = useRef(null);

  const handleDownloadPdf = async () => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    const btn = section.querySelector('.btn-download-pdf');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Generating…';
    }
    section.classList.add('pdf-export-active');
    const treeEl = section.querySelector('.chart-section__tree');
    const origOverflow = treeEl?.style.overflow;
    if (treeEl) treeEl.style.overflow = 'visible';

    try {
      const canvas = await html2canvas(section, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      if (imgHeight > pageHeight) {
        imgHeight = pageHeight;
      }
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;
      pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
      pdf.save(pdfFilename || `org-chart-${sectionId}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      section.classList.remove('pdf-export-active');
      if (treeEl) treeEl.style.overflow = origOverflow || '';
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Download PDF';
      }
    }
  };

  if (!rootNode) return null;

  return (
    <section ref={sectionRef} className="chart-section" id={`section-${sectionId}`} data-pdf-filename={pdfFilename}>
      <div className="chart-section__header">
        <h3>{title}</h3>
        <button type="button" className="btn-download-pdf" onClick={handleDownloadPdf} aria-label="Download PDF">Download PDF</button>
      </div>
      <div className="chart-section__tree">
        <div className="tree-root">
          <TreeNode
            node={rootNode}
            depth={startDepth}
            sectionId={sectionId}
            orgChartData={orgChartData}
            selectedNodeId={selectedNodeId}
            searchQuery={searchQuery}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        </div>
      </div>
    </section>
  );
}
