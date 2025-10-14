export const baseUrl = "http://localhost:3001";

export const baseHeaders = {
  "Content-Type": "application/json",
};
export const handleRequest = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
};

export function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: baseHeaders,
  }).then(handleRequest);
}

export function addItem(item, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(handleRequest);
}

export function deleteItem(_id, token) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(handleRequest);
}

export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};
