import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Signed in!", description: "You have successfully signed in." });
    // Add authentication logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="flex items-center justify-center py-20 px-4 bg-gradient-festival min-h-[60vh]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center mb-2">Sign In</CardTitle>
              <p className="text-muted-foreground text-center">
                Access your account to book artists and manage your events.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSignIn}>
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                  <Input id="password" type="password" placeholder="Your password" required />
                </div>
                <Button type="submit" className="w-full">Sign In</Button>
                <Button variant="link" onClick={() => navigate("/join-client")}>Sign Up</Button>
              </form>
              <div className="text-center mt-4">
                <span className="text-sm text-muted-foreground">Don&apos;t have an account?</span>
                <Button
                  variant="link"
                  className="ml-1 p-0 h-auto text-primary transition-colors duration-150"
                  onClick={() => navigate("/join-client")}
                >
                  Sign Up
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

export default SignIn;