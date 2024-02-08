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

    console.log(response);

    const result = await response.json();
    console.log(result);

    return result;

  }
  catch (e) {
    console.error("блок catch", e.message);
    return null;
  }
}