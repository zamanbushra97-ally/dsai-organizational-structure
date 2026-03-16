export function AppHeader({
  searchQuery,
  onSearchChange,
  onExportFullPdf,
  isPdfGenerating
}) {
  return (
    <header className="app-header">
      <div className="app-header__top">
        <div className="app-header__brand">
          <div className="app-header__logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 18a4 4 0 0 0-8 0"/>
              <path d="M12 2v4"/>
              <path d="M12 18v4"/>
              <path d="m4 12 4-4 4 4 4-4"/>
              <path d="m4 12 4 4 4-4 4 4"/>
            </svg>
          </div>
          <h1 className="app-header__title">DSAI Organizational Structure</h1>
        </div>
        <div className="app-header__actions">
          <div className="app-header__search-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className="app-header__search"
              placeholder="Find role..."
              aria-label="Search roles"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-secondary" onClick={onExportFullPdf} disabled={isPdfGenerating}>
            {isPdfGenerating ? 'Generating…' : 'Export Full PDF'}
          </button>
        </div>
      </div>
      <div className="chart-legend chart-legend--header">
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
    </header>
  );
}
