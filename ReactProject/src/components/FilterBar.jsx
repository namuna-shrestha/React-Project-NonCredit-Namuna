function FilterBar({ categories, filterCategory, setFilterCategory, sortOrder, setSortOrder }) {
  return (
    <div className="filter-bar">
      <div>
        <label htmlFor="filterCategory">Category</label>
        <select
          id="filterCategory"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sortOrder">Sort by</label>
        <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="date-desc">Date (newest first)</option>
          <option value="date-asc">Date (oldest first)</option>
          <option value="amount-desc">Amount (highest first)</option>
          <option value="amount-asc">Amount (lowest first)</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
