import { combineReducers } from 'redux';
import bugsReducer from './bugs';
import projectsReducer from './projects';
import teamMembersReducer from './teamMember';

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  teamMembers: teamMembersReducer
});