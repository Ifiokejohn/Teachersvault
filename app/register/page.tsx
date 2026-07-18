export default function RegisterPage() {
  return (
    <main>
      <h1>Create Account</h1>

      <form>
        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button type="submit">
          Register
        </button>
      </form>
    </main>
  );
}
