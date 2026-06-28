(function() {
const TOKEN_KEY = 'infyskill_token';
const USER_KEY = 'infyskill_user';

const setFeedback = (element, message, type) => {
  if (!element) return;
  element.textContent = message;
  element.classList.remove('success');
  element.classList.remove('error');
  if (type) {
    element.classList.add(type);
  }
};

const saveSession = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const parseResponse = async (response) => {
  try {
    return await response.clone().json();
  } catch (error) {
    const text = await response.text();
    if (!text) {
      return {};
    }
    try {
      return JSON.parse(text);
    } catch (parseError) {
      return { message: text };
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginFeedback = document.getElementById('loginFeedback');
  const signupFeedback = document.getElementById('signupFeedback');
  const token = localStorage.getItem(TOKEN_KEY);

  if (token && loginForm) {
    window.location.href = 'dashboard.html';
    return;
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      setFeedback(signupFeedback, 'Creating account...', null);

      const formData = new FormData(signupForm);
      const payload = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await parseResponse(response);

        if (!response.ok) {
          throw new Error(data.message || 'Signup failed');
        }

        setFeedback(signupFeedback, data.message || 'Signup successful. Redirecting to login...', 'success');
        signupForm.reset();
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1200);
      } catch (error) {
        setFeedback(signupFeedback, error.message, 'error');
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      setFeedback(loginFeedback, 'Signing in...', null);

      const formData = new FormData(loginForm);
      const payload = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(payload)
        });

        const data = await parseResponse(response);

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        if (!data.token || !data.user) {
          throw new Error('Login failed');
        }

        saveSession(data.token, data.user);
        setFeedback(loginFeedback, 'Login successful. Redirecting...', 'success');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 800);
      } catch (error) {
        clearSession();
        setFeedback(loginFeedback, error.message, 'error');
      }
    });
  }
});
})();
