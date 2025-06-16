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

export function postItems(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify(item),
  }).then(handleRequest);
}

export function deleteItems(_id) {
  console.log("Deleting item with ID:", _id);
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: baseHeaders,
  }).then(handleRequest);
}
