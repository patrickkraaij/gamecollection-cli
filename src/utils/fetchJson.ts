import * as fetch from 'node-fetch';

function logError(error): void {
  console.error('Looks like there was a problem: \n', error);
}

function validateResponse(response): any {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsJSON(response): any {
  return response.json();
}

export function fetchJSON(pathToResource: string): any {
  return fetch(pathToResource)
  .then(validateResponse)
  .then(readResponseAsJSON)
  .catch(logError);
}
