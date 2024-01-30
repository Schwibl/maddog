export async function authorization() {

  const admin = {
    id: 123,
    username: "admin",
    fullName: "Skelork",
    phoneNumber: "89774770113",
    roles: "ADMIN",
    active: true,
  };

  const response = await fetch('http://62.113.113.183:8963/api/v1/login', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa('adm:123')}`,
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(admin)
  });

  const result = await response.json();
  console.log(result.message);
}