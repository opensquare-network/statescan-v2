import newApi from "../../../../services/chainApi";

export async function getApi(chain, endpoint) {
  const api = await newApi(chain, endpoint);
  await api.isReady;
  return api;
}

async function timeoutInSeconds(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(reject, seconds * 1000);
  });
}

export default function getApiInSeconds(chain, endpoint) {
  return Promise.race([getApi(chain, endpoint), timeoutInSeconds(10)]);
}
