const API_BASE = "/api/UserNotes";

export const saveNoteToService = async (note, isNew) => {
  const method = isNew ? "POST" : "PUT";

  await fetch(API_BASE, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRF": "1",
    },
	credentials: "include",
    body: JSON.stringify(note),
  });
};

export const deleteNoteAtService = async (deletingNoteId) => {
  await fetch(API_BASE, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF": "1",
    },
	credentials: "include",
    body: JSON.stringify({ noteID: deletingNoteId }),
  });
};

export const fetchNotesFromService = async () => {
  try {
    const response = await fetch(`${API_BASE}`, {
      headers: {
        "X-CSRF": "1",
      },
	  credentials: "include",
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
