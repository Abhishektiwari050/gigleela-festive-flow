import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const JoinArtist = () => {
  const { toast } = useToast();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Application submitted!", description: "Thank you for applying as an artist." });
    // Add application logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="flex items-center justify-center py-20 px-4 min-h-[60vh]">
          <Card className="w-full max-w-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center mb-2">Join as Artist</CardTitle>
              <p className="text-muted-foreground text-center">
                Apply to showcase your talent at our festival.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleApply}>
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                  <Input id="name" type="text" placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <label htmlFor="talent" className="block mb-1 font-medium">Talent/Category</label>
                  <Input id="talent" type="text" placeholder="e.g. Singer, Dancer" required />
                </div>
                <Button type="submit" className="w-full">Apply</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JoinArtist;