const NavButtons = ({start, end, next, previous, onPage}) => {

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {previous && (
                    <li className="page-item">
                        <a className="page-link"
                           href="#"
                           onClick={() => onPage("last", 'before: "' + start + '"')}
                        >
                            Previous
                        </a>
                    </li>
                )}
                {next && (
                    <li className="page-item">
                        <a
                            className="page-link"
                            href="#"
                            onClick={() => onPage("first", 'after: "' + end + '"')}
                        >
                            Next
                        </a>
                    </li>
                )}
            </ul>
        </nav>
    )
}


export default NavButtons;
