import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { toast } from "sonner";
import { Server } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      
      <Card className="w-full max-w-md shadow-2xl backdrop-blur-sm bg-white/95 border-0">
        <CardHeader className="flex flex-col gap-4 items-center pt-8 pb-2">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Server className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Rack Manager
            </h1>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Connectez-vous pour gérer vos cellules et racks
          </p>
        </CardHeader>
        <CardBody className="px-8 pb-8 pt-4">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <Input
              label="Email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="bordered"
              size="lg"
              classNames={{
                input: "text-base",
                label: "text-gray-700 font-medium"
              }}
            />
            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="bordered"
              size="lg"
              classNames={{
                input: "text-base",
                label: "text-gray-700 font-medium"
              }}
            />
            <Button 
              type="submit" 
              color="primary" 
              size="lg" 
              className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Se connecter
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
