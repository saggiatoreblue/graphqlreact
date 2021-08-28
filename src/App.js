import github from "./db.js";
import { useEffect, useState, useCallback } from "react";
import query from "./Query";
import RepoInfo from './RepoInfo';
import SearchBox from './SearchBox';
import NavButtons from "./NavButtons";


function App() {
    let [userName, setUserName] = useState("");
    let [repoList, setRepoList] = useState(null);
    let [pageCount, setPageCount] = useState(10);
    let [queryString, setQueryString] = useState('');
    let [totalCount, setTotalCount] = useState(null);

    let [startCursor, setStartCursor] = useState(null);
    let [endCursor, setEndCursor] = useState(null);
    let [hasPreviousPage, setHasPreviousPage] = useState(false);
    let [hasNextPage, setHasNextPage] = useState(true);
    let [paginationKeyword, setPaginationKeyword] = useState("first");
    let [paginationString, setPaginationString] = useState("");


    const fetchData = useCallback(() => {

        const queryText = JSON.stringify(query(pageCount, queryString, paginationKeyword, paginationString));

        fetch(github.baseURL, {
            method: 'POST',
            headers: github.headers,
            body: queryText

        })
            .then(resp => resp.json())
            .then(data => {
                const viewer = data.data.viewer;
                const repos = data.data.search.edges;
                const total = data.data.search.repositoryCount;
                const start = data.data.search.pageInfo?.startCursor;
                const end = data.data.search.pageInfo?.endCursor;
                const next = data.data.search.pageInfo?.hasNextPage;
                const prev = data.data.search.pageInfo?.hasPreviousPage;

                setUserName(viewer.name);
                setRepoList(repos);
                setTotalCount(total);

                setStartCursor(start);
                setEndCursor(end);
                setHasNextPage(next);
                setHasPreviousPage(prev);


            })
            .catch(err => {
                console.log(err);
            });
    }, [pageCount, queryString, paginationKeyword, paginationString])
    useEffect(() => {
        fetchData();
    }, [fetchData]);

  return (
    <div className="App container mt-5">

      <h1 className="text-primary">
          <i className="bi bi-diagram-2-fill">Repos </i>
      </h1>
        <p> Hey there {userName} </p>
        <SearchBox
            totalCount={totalCount}
            pageCount={pageCount}
            queryString={queryString}
            onPageCountChange={(num) => {
                setPageCount(num);
            }}
            onQueryChange={(str) => {
                setQueryString(str);
            }}
        />
        {repoList && (
            <ul className="list-group list-group-flush">
                {repoList.map((repo) => (
                    <RepoInfo key={repo.node.id} repo={repo.node} />
                ))}
            </ul>
        )}
        <NavButtons
            start={startCursor}
            end={endCursor}
            next={hasNextPage}
            previous={hasPreviousPage}
            onPage={(key, str) => {
                setPaginationKeyword(key);
                setPaginationString(str);
            }}
        />
    </div>
  )
}

export default App;
