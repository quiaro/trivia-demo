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
    config.data = JSON.stringify(body);
  }

  const response = await fetch(url, config);
  response.ok = response.status >= 200 && response.status < 300;
  response.data = JSON.parse(response._bodyText);
  return response;
}

async function createTrivia() {
  const response = await request(`trivias`, { method: "POST" });
  if (!response.ok) throw new Error(response.statusText);
  console.log(response);
  return response;
}

export { request, createTrivia };
