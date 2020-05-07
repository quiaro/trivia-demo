const backendHost =
  process.env.REACT_APP_BACKEND_HOST || "http://localhost:3000";
const baseURL = `${backendHost}/api/`;

async function request(endpoint, { body, method, ...customConfig } = {}) {
  const url = `${baseURL}${endpoint}`;
  const headers = { "content-type": "application/json" };
  const config = {
    method: method ? method : body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);
  response.ok = response.status >= 200 && response.status < 300;
  return response;
}

async function createTrivia() {
  const response = await request(`trivias`, { method: "POST" });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

async function getTrivia(id) {
  const response = await request(`trivias/${id}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

async function updateTrivia(id, answers) {
  const response = await request(`trivias/${id}`, {
    method: "PATCH",
    body: { answers },
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export { request, createTrivia, getTrivia, updateTrivia };
