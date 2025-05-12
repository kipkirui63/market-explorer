import { Button } from "@/components/ui/button";

const MarketplaceCTA = () => {
  const scrollToMarketplace = () => {
    const marketplaceSection = document.getElementById("marketplace");
    if (marketplaceSection) {
      marketplaceSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#0076c6] to-[#0076c6]/90 text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Find the Perfect Digital Tools
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Discover and purchase powerful applications and AI agents to enhance your workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold h-auto"
                onClick={scrollToMarketplace}
              >
                Browse Marketplace
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://crispai.crispvision.org/media/crisp-logo.png"
              alt="CrispAI Logo"
              className="rounded-xl shadow-2xl w-3/4 h-auto 
                       filter brightness-0 invert 
                       sepia-[100%] saturate-[500%] hue-rotate-[172deg]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceCTA;
