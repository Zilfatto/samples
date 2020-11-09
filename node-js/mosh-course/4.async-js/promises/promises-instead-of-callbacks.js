console.log('Before');
// Callback hell
getUser(1, user => {
  getRepositories(user.gitHubUsername, repos => {
    getCommits(repos[0], commits => {
      // Callback hell
      console.log(commits);
    });
  });
});

// With Promises
getUser(1)
  .then(user => {
    console.log('User', user);
    return getRepositories(user.gitHubUsername);
  })
  .then(repos => {
    console.log('Repos', repos);
    return getCommits(repos[0]);
  })
  .then(console.log)
  .catch(error => console.log(error));

// Without console.logs
getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(console.log)
  .catch(error => console.log(error));

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