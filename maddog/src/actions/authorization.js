
export async function authorization(name, password) {

  const encriptedUserData = btoa(`${name}:${password}`);

  try {
    const response = await fetch('http://62.113.113.183:8963/api/v1/login', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encriptedUserData}`,
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    const result = await response.json();
    console.log(response.headers.get('x-authorization'));

    return result;
  }

  catch (e) {
    console.error("блок catch", e.message);
    return null;
  }
}
