const form = document.getElementById('search-form');
const input = document.getElementById('username-input');
const statusMessage = document.getElementById('status-message');
const avatar = document.getElementById('avatar');
const nameLabel = document.getElementById('name');
const bioLabel = document.getElementById('bio');
const followersLabel = document.getElementById('followers');
const followingLabel = document.getElementById('following');
const reposCountLabel = document.getElementById('repos-count');
const locationLabel = document.getElementById('location');
const repoMeta = document.getElementById('repo-meta');
const repoList = document.getElementById('repo-list');
const quickPickButtons = document.querySelectorAll('[data-user]');

const setStatus = (message) => {
  statusMessage.textContent = message;
};

const renderRepos = (repos) => {
  if (!repos.length) {
    repoList.innerHTML = '<p>No public repositories found.</p>';
    return;
  }

  repoList.innerHTML = repos
    .slice(0, 6)
    .map(
      (repo) => `
        <article class="repo-item">
          <h4><a href="${repo.html_url}" target="_blank" rel="noreferrer">${repo.name}</a></h4>
          <p>${repo.description || 'No description provided.'}</p>
          <div class="meta">
            <span>⭐ ${repo.stargazers_count}</span>
            <span>🍴 ${repo.forks_count}</span>
            <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        </article>
      `
    )
    .join('');
};

const loadProfile = async (username) => {
  const trimmedUsername = username.trim();

  if (!trimmedUsername) {
    setStatus('Please enter a GitHub username.');
    return;
  }

  try {
    setStatus('Loading profile...');
    repoMeta.textContent = 'Fetching repository data...';
    repoList.innerHTML = '';

    const [userResponse, repoResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(trimmedUsername)}`),
      fetch(`https://api.github.com/users/${encodeURIComponent(trimmedUsername)}/repos?sort=updated&per_page=6`),
    ]);

    if (!userResponse.ok) {
      throw new Error('GitHub user not found.');
    }

    const user = await userResponse.json();
    const repos = repoResponse.ok ? await repoResponse.json() : [];

    avatar.src = user.avatar_url;
    avatar.alt = `${user.login} avatar`;
    nameLabel.textContent = user.name || user.login;
    bioLabel.textContent = user.bio || 'No bio available.';
    followersLabel.textContent = user.followers;
    followingLabel.textContent = user.following;
    reposCountLabel.textContent = user.public_repos;
    locationLabel.textContent = user.location || 'Not specified';
    repoMeta.textContent = `Showing ${Math.min(repos.length, 6)} recent repositories for ${user.login}.`;
    renderRepos(repos);
    setStatus(`Loaded ${user.login} successfully.`);
  } catch (error) {
    setStatus(error.message);
    repoMeta.textContent = 'Unable to load repositories.';
    repoList.innerHTML = '<p>Try a different username and search again.</p>';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  loadProfile(input.value);
});

quickPickButtons.forEach((button) => {
  button.addEventListener('click', () => {
    input.value = button.dataset.user;
    loadProfile(button.dataset.user);
  });
});

loadProfile(input.value);
