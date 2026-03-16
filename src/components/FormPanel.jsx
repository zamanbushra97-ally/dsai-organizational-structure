import { MAX_LEVEL } from '../constants/colors';
import { pathFromRoot } from '../utils/treeUtils';

const LEVEL_LABELS = Array.from({ length: MAX_LEVEL }, (_, i) => `Level ${i + 1}`);

export function FormPanel({
  orgChartData,
  selectedNodeId,
  pathLevels,
  currentLabel,
  newChildName,
  onPathLevelChange,
  onCurrentLabelChange,
  onNewChildNameChange,
  onSave,
  onDeselect,
  onDelete,
  onAddChild,
  onEditFocus,
  currentLabelInputRef,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}) {
  const path = selectedNodeId ? pathFromRoot(orgChartData, selectedNodeId) : [];
  const selectedNode = path.length ? path[path.length - 1] : null;
  const canDelete = path.length > 1;

  return (
    <aside className="form-panel">
      <h2>Org Chart Form</h2>
      <p className="subtitle">1) Click a card in the org chart. 2) Adjust the path or name. 3) Add children if needed.</p>

      <div className="form-panel-section">
        <div className="form-panel-section__title">Undo / Redo</div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onUndo} disabled={!canUndo} title="Undo last change" aria-label="Undo">Undo</button>
          <button type="button" className="btn btn-secondary" onClick={onRedo} disabled={!canRedo} title="Redo" aria-label="Redo">Redo</button>
        </div>
      </div>

      <div className="form-panel-section">
        <div className="form-panel-section__title">Hierarchy path (10 levels)</div>
        <p className="form-panel-section__note">Click a card in the chart, then edit the labels below to rename each level from root to the selected node. Click Save to apply.</p>
        <div className="level-fields">
          {LEVEL_LABELS.map((label, i) => (
            <div key={i} className="level-row">
              <span className={`level-dot l${i + 1}`} />
              <label>{label}</label>
              <input
                type="text"
                placeholder={i === 0 ? 'Root / Level 1' : `Level ${i + 1}`}
                value={pathLevels[i] ?? ''}
                onChange={(e) => onPathLevelChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="form-panel-section">
        <div className="form-panel-section__title">Selected node</div>
        <p className="form-panel-section__note">Rename this node in the field below and click Save. Use Edit to focus the field, Deselect to clear selection, or Delete to remove the node and its children.</p>
        <div className="level-row" style={{ marginTop: '0.25rem' }}>
          <span className="level-dot l1" />
          <label>Current</label>
          <input
            ref={currentLabelInputRef}
            type="text"
            placeholder="Selected node name"
            title="The node you clicked; edit to rename"
            value={currentLabel}
            onChange={(e) => onCurrentLabelChange(e.target.value)}
            disabled={!selectedNode}
          />
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-primary" onClick={onSave}>Save</button>
          <button type="button" className="btn btn-secondary" onClick={onEditFocus} title="Focus current node to edit label">Edit</button>
          <button type="button" className="btn btn-secondary" onClick={onDeselect}>Deselect</button>
          <button type="button" className="btn btn-danger" onClick={onDelete} disabled={!canDelete} title="Remove this node and all its descendants">Delete</button>
        </div>
      </div>

      <div className="form-panel-section">
        <div className="form-panel-section__title">Add child to selected node</div>
        <p className="form-panel-section__note">Enter a role or title below and click Add to create a new direct report under the selected node.</p>
        <div className="add-child-row">
          <input
            type="text"
            placeholder="New role or title"
            value={newChildName}
            onChange={(e) => onNewChildNameChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onAddChild(); }}
          />
          <button type="button" className="btn btn-primary" onClick={onAddChild}>Add</button>
        </div>
      </div>

      {!selectedNodeId && (
        <p className="no-selection">Click a node in the chart to select and edit.</p>
      )}
    </aside>
  );
}
