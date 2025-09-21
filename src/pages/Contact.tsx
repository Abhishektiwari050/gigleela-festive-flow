import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  // Define your handler function here, at the top level of the component
  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We will get back to you soon." });
    // Add contact logic here
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Background Image */}
      <div className="fixed inset-0">
        <img 
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Indian cultural temple architecture background"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1527928159272-d4d6d5079b95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
          }}
        />
      </div>
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/60 via-pink-900/40 to-orange-900/60"></div>
      <div className="fixed inset-0 bg-black/20"></div>
      <Header />
      <main className="relative z-10">
        <section className="flex items-center justify-center py-20 px-4 min-h-[80vh]">
          <Card className="w-full max-w-xl shadow-2xl backdrop-blur-sm bg-white/95 border-white/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center mb-2">Contact Us</CardTitle>
              <p className="text-muted-foreground text-center">
                Send us a message and we’ll get back to you soon.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleContact}>
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                  <Input id="name" type="text" placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                  <Input id="message" type="text" placeholder="Your message" required />
                </div>
                <Button type="submit" className="w-full transition-colors duration-150">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;