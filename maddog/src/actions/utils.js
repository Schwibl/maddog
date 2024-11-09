export const checkRequest = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((data) => {
    throw new Error(data.message);
  });
};
