import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="flex items-center justify-center py-20 px-4 min-h-[60vh]">
          <Card className="w-full max-w-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center mb-2">Favorites</CardTitle>
              <p className="text-muted-foreground text-center">
                Your saved artists and events will appear here.
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                No favorites yet.
              </div>
              <div className="flex justify-center mt-4">
                <Button className="transition-colors duration-150" onClick={() => navigate("/artists")}>
                  Browse Artists
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

export default Favorites;