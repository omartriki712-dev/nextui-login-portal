import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { Beaker, Lock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary-100 rounded-full">
            <Beaker className="h-16 w-16 text-primary" />
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Système de Gestion des Cellules
        </h1>
        <p className="text-xl text-default-600 max-w-md mx-auto">
          Gérez vos cellules de laboratoire avec efficacité et précision
        </p>
        <Button
          size="lg"
          color="primary"
          startContent={<Lock className="h-5 w-5" />}
          onClick={() => navigate("/login")}
          className="mt-8"
        >
          Accéder au système
        </Button>
      </div>
    </div>
  );
};

export default Index;
