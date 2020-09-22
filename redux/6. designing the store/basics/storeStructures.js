let state = {
  1: { id: 1, description: "", resolved: false },
  2: { id: 2, description: "", resolved: false },
  3: { id: 3, description: "", resolved: false }
}

state[1]; // fast lookup, but bad for sorting


let state = [
  { id: 1, description: "", resolved: false },
  { id: 2, description: "", resolved: false },
  { id: 3, description: "", resolved: false },
]

const idx = state.findIndex(bug => bug.id === 1);
state[idx]; // low lookup, gread ordered data


// Combination
let state = {
  buId: {
    1: { id: 1, description: "", resolved: false },
    2: { id: 2, description: "", resolved: false },
    3: { id: 3, description: "", resolved: false },
  }, // For quick access
  allIds: [3, 1, 2] // for certain order (sorting)
}


let state = {
  bugs: [],
  projects: [],
  tags: []
}

// Good practice
let state = {
  entities: {
    bugs: [],
    projects: [],
    tags: []
  }
}


let state = {
  entities: { ...},
  auth: { userId: 1, name: 'John' }
}

// UI specific for certain pages or components. They represent the UI state
let state = {
  entities: { ...},
  auth: { userId: 1, name: 'John' },
  ui: {
    bugs: { query: "...", sortBy: "..." }
  }
}


// Normalization
[
  {
    id: 1,
    description: "",
    project: { id: 1, name: "a" }
  },
  {
    id: 1,
    description: "",
    project: { id: 1, name: "b" }
  }
]

// Get rid of duplicates and connect related data using identifiers
[
  {
    id: 1,
    description: "",
    projectId: 1
  },
  {
    id: 1,
    description: "",
    projectId: 1
  }
]