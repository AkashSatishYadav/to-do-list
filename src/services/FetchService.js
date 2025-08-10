import { getAccessToken } from "./AuthService";
import { getUser } from "./AuthService";

const API_BASE = "https://localhost:7016/api/UserNotes";

export const saveNoteToService = async (note, isNew) => {
  const token = await getAccessToken();
  const user = await getUser();
  note.userId = user.profile.sub;
  const method = isNew ? "POST" : "PUT";

  await fetch(API_BASE, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  });
};

export const deleteNoteAtService = async (deletingNoteId) => {
  const token = await getAccessToken();
  await fetch(API_BASE, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ noteID: deletingNoteId }),
  });
};

export const fetchNotesFromService = async () => {
  try {
    const token = await getAccessToken();
    const user = await getUser();

    const response = await fetch(`${API_BASE}/${user.profile.sub}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
};
