console.log('Before');
getUser(1, getRepositories);
console.log('After');

function displayCommits(commits) {
  console.log(commits);
}

function getCommits(repos) {
  getCommitsAsync(repos[0], displayCommits);
}

function getRepositories(user) {
  getRepositoriesAsync(user.gitHubUsername, getCommits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading the database...');
    callback({ id, gitHubUsername: 'Your name' });
  }, 2000);
}

function getRepositoriesAsync(username, callback) {
  setTimeout(() => {
    console.log('Getting repositiories...');
    callback([
      `${username}-repo1`,
      `${username}-repo2`,
      `${username}-repo3`
    ]);
  }, 2000);
}

function getCommitsAsync(repo, callback) {
  setTimeout(() => {
    console.log(`Getting commits from ${repo}...`);
    callback(['commit1', 'commit2', 'commit3']);
  }, 2000);
}