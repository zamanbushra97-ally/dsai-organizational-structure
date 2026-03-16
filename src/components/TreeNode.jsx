import { MAX_LEVEL } from '../constants/colors';
import { getLineageStyle } from '../utils/treeUtils';

const connectorStyle = { background: '#000', color: '#000' };

export function TreeNode({ node, depth = 0, sectionId, orgChartData, selectedNodeId, searchQuery, onSelect, onDelete }) {
  const level = Math.min(depth + 1, MAX_LEVEL);
  const isSelected = node.id === selectedNodeId;
  const hasChildren = node.children && node.children.length > 0;
  const canDelete = depth > 0;
  const isSearchMatch = searchQuery && node.label.toLowerCase().includes(searchQuery.toLowerCase());

  const { lineageColor, cardBg, branchIndex, badgeTextColor } = getLineageStyle(orgChartData, node, sectionId);

  const handleCardClick = (e) => {
    if (e.target.closest('.tree-node__card-actions')) return;
    e.stopPropagation();
    onSelect(node.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(node.id);
  };

  return (
    <div className={`tree-node tree-node--horizontal`} data-branch={branchIndex}>
      {depth > 0 && (
        <div className="tree-node__connector tree-node__connector--left" style={connectorStyle} />
      )}
      <div
        className={`tree-node__card${isSelected ? ' selected' : ''}${isSearchMatch ? ' search-match' : ''}`}
        data-node-id={node.id}
        data-level={level}
        data-branch={branchIndex}
        style={cardBg ? { backgroundColor: cardBg } : undefined}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(node.id); } }}
      >
        <span className="level-badge" style={{ background: lineageColor, color: badgeTextColor }}>{level}</span>
        {canDelete && (
          <div className="tree-node__card-actions">
            <button type="button" className="tree-node__card-btn tree-node__card-btn--delete" title="Delete this node" aria-label="Delete" onClick={handleDelete}>×</button>
          </div>
        )}
        <span className="label">{node.label}</span>
      </div>
      {hasChildren && (
        <>
          <div className="tree-node__connector tree-node__connector--right" style={connectorStyle} />
          <div className={`tree-node__children tree-node__children--horizontal tree-node__children--branch-${branchIndex}${node.children.length === 1 ? ' tree-node__single-child' : ''}`}>
            {node.children.map((child) => (
              <div key={child.id} className="tree-node__child-row">
                <div className="tree-node__connector tree-node__connector--to-child" style={connectorStyle} />
                <TreeNode
                  node={child}
                  depth={depth + 1}
                  sectionId={sectionId}
                  orgChartData={orgChartData}
                  selectedNodeId={selectedNodeId}
                  searchQuery={searchQuery}
                  onSelect={onSelect}
                  onDelete={onDelete}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
