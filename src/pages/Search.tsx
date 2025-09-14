import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Search = () => {
  const { toast } = useToast();

  // Define the handler function here, outside of JSX
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Search submitted!", description: "Searching for artists/events..." });
    // Add search logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="flex items-center justify-center py-20 px-4 min-h-[60vh]">
          <Card className="w-full max-w-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center mb-2">Search</CardTitle>
              <p className="text-muted-foreground text-center">
                Find artists, events, and more.
              </p>
            </CardHeader>
            <CardContent>
              <form className="flex gap-2 mb-8" onSubmit={handleSearch}>
                <Input type="text" placeholder="Search for artists, events..." className="flex-1" />
                <Button type="submit" className="transition-colors duration-150">
                  Search
                </Button>
              </form>
              {/* Add search results here */}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;