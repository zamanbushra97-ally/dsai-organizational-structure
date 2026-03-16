import { useState, useCallback, useRef, useEffect } from 'react';
import { buildOrgChartData } from './data/orgChartData';
import { MAX_LEVEL } from './constants/colors';
import {
  findNodeById,
  pathFromRoot,
  getNextId,
  getSectionRoots
} from './utils/treeUtils';
import { AppHeader } from './components/AppHeader';
import { ChartContainer } from './components/ChartContainer';
import { FormPanel } from './components/FormPanel';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const MIN_FORM_WIDTH = 280;
const MAX_FORM_WIDTH = 560;

const deepClone = (data) => JSON.parse(JSON.stringify(data));

function App() {
  const [history, setHistory] = useState(() => [deepClone(buildOrgChartData())]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const orgChartData = history[historyIndex];

  const applyChange = useCallback((newData) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), deepClone(newData)]);
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formPanelWidth, setFormPanelWidth] = useState(340);
  const [pathLevels, setPathLevels] = useState(Array(MAX_LEVEL).fill(''));
  const [currentLabel, setCurrentLabel] = useState('');
  const [newChildName, setNewChildName] = useState('');
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const chartContainerRef = useRef(null);

  const path = selectedNodeId ? pathFromRoot(orgChartData, selectedNodeId) : [];
  const selectedNode = path.length ? path[path.length - 1] : null;

  // Clear selection if selected node no longer exists (e.g. after undo)
  useEffect(() => {
    if (selectedNodeId && !findNodeById(orgChartData, selectedNodeId)) {
      setSelectedNodeId(null);
    }
  }, [orgChartData, selectedNodeId]);

  // Sync form fields when selection or data changes
  useEffect(() => {
    if (!selectedNodeId) {
      setPathLevels(Array(MAX_LEVEL).fill(''));
      setCurrentLabel('');
      return;
    }
    const p = pathFromRoot(orgChartData, selectedNodeId);
    const levels = Array(MAX_LEVEL).fill('');
    p.forEach((node, i) => { levels[i] = node.label; });
    setPathLevels(levels);
    const last = p[p.length - 1];
    setCurrentLabel(last ? last.label : '');
  }, [selectedNodeId, orgChartData]);

  const handleSelect = useCallback((id) => setSelectedNodeId(id), []);

  const handleDeselect = useCallback(() => {
    setSelectedNodeId(null);
    setNewChildName('');
  }, []);

  const handlePathLevelChange = useCallback((index, value) => {
    setPathLevels(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const handleSave = useCallback(() => {
    if (!selectedNodeId) return;
    const next = deepClone(orgChartData);
    const nextPath = pathFromRoot(next, selectedNodeId);
    for (let i = 0; i < nextPath.length && i < MAX_LEVEL; i++) {
      const val = pathLevels[i]?.trim();
      if (val) nextPath[i].label = val;
    }
    const node = nextPath[nextPath.length - 1];
    if (node && currentLabel.trim()) node.label = currentLabel.trim();
    applyChange(next);
  }, [selectedNodeId, orgChartData, pathLevels, currentLabel, applyChange]);

  const handleAddChild = useCallback(() => {
    if (!selectedNodeId) return;
    const name = newChildName.trim();
    if (!name) return;
    const node = findNodeById(orgChartData, selectedNodeId);
    if (!node) return;
    const nextId = getNextId(orgChartData);
    const next = deepClone(orgChartData);
    const target = findNodeById(next, selectedNodeId);
    if (!target.children) target.children = [];
    target.children.push({ id: nextId, label: name, children: [] });
    applyChange(next);
    setNewChildName('');
    setSelectedNodeId(nextId);
  }, [selectedNodeId, newChildName, orgChartData, applyChange]);

  const handleDelete = useCallback((nodeId) => {
    const id = nodeId ?? selectedNodeId;
    if (!id) return;
    const p = pathFromRoot(orgChartData, id);
    if (p.length <= 1) {
      if (!nodeId) alert('The root node cannot be deleted.');
      return;
    }
    if (!window.confirm('Remove this node and all its descendants? This cannot be undone.')) return;
    const parent = p[p.length - 2];
    const next = deepClone(orgChartData);
    const parentNode = findNodeById(next, parent.id);
    const idx = (parentNode.children || []).findIndex(c => c.id === id);
    if (idx >= 0) {
      parentNode.children.splice(idx, 1);
      applyChange(next);
    }
    handleDeselect();
  }, [selectedNodeId, orgChartData, handleDeselect, applyChange]);

  const handleUndo = useCallback(() => {
    if (!canUndo) return;
    setHistoryIndex(prev => prev - 1);
  }, [canUndo]);

  const handleRedo = useCallback(() => {
    if (!canRedo) return;
    setHistoryIndex(prev => prev + 1);
  }, [canRedo]);

  const handleExportFullPdf = useCallback(async () => {
    const container = chartContainerRef.current;
    if (!container) return;
    setIsPdfGenerating(true);
    const sectionTrees = container.querySelectorAll('.chart-section__tree');
    const originalOverflows = Array.from(sectionTrees).map(el => el.style.overflow);
    container.classList.add('pdf-export-active');
    container.style.overflow = 'visible';
    sectionTrees.forEach(el => { el.style.overflow = 'visible'; });
    const fullWidth = container.scrollWidth;
    const fullHeight = container.scrollHeight;

    try {
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        width: fullWidth,
        height: fullHeight,
        windowWidth: fullWidth,
        windowHeight: fullHeight
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let imgWidth = pageWidth;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      if (imgHeight > pageHeight) {
        imgHeight = pageHeight;
        imgWidth = canvas.width * imgHeight / canvas.height;
      }
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;
      pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
      pdf.save('org-chart-full.pdf');
    } catch (err) {
      alert('Unable to generate PDF. Please try again.');
    } finally {
      container.classList.remove('pdf-export-active');
      container.style.overflow = '';
      sectionTrees.forEach((el, i) => { el.style.overflow = originalOverflows[i] || ''; });
      setIsPdfGenerating(false);
    }
  }, []);

  const handleResizeStart = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = formPanelWidth;

    const onMove = (e) => {
      const appRoot = document.getElementById('appRoot');
      if (!appRoot) return;
      const rect = appRoot.getBoundingClientRect();
      const formWidth = rect.right - e.clientX - 8;
      setFormPanelWidth(Math.max(MIN_FORM_WIDTH, Math.min(MAX_FORM_WIDTH, formWidth)));
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [formPanelWidth]);

  const currentLabelInputRef = useRef(null);
  const handleEditFocus = useCallback(() => {
    currentLabelInputRef.current?.focus();
    currentLabelInputRef.current?.select();
  }, []);

  return (
    <>
      <AppHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExportFullPdf={handleExportFullPdf}
        isPdfGenerating={isPdfGenerating}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <div
        className="app"
        id="appRoot"
        style={{ '--form-panel-width': `${formPanelWidth}px` }}
      >
        <ChartContainer
          ref={chartContainerRef}
          orgChartData={orgChartData}
          selectedNodeId={selectedNodeId}
          searchQuery={searchQuery}
          onSelect={handleSelect}
          onDelete={handleDelete}
        />
        <div
          className="app-resize-handle"
          onMouseDown={handleResizeStart}
          title="Drag to resize form"
          aria-label="Resize form panel"
        />
        <FormPanel
          orgChartData={orgChartData}
          selectedNodeId={selectedNodeId}
          pathLevels={pathLevels}
          currentLabel={currentLabel}
          newChildName={newChildName}
          onPathLevelChange={handlePathLevelChange}
          onCurrentLabelChange={setCurrentLabel}
          onNewChildNameChange={setNewChildName}
          onSave={handleSave}
          onDeselect={handleDeselect}
          onDelete={() => handleDelete()}
          onAddChild={handleAddChild}
          onEditFocus={handleEditFocus}
          currentLabelInputRef={currentLabelInputRef}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      </div>
    </>
  );
}

export default App;
