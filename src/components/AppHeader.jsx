export function AppHeader({
  searchQuery,
  onSearchChange,
  onExportFullPdf,
  isPdfGenerating,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}) {
  return (
    <header className="app-header">
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
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo"
          aria-label="Undo"
        >
          Undo
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo"
          aria-label="Redo"
        >
          Redo
        </button>
        <button type="button" className="btn btn-secondary" onClick={onExportFullPdf} disabled={isPdfGenerating}>
          {isPdfGenerating ? 'Generating…' : 'Export Full PDF'}
        </button>
      </div>
    </header>
  );
}
