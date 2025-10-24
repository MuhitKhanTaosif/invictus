const API_URL = 'http://localhost:5002/api';

export async function adminCheck() {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    console.log('AdminCheck: Token found:', !!token);
    
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_URL}/auth/verify`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (response.status === 401) {
      // Clear invalid token
      localStorage.removeItem('token');
      throw new Error("Authentication token expired or invalid");
    }

    if (response.status === 403) {
      throw new Error("Access denied - insufficient permissions");
    }

    if (!response.ok) {
      throw new Error(`Authentication failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('AdminCheck: API response:', data);
    
    // Check if user has admin role
    if (data?.user?.role?.toLowerCase() !== "admin") {
      throw new Error("Access denied - admin privileges required");
    }
    
    console.log('AdminCheck: User authenticated successfully');
    return data.user;
  } catch (error) {
    console.error("Admin check failed:", error);
    throw new Error(`Authentication failed: ${error.message}`);
  }
}
