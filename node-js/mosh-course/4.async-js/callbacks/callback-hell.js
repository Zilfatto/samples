// Asynchronous
console.log('Before');
getUser(1, user => {
  getRepositories(user.gitHubUsername, repos => {
    getCommits(repos[0], commits => {
      // Callback hell

    });
  });
});
console.log('After');


// Synchronous - is far easier to read and understand
console.log('Before');
const user = getUser(1);
const repos = getRepositories(user.gitHubUsername);
const commits = getCommits(repos[0]);
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