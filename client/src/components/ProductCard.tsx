import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Play, ThumbsUp, ExternalLink } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  rating?: string;
  reviewCount?: number;
  badge?: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

// Map products to their respective external app URLs
const productUrlMap: Record<string, string> = {
  "CrispWrite": "https://13258e34-e96c-4122-8dca-b63edcb236d1-00-9ajfnadifwon.picard.replit.dev/",
  "SOP Assistant": "https://workflow.getmindpal.com/sop-agent-workflow-AvLKGRHAD7x0XAZm",
  "Multi-Agent Resume Analyzer": "https://workflow.mindpal.space/67751e695156e8aaefc0c8de",
  "Text to SQL": "https://d7617397-c7d3-46e6-97ac-d777e7022280-00-1gdi5a1buq1x0.worf.replit.dev/",
  "AI Recruitment Assistant": "https://workflow.mindpal.space/67751913f9c93fd0de68fa31"
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  
  // Check if this product has an external app URL
  const hasExternalApp = !!productUrlMap[product.name];
  
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the click from bubbling up to the parent card
    e.stopPropagation();
    
    // Simplified cart functionality for now
    alert(`Added ${product.name} to cart!`);
  };

  const renderRatingStars = (rating: string) => {
    const ratingValue = parseFloat(rating || "0");
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-current" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-current" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    );
  };

  // Function to handle clicking on the product card
  const handleProductClick = () => {
    if (hasExternalApp) {
      window.open(productUrlMap[product.name], '_blank');
    }
  };

  // Simple demo modal functionality
  const showDemo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (hasExternalApp) {
      window.open(productUrlMap[product.name], '_blank');
    } else {
      alert(`Demo for ${product.name} would be shown here.`);
    }
  };

  // Simple rating functionality
  const showRating = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    alert(`Rate ${product.name}`);
  };

  return (
    <div 
      id={`product-${product.id}`} 
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${hasExternalApp ? 'cursor-pointer' : ''}`}
      onClick={hasExternalApp ? handleProductClick : undefined}
    >
      <div className="relative">
        <div
          className="w-full h-48 bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden"
        >
          {product.name === "Text to SQL" && (
            <div className="flex flex-col items-center">
              <code className="text-blue-700 text-lg font-mono">SELECT * FROM</code>
              <span className="text-blue-800 text-xl font-semibold mt-2">{product.name}</span>
            </div>
          )}
          {product.name === "AI Recruitment Assistant" && (
            <div className="flex flex-col items-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mb-2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span className="text-blue-800 text-lg font-semibold">{product.name}</span>
            </div>
          )}
          {product.name === "CrispWrite" && (
            <div className="flex flex-col items-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mb-2">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
              <span className="text-blue-800 text-lg font-semibold">{product.name}</span>
            </div>
          )}
          {product.name === "SOP Assistant" && (
            <div className="flex flex-col items-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mb-2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span className="text-blue-800 text-lg font-semibold">{product.name}</span>
            </div>
          )}
          {product.name === "Multi-Agent Resume Analyzer" && (
            <div className="flex flex-col items-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mb-2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span className="text-blue-800 text-lg font-semibold">{product.name}</span>
            </div>
          )}
          {!["Text to SQL", "AI Recruitment Assistant", "CrispWrite", "SOP Assistant", "Multi-Agent Resume Analyzer"].includes(product.name) && (
            <span className="text-blue-800 text-xl font-semibold">{product.name}</span>
          )}
        </div>
        {product.badge && (
          <div className={`absolute top-3 right-3 ${
            product.badge === "NEW" 
              ? "bg-[#805AD5]" 
              : product.badge === "TRENDING" || product.badge === "BESTSELLER" 
                ? "bg-[#F6AD55]" 
                : "bg-blue-500"
          } text-white text-xs font-bold px-2 py-1 rounded`}>
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <div className="text-right">
            <span className="text-lg font-bold text-blue-500 block">
              ${parseFloat(product.price).toFixed(2)}
            </span>
            <span className="text-xs text-emerald-600 font-medium">7-day free trial</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {renderRatingStars(product.rating || "0")}
            <span className="text-gray-600 ml-2">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={showRating}
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
          >
            <ThumbsUp className="h-4 w-4 mr-1" /> Rate
          </Button>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white flex-1"
          >
            Add to Cart
          </Button>
          <Button
            onClick={showDemo}
            variant="outline"
            className="border-gray-300"
          >
            <Play className="h-4 w-4 mr-1" /> Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;