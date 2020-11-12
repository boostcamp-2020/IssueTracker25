import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../../hooks/useAsync';
import useFilter from '../../../hooks/useFilter';
import * as IssueListComponents from '../../../components/issue/list';
import Pagination from '../../../components/commons/Pagination';
import issueApi from '../../../apis/issue';
import reducer from './reducer';
import actions from './actions';

const FIRST_PAGE = 1;
const TARGET_PAGE = '/?page';

const getPage = (location) => {
  const { page: currentPage } = queryString.parse(location.search);
  return currentPage || FIRST_PAGE;
};
const getFilter = (location) => {
  const querys = queryString.parse(location.search);
  const excludePageQuery = Object.keys(querys).reduce((acc, query) => {
    if (query !== 'page') acc[query] = querys[query];
    return acc;
  }, {});
  return queryString.stringify(excludePageQuery);
};
const initialState = {
  lastPage: 1,
  issues: [],
  checkAllIssue: false,
};
const decodeFilter = (target) =>
  target.replace(/:/g, '=').replace(/[ *]/g, '&');
const incodeFilter = (target) => target.replace(/=/g, ':').replace(/&/g, ' ');
const IssueList = ({ location }) => {
  const history = useHistory();
  const filterQuery = decodeURIComponent(getFilter(location));
  const [search, setSearch] = useState(incodeFilter(filterQuery));
  const { state: filterState, handlers: filterHandler } = useFilter();
  const getIssuesApi = () => issueApi.getIssues(getPage(location), filterQuery);
  const { state, fetchStatus, dispatch } = useAsync({
    api: getIssuesApi,
    reducer,
    deps: [location.search],
    initialState,
  });

  useEffect(() => {
    setSearch(incodeFilter(filterQuery));
  }, [location.search]);
  const { lastPage, issues, checkAllIssue } = state;
  const { error, loading } = fetchStatus;
  if (error) {
    return <div>{error}</div>;
  }
  if (loading) {
    return null;
  }

  if (issues.length === 0) {
    return <div>No results matched your search.</div>;
  }

  const checkBoxClickHandler = ({ target }) => {
    const { id } = target;
    dispatch(actions.checkIssueHandler(id));
  };

  const allCheckBoxClickHandler = () => {
    dispatch(actions.checkAllIssueHandler());
  };

  const paginationClickHandler = ({ target }) => {
    const { page: moveTo } = target.dataset;
    history.push(`${TARGET_PAGE}=${moveTo}`);
  };
  const searchHandler = ({ target: { value } }) => {
    setSearch(value);
  };

  const pressSearchEnter = ({ keyCode }) => {
    if (keyCode === 13) {
      history.push(`${TARGET_PAGE}=1&${decodeFilter(search)}`);
    }
  };
  const onClickFilterItem = (value) =>
    history.push(`${TARGET_PAGE}=1&${decodeFilter(value)}`);

  return (
    <>
      <IssueListComponents.IssueFilterContainer
        filter={search}
        onEnter={pressSearchEnter}
        onChange={searchHandler}
        clickFilterHandler={onClickFilterItem}
      />
      <IssueListComponents.IssueListContainer
        issues={issues}
        checkAllIssue={checkAllIssue}
        checkBoxClickHandler={checkBoxClickHandler}
        allCheckBoxClickHandler={allCheckBoxClickHandler}
        filterState={filterState}
        filterHandler={filterHandler}
      />
      <Pagination
        page={getPage(location)}
        lastPage={lastPage}
        clickHandler={paginationClickHandler}
      />
    </>
  );
};

export default IssueList;
