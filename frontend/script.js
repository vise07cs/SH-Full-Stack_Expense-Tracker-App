    document.getElementById("signupForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch("http://localhost:3010/user/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        document.getElementById("responseMsg").textContent = data.message;
      } catch (err) {
        document.getElementById("responseMsg").textContent = "Error: " + err.message;
      }
    });