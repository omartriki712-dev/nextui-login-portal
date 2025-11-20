import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      toast.success("Connexion réussie!");
      navigate("/dashboard");
    } else {
      toast.error("Veuillez remplir tous les champs");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 items-center pb-6">
          <h1 className="text-2xl font-bold">Connexion</h1>
          <p className="text-sm text-default-500">
            Entrez vos identifiants pour accéder au système
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="bordered"
            />
            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="bordered"
            />
            <Button type="submit" color="primary" size="lg" className="mt-2">
              Se connecter
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
