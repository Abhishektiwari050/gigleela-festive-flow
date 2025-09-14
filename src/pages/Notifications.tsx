import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="flex items-center justify-center py-20 px-4 min-h-[60vh]">
          <Card className="w-full max-w-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center mb-2">Notifications</CardTitle>
              <p className="text-muted-foreground text-center">
                Stay updated with the latest alerts and updates.
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                No notifications yet.
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
      <Button className="transition-colors duration-150" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </div>
  );
};

export default Notifications;