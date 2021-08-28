const SearchBox = ({
    totalCount, pageCount, queryString, onPageCountChange, onQueryChange
}) => {

    return (
        <div className="d-flex flex-column align-items-flex-start bg-light px-3 py-2 small rounded-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={(event) => {onQueryChange(event.target.value)}}
                value={queryString}
            />
            <input
                type="number"
                className="form-control mt-2"
                placeholder="Set result count"
                onChange={(event) => {onPageCountChange(event.target.value)}}
                value={pageCount}
            />
            <p className="py-1"><strong>Search for: </strong> &quot;{queryString}&quot; | <strong>Items per page: </strong> {pageCount}<strong>  | Total results: </strong>{totalCount}</p>

        </div>
    )
}

export default SearchBox;
