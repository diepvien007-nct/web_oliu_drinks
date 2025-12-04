// user.js - user authentication and profile management

function registerUser(email, password, fullName, phone, address) {
  // Validate input
  if (!email || !password || !fullName || !phone || !address) {
    return { success: false, message: 'Vui lòng nhập đầy đủ thông tin.' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự.' };
  }

  // Check if email already exists
  const users = JSON.parse(localStorage.getItem('oliu_users') || '[]');
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Email này đã được đăng ký.' };
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    email: email,
    password: btoa(password), // Simple base64 encoding (not secure, for demo only)
    fullName: fullName,
    phone: phone,
    address: address,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem('oliu_users', JSON.stringify(users));

  return { success: true, message: 'Đăng ký thành công! Vui lòng đăng nhập.', user: newUser };
}

function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('oliu_users') || '[]');
  const user = users.find(u => u.email === email && u.password === btoa(password));

  if (!user) {
    return null;
  }

  // Save current user session
  localStorage.setItem('oliu_current_user', JSON.stringify({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    address: user.address
  }));

  return user;
}

function logoutUser() {
  localStorage.removeItem('oliu_current_user');
}

function getCurrentUser() {
  const userStr = localStorage.getItem('oliu_current_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

function isUserLoggedIn() {
  return getCurrentUser() !== null;
}

function updateUserProfile(fullName, phone, address) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;

  const users = JSON.parse(localStorage.getItem('oliu_users') || '[]');
  const userIndex = users.findIndex(u => u.id === currentUser.id);

  if (userIndex === -1) return false;

  users[userIndex].fullName = fullName;
  users[userIndex].phone = phone;
  users[userIndex].address = address;

  localStorage.setItem('oliu_users', JSON.stringify(users));
  localStorage.setItem('oliu_current_user', JSON.stringify({
    id: currentUser.id,
    email: currentUser.email,
    fullName: fullName,
    phone: phone,
    address: address
  }));

  return true;
}
