import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addBug, resolveBug, loadBugs, selectUnresolvedBugs, bugAdded } from './../bugs';
import { apiCallBegan } from './../apiActions';
import configureStore from './../configureStore';
import { minutesForCachedData } from './../../config.json';
import moment from 'moment';

// AAA
// Arrange  - all the initialization code 
// Act      - poking the system or triggering action
// Assert   - expectation code

// Solitary test
// describe("bugsSlice", () => {
//   describe("actionCreators", () => {
//     it("addBug", () => {
//       const bug = { description: 'a' };
//       const result = addBug(bug);
//       const expected = {
//         type: apiCallBegan.type,
//         payload: {
//           url: '/bugs',
//           method: 'post',
//           data: bug,
//           onSuccess: bugAdded.type
//         }
//       };
//       expect(result).toEqual(expected);
//     });
//   });
// });

// Social test
describe('bugsSlice', () => {
  // Common variables
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;

  const createState = () => ({
    entities: {
      bugs: {
        list: []
      }
    }
  });

  describe('Loading bugs', () => {
    describe('If the bugs exist in the cache and are not expired', () => {
      it('Should come from the cache', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe('If the bugs does not exist in the cache or are expired', () => {
      it('Should fetch bugs from the server', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });

      it('Should put fetched bugs into the store', async () => {
        const bugsFromServer = [{ id: 1 }, { id: 2 }, { id: 3 }];
        fakeAxios.onGet('/bugs').reply(200, bugsFromServer);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list).toHaveLength(3);
      });

      describe('Loading indicator', () => {
        it('Should be true while fetching the bugs', () => {
          fakeAxios.onGet('/bugs').reply(() => {
            expect(bugsSlice().loading.toBe(true));
            return [200, [{ id: 1 }]];
          });

          store.dispatch(loadBugs());
        });

        it('Should be false after the bugs are fetched', async () => {
          fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });

        it('Should be false, if the server returns an error', async () => {
          fakeAxios.onGet('/bugs').reply(500);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
      });

      describe('If the server crashed', () => {
        it('Should not add the bugs to the store', async () => {
          fakeAxios.onGet('/bugs').reply(500);

          await store.dispatch(loadBugs());

          expect(bugsSlice().list).toHaveLength(0);
        });
      });
    });

    it('Should add the bug to the store, if it\'s saved to the server', async () => {
      const bug = { description: 'a' };
      const savedBug = { ...bug, id: 1, resolved: false };
      fakeAxios.onPost('/bugs').reply(200, savedBug);

      await store.dispatch(addBug(bug));

      expect(bugsSlice().list).toContainEqual(savedBug);
    });

    it('Should not add the bug to the store, if it\'s not saved to the server', async () => {
      const bug = { description: 'a' };
      fakeAxios.onPost('/bugs').reply(500);

      await store.dispatch(addBug(bug));

      expect(bugsSlice().list).toHaveLength(0);
    });
  });

  it('Should resolve a bug, if it\'s been resolved on the server', async () => {
    const bugId = 1;
    const resolvedBug = { id: 1, description: 'a', resolved: true };
    const bugsFromServer = [
      { id: 1, resolved: false },
      { id: 2, resolved: true },
      { id: 3, resolved: false }
    ];
    fakeAxios.onGet('/bugs').reply(200, bugsFromServer);
    fakeAxios.onPatch(`/bugs/${bugId}`).reply(200, resolvedBug);

    await store.dispatch(loadBugs());
    await store.dispatch(resolveBug(bugId));

    expect(bugsSlice().list.filter(bug => bug.id === bugId)[0].resolved).toBe(true);
  });

  it('Should not resolve a bug, if it\'s not been resolved on the server', async () => {
    const bugId = 1;
    const bugsFromServer = [
      { id: 1, resolved: false },
      { id: 2, resolved: true },
      { id: 3, resolved: false }
    ];
    fakeAxios.onGet('/bugs').reply(200, bugsFromServer);
    fakeAxios.onPatch(`/bugs/${bugId}`).reply(500);

    await store.dispatch(loadBugs());
    await store.dispatch(resolveBug(bugId));

    expect(bugsSlice().list.filter(bug => bug.id === bugId)[0].resolved).not.toBe(true);
  });

  describe('Selectors', () => {
    it('Should return an array with unresolved bugs, if any', async () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: false },
        { id: 2, resolved: true },
        { id: 3, resolved: false }
      ];

      const result = selectUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });

    it('Should return an empty array if there are no unresolved bugs', async () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2, resolved: true },
        { id: 3, resolved: true }
      ];

      const result = selectUnresolvedBugs(state);

      expect(result).toHaveLength(0);
    });
  });
});