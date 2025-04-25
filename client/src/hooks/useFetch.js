import cookies from "js-cookie";

export function useFetch() {
  async function makeRequest(
    uri,
    method = "GET",
    body = null,
    headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": cookies.get("csrftoken"),
      "Accept": "application/json",
    }
  ) {

    const options = {
      method,
      credentials: "same-origin",
      headers,
    }
    if (body) {
       options.body = JSON.stringify(body || {})
    }

    const response = await fetch(uri, options);
    // generically handle errors
    // handle parsing
    return response;
  }

  return makeRequest;
}
