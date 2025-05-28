import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, Lock } from "lucide-react";
import { ProductImage } from "@/components/ProductImages";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

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
  "Business Intelligent Agent": "https://5d7f171b-75bc-4079-8dfe-bf2efcdd2c9f-00-1r04f6yyvxkmn.picard.replit.dev/",
  "CrispWrite": "https://13258e34-e96c-4122-8dca-b63edcb236d1-00-9ajfnadifwon.picard.replit.dev/",
  "SOP Assistant": "https://workflow.getmindpal.com/sop-agent-workflow-avlkgrhad7x0xazm",
  "Resume Analyzer": "https://workflow.getmindpal.com/67751e695156e8aaefc0c8de",
  "Text to SQL": "https://d7617397-c7d3-46e6-97ac-d777e7022280-00-1gdi5a1buq1x0.worf.replit.dev/",
  "AI Recruitment Assistant": "https://workflow.mindpal.space/67751913f9c93fd0de68fa31"
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const { toast } = useToast();
  
  // Get user from auth context
  const { user } = useAuth();
  
  // Check subscription access
  const { data: subscriptionAccess } = useQuery({
    queryKey: ['/api/subscription-access'],
    enabled: !!user,
  });
  
  // Check if this product has an external app URL
  const hasExternalApp = !!productUrlMap[product.name];
  
  // Determine if user has access to this agent
  const hasAgentAccess = user && subscriptionAccess?.hasAccess;
  
  const handleAgentAccess = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    // If user is not logged in, redirect to auth page
    if (!user) {
      localStorage.setItem('redirectAfterAuth', window.location.pathname);
      window.location.href = '/auth';
      return;
    }
    
    // If user doesn't have subscription access, block access
    if (!hasAgentAccess) {
      return;
    }
    
    // If user has access, open the external app
    if (hasExternalApp) {
      const url = productUrlMap[product.name];
      window.open(url, '_blank');
    }
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the click from bubbling up to the parent card
    e.stopPropagation();
    
    // Store the current URL to redirect back after login
    localStorage.setItem('redirectAfterAuth', window.location.pathname);
    
    // If user is not logged in, redirect to auth page
    if (!user) {
      // Use a more reliable navigation method
      window.location.assign("/auth");
      return;
    }
    
    try {
      // Get existing cart items from the main 'cart' storage
      let existingCart = [];
      const cartData = localStorage.getItem('cart');
      
      if (cartData) {
        existingCart = JSON.parse(cartData);
      }
      
      // Check if this product is already in cart
      const existingItem = existingCart.find((item: any) => item.id === product.id);
      
      if (existingItem) {
        // Increment quantity if already in cart
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        // Add new item to cart with quantity 1
        existingCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        });
      }
      
      // Save the cart to all storage locations for consistency
      localStorage.setItem('cart', JSON.stringify(existingCart));
      localStorage.setItem('cart_guest', JSON.stringify(existingCart));
      
      if (user && user.id) {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(existingCart));
      }
      
      // Dispatch storage event to notify other components that cart has changed
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('There was an error adding this item to your cart. Please try again.');
    }
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

  // Check if user has purchased this product - for TESTING, all logged in users have access
  const hasUserPurchasedProduct = () => {
    // If user is logged in, grant access to all products (for testing)
    return !!user;
  };

  // Function to handle clicking on the product card
  const handleProductClick = () => {
    // Check authentication and subscription before allowing access
    if (!user) {
      localStorage.setItem('redirectAfterAuth', window.location.pathname);
      window.location.href = '/auth';
      return;
    }
    
    if (!hasAgentAccess) {
      return;
    }
    
    // Only allow access if user has subscription
    if (hasExternalApp) {
      const url = productUrlMap[product.name];
      window.open(url, '_blank');
    }
  };

  // Simple demo modal functionality
  const showDemo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (hasExternalApp) {
      if (hasUserPurchasedProduct()) {
        window.open(productUrlMap[product.name], '_blank');
      } else {
        alert(`Please purchase ${product.name} to access this feature.`);
      }
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
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${hasExternalApp ? 'cursor-pointer' : ''}`}
      onClick={hasExternalApp ? handleProductClick : undefined}
    >
      <div className="relative">
        <div
          className="w-full h-48 bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden"
        >
          {/* We'll use our ProductImage component which shows nice icons for each product */}
          <ProductImage id={product.id} />
        </div>
        {product.badge && (
          <div className={`absolute top-3 right-3 ${
            product.badge === "NEW" 
              ? "bg-[#805AD5]" 
              : product.badge === "TRENDING" || product.badge === "BESTSELLER" 
                ? "bg-[#F6AD55]" 
                : "cta-button"
          } text-white text-xs font-bold px-2 py-1 rounded`}>
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <div className="text-right">
            <span className="text-lg font-bold color-primary block">
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
            className="color-primary hover:text-blue-700 hover:bg-blue-50"
          >
            <ThumbsUp className="h-4 w-4 mr-1" /> Rate
          </Button>
        </div>
        <div className="flex">
          {hasExternalApp ? (
            <Button
              onClick={handleAgentAccess}
              className={`w-full text-white ${hasAgentAccess ? 'cta-button' : 'bg-gray-400 hover:bg-gray-500'}`}
              disabled={!user}
            >
              {!user ? (
                'Login to Access'
              ) : !hasAgentAccess ? (
                'Subscribe to Access'
              ) : (
                'Access Agent'
              )}
            </Button>
          ) : (
            <Button
              onClick={handleAddToCart}
              className="cta-button text-white w-full"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;