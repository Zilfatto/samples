import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const slice = createSlice({
  name: 'teamMember',
  initialState: [],
  reducers: {
    teamMemberAdded: (teamMembers, action) => {
      teamMembers.push({
        id: ++lastId,
        name: action.payload.name,
        bugIds: []
      });
    },

    assignedBug: (teamMembers, action) => {
      const { memberId, bugId } = action.payload;
      const index = teamMembers.findIndex(member => member.id === memberId);
      teamMembers[index].bugIds.push(bugId);
    }
  }
});

export const { teamMemberAdded, assignedBug } = slice.actions;
export default slice.reducer;



export const selectMemberAssignedBugs = memberId => createSelector(
  state => state.entities.teamMembers[memberId - 1],
  state => state.entities.bugs.list,
  (member, bugs) => {
    const bugIds = member.bugIds;
    return bugs.filter(bug => bugIds.findIndex((id) => id === bug.id) !== -1);
  }
);