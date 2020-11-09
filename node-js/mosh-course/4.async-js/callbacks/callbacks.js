console.log('Before');
getUser(1, user => {
  console.log('User', user);
  getRepositories(user.gitHubUsername, repos => {
    console.log('Repos', repos);
    getCommits(repos[0], commits => {
      console.log(commits);
    });
  });
});
console.log('After');

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading the database...');
    callback({ id, gitHubUsername: 'Your name' });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Getting repositiories...');
    callback([
      `${username}-repo1`,
      `${username}-repo2`,
      `${username}-repo3`
    ]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log(`Getting commits from ${repo}...`);
    callback(['commit1', 'commit2', 'commit3']);
  }, 2000);
}