console.log('Before');
// Without console.logs
getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(console.log)
  .catch(error => console.log(error));

// Async and await
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  }
  catch (error) {
    console.log(error);
  }
}
displayCommits();

console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading the database...');
      resolve({ id, gitHubUsername: 'Your name' });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Getting repositiories...');
      resolve([
        `${username}-repo1`,
        `${username}-repo2`,
        `${username}-repo3`
      ]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Getting commits from ${repo}...`);
      resolve(['commit1', 'commit2', 'commit3']);
    }, 2000);
  });
}