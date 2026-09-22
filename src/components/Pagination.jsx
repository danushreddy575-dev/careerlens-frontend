export default function Pagination({
  page,
  setPage
}) {
  return (
    <div className="pagination">
      <button
        className="btn btn-secondary"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span>
        Page {page}
      </span>

      <button
        className="btn btn-secondary"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
