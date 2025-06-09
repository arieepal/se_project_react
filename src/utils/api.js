export const baseUrl = "http://localhost:3001";

export function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: { "Content-Type": "application/json" },
  }).then(handleRequest);
}

export function postItems(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then(handleRequest);
}

export function deleteItems(id) {
  return fetch(`${baseUrl}/items/${id.toString()}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(handleRequest);
}

const handleRequest = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
};
