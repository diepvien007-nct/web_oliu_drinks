// auth.js - simple client-side auth using localStorage (demo only)

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem('oliu_users') || '[]');
  } catch (e) { return []; }
}

function saveUsers(users) {
  localStorage.setItem('oliu_users', JSON.stringify(users));
}

function registerUser(name, email, password) {
  const users = loadUsers();
  if (users.find(u => u.email === email)) return { ok: false, message: 'Email đã được sử dụng' };
  users.push({ id: Date.now(), name, email, password });
  saveUsers(users);
  return { ok: true };
}

function loginUser(email, password) {
  const users = loadUsers();
  const u = users.find(x => x.email === email && x.password === password);
  if (!u) return { ok: false, message: 'Email hoặc mật khẩu không đúng' };
  try { sessionStorage.setItem('oliu_session', JSON.stringify({ userId: u.id, name: u.name, email: u.email })); } catch (e) {}
  return { ok: true, user: u };
}

function getSession() {
  try { return JSON.parse(sessionStorage.getItem('oliu_session') || 'null'); } catch (e) { return null; }
}

function logout() {
  sessionStorage.removeItem('oliu_session');
  updateHeaderUser();
}

function updateHeaderUser() {
  const sess = getSession();
  const headerActions = document.querySelector('.header-actions');
  if (!headerActions) return;
  const loginLink = headerActions.querySelector('.header-login-link');
  if (sess) {
    // show name and logout
    loginLink.textContent = 'Xin chào, ' + (sess.name || '');
    loginLink.href = '#';
    let logoutBtn = headerActions.querySelector('#logout-btn');
    if (!logoutBtn) {
      logoutBtn = document.createElement('button');
      logoutBtn.id = 'logout-btn';
      logoutBtn.className = 'btn btn-outline';
      logoutBtn.textContent = 'Đăng xuất';
      logoutBtn.style.marginLeft = '8px';
      logoutBtn.addEventListener('click', () => { logout(); });
      headerActions.appendChild(logoutBtn);
    }
  } else {
    if (loginLink) { loginLink.textContent = 'Đăng nhập'; loginLink.href = 'login.html'; }
    const logoutBtn = headerActions.querySelector('#logout-btn');
    if (logoutBtn) logoutBtn.remove();
  }
}

// wire login/register pages
document.addEventListener('DOMContentLoaded', () => {
  updateHeaderUser();

  const regForm = document.getElementById('register-form');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const pass = document.getElementById('reg-password').value;
      const res = registerUser(name, email, pass);
      if (!res.ok) return alert(res.message);
      alert('Đăng ký thành công, vui lòng đăng nhập');
      window.location.href = 'login.html';
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const pass = document.getElementById('login-password').value;
      const res = loginUser(email, pass);
      if (!res.ok) return alert(res.message);
      alert('Đăng nhập thành công');
      updateHeaderUser();
      // redirect to home
      window.location.href = 'index.html';
    });
  }
});
