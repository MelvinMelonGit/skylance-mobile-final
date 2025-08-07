import * as SecureStore from 'expo-secure-store';

async function login(email, password) {
  const res = await fetch(`${apiUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  await SecureStore.setItemAsync('authToken', data.token);

  return data.token;
}

async function fetchSecretData() {
  const token = await SecureStore.getItemAsync('authToken');
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(`${process.env.API_URL}/data/secret`, {
    headers: {
      'Session-Token': token,
    },
  });

  if (!res.ok) throw new Error('Unauthorized');

  return await res.json();
}

// async function fetchSecretData() {
//   const token = await SecureStore.getItemAsync('authToken');
//   if (!token) throw new Error('Not authenticated');

//   const res = await fetch(`${process.env.API_URL}/data/secret`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   if (!res.ok) throw new Error('Unauthorized');

//   return await res.json();
// }

// | Scenario              | API\_URL value                                                        |
// | --------------------- | --------------------------------------------------------------------- |
// | Local development     | `http://localhost:5035` or `http://10.0.2.2:5035` (Android emulator)  |
// | Physical device dev   | `http://YOUR_COMPUTER_IP:5035` (e.g. `http://192.168.1.100:5035`)     |
// | Production deployment | `https://api.yourdomain.com` (or server IP like `http://34.12.45.67`) |

