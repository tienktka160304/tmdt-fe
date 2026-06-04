export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  console.log("Đã đăng xuất!");
}

export function saveUserToken(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem("token") || null;
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function removeTokenUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export async function isTokenValid() {
  const token = getToken();

  if (!token) return false;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/check-token`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      removeTokenUser();
      return false;
    }

    const data = await response.json();

    if (data.user) {
      saveUser(data.user);
    }

    return true;
  } catch (error) {
    removeTokenUser();
    return false;
  }
}
