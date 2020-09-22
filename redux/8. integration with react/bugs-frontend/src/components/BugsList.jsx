import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBugs, resolveBug, selectUnresolvedBugs } from './../store/bugs';

const BugsList = () => {
  const dispatch = useDispatch();
  // const bugs = useSelector(state => state.entities.bugs.list);
  const unresolvedBugs = useSelector(selectUnresolvedBugs);

  useEffect(() => {
    dispatch(loadBugs());
  }, []);

  return (
    <ul>
      {unresolvedBugs.map(bug => (
        <React.Fragment>
          <li
            key={bug.id}
            style={{ padding: 10 }}
          >
            {bug.description}
            <button
              onClick={() => dispatch(resolveBug(bug.id))}
              type="button"
              style={{ marginLeft: 5 }}
            >
              Resolve
            </button>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
}

export default BugsList;