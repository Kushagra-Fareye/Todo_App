export async function login(data) {
  let flag = false;
  await fetch(
    `http://10.0.2.2:8080/login?username=${data.email}&password=${data.password}`,
    {
      method: 'POST',
    },
  )
    .then(res => {
      if (res.status === 200) {
        flag = true;
      }
    })
    .catch(e => console.log(e));
  return flag;
}

export function signUp(data) {
  fetch('http://localhost:8080/api/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.email,
      password: data.password,
      name: data.name,
    }),
  }).then(res => console.log(res));
}
