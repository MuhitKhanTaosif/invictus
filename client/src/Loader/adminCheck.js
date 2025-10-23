const API_URL = import.meta.env.VITE_Backend_Base_API_URL;

export async function adminCheck() {
  try {
    const response = await fetch(`${API_URL}/user/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 400) {
      throw new Error("Cookies not receive");
    }

    if (response.status === 401) {
      throw new Error("User Session  expired ");
    }
    const data = await response.json();
    if (data?.role?.toLowerCase?.() !== "admin") return null;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user from server", error);
  }
}
