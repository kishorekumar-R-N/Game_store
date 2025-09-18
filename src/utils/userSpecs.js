import api from "../api";

export async function fetchUserSpecs() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const res = await api.get("/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.user.system_specs;
  } catch {
    return null;
  }
}
