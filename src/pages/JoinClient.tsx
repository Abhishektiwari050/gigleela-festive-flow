import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const JoinClient = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Registration successful!", description: "Welcome as a client." });
    // Add registration logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="flex items-center justify-center py-20 px-4 min-h-[60vh]">
          <Card className="w-full max-w-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center mb-2">Join as Client</CardTitle>
              <p className="text-muted-foreground text-center">
                Register to book artists and manage your festival events.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleRegister}>
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                  <Input id="name" type="text" placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <Button type="submit" className="w-full">Register</Button>
                <Button variant="link" onClick={() => navigate("/signin")}>Already have an account? Sign In</Button>
              </form>
              <div className="text-center mt-4">
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary transition-colors duration-150"
                  onClick={() => navigate("/signin")}
                >
                  Already have an account? Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JoinClient;