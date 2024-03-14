const BASE_URL = 'http://62.113.113.183:8963/api/v1';

const checkRequest = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((data) => {
    throw new Error(data.message);
  });
};

const body = {
  name: 'string',
  numberPassport: 'string',
  issuedBy: 'string',
  dateIssuePassport: '2024-02-10',
  roleContactId: 0,
  photos: ['string'],
  comment: 'string',
};

export const getContacts = async (key) => {
  await fetch(`${BASE_URL}/admin/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'x-authorization' : key, 
    },
  }).then(checkRequest);
};

export const createContact = async ({
  name,
  numberPassport,
  issuedBy,
  dateIssuePassport,
  roleContactId,
  photos,
  comment,
}) => {
  await fetch(`${BASE_URL}/contacts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      name,
      numberPassport,
      issuedBy,
      dateIssuePassport,
      roleContactId,
      photos,
      comment,
    }),
  }).then(checkRequest);
};
