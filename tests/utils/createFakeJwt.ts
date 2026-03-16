// Nota: mockear la decodificación del jwt:
const createFakeJwt = (payload: { sub: string; exp: number; app_metadata: { role: string } }) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.fake-signature`;
};

export default createFakeJwt;
