import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import "../styles/AuthPage.css";

type AuthPageProps = {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}
export default function AuthPage  ({ isActive, setIsActive }: AuthPageProps)  {
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", tel: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleToggle = () => setIsActive(!isActive);

  const handleSignupChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const register = async () => {
    const { name, email, password, tel } = signupData;
    if (!name || !email || !password || !tel) return alert("Veuillez remplir tous les champs");
    if (password !== passwordConfirmation) return alert("Les mots de passe ne correspondent pas");

    try {
      const body = { nom: name, email, password, tel };
      const res = await fetch("http://localhost:8085/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw data;

      setSuccessMessage("🎉 Compte créé avec succès ! Vous pouvez maintenant vous connecter.");

      setTimeout(() => {
        setIsActive(false);
        setSuccessMessage("");
      }, 2000);
    } catch (err: any) {
      alert(err.message);
    }
  };
  const login = async () => {
    const { email, password } = loginData;

    if (!email || !password) return alert("Veuillez remplir tous les champs");

    try {
      const response = await fetch(`http://localhost:8085/client/${email}/${password}`);
      const data = await response.json();

      if (data.length === 0 || data.message === "La table est vide") {
        alert("Email ou mot de passe incorrect !");
        return;
      }

      localStorage.setItem("User", data.nom); // stocker pour plus tard
      setSuccessMessage("✅ Connexion réussie ! Bienvenue");

      setTimeout(() => {
        setSuccessMessage("");
        window.location.href = data.nom === "Admin" ? "/admin" : "/client";
      }, 2000);
    } catch (e: any) {
      console.error(e.message);
      alert("Erreur lors de la connexion du compte");
    }
  };


  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container" style={{ top: '100px' }}>
      {successMessage && (
        <div className="toast-overlay">
          <div className="toast-box">{successMessage}</div>
        </div>
      )}

      {/* Sign Up */}
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input name="name" type="text" placeholder="Name" value={signupData.name} onChange={handleSignupChange} />
          <input name="email" type="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} />
          <input name="password" type="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} />
          <input name="passwordConfirmation" type="password" placeholder="Password Confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
          <input name="tel" type="text" placeholder="Phone Number" value={signupData.tel} onChange={handleSignupChange} pattern="[0-9]{8}" required />
          <button type="button" onClick={register}>Sign Up</button>
        </form>
      </div>

      {/* Sign In */}
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <span>or use your email password</span>
          <input name="email" type="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} />
          <input name="password" type="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} />
          <a href="#">Forget Your Password?</a>
          <button type="button" onClick={login}>Sign In</button>
        </form>
      </div>

      {/* Toggle panels */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" onClick={handleToggle}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className="hidden" onClick={handleToggle}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

