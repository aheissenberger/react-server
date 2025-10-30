//export default async function GetLogin(context: any) {
export default async function GetLogin() {
  return new Response(JSON.stringify({ message: "Login successful" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
