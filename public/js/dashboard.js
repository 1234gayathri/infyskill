const TOKEN_KEY = 'infyskill_token';
const USER_KEY = 'infyskill_user';

const redirectToLogin = () => {
  window.location.href = 'login.html';
};

const renderUser = (user) => {
  const dashboardName = document.getElementById('dashboardName');
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');

  if (dashboardName) dashboardName.textContent = user.name;
  if (profileName) profileName.textContent = user.name;
  if (profileEmail) profileEmail.textContent = user.email;
};

document.addEventListener('DOMContentLoaded', async () => {
  const isDashboardPage = window.location.pathname.endsWith('dashboard.html');
  if (!isDashboardPage) {
    return;
  }

  const token = localStorage.getItem(TOKEN_KEY);
  const logoutBtn = document.getElementById('logoutBtn');

  if (!token) {
    redirectToLogin();
    return;
  }

  try {
    const response = await fetch('/api/user/me', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Unauthorized');
    }

    const data = await response.json();
    renderUser(data.user);
  } catch (error) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    redirectToLogin();
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await fetch('/api/auth/logout', {
          method: 'GET',
          credentials: 'include'
        });
      } catch (error) {}

      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      redirectToLogin();
    });
  }
});
