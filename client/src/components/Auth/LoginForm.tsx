import { SetStateAction, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useAuth } from "./index.tsx";
import { useLocation, useNavigate } from "react-router-dom"; // Ajustez le chemin d'accès selon votre structure de projet

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signin } = useAuth(); // hook d'authentification

  const navigate = useNavigate();
  const location = useLocation();
  const from: string = location.state?.from?.pathname || "/";
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError(""); // Réinitialiser les messages d'erreur précédents
    signin(username, password, setError, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
            className="w-full"
          />
          <Input
            type={"password"}
            value={password}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setPassword(e.target.value)
            }
            placeholder="Mot de passe"
            className="w-full"
          />
          <Button
            color={"primary"}
            variant={"shadow"}
            type={"submit"}
            className="mt-4 w-full"
          >
            Se connecter
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
