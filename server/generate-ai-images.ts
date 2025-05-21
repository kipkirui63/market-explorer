import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Create directory if it doesn't exist
const ensureDirExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Define product descriptions for image generation
const products = [
  {
    id: "1",
    name: "Business Intelligent Agent",
    prompt: "A professional illustration of a business intelligence dashboard with data visualization elements, charts, and AI analyzing SQL code, in blue and white corporate style. Clean, minimal design."
  },
  {
    id: "2",
    name: "AI Recruitment Assistant",
    prompt: "A professional illustration of an AI recruitment system reviewing candidate profiles and resumes, with organized CV documents and rating system, in blue and white corporate style."
  },
  {
    id: "3",
    name: "CrispWrite",
    prompt: "A professional illustration of an AI writing assistant improving a document with suggestions and edits, showing text being refined and enhanced, in blue and white corporate style."
  },
  {
    id: "4",
    name: "SOP Assistant",
    prompt: "A professional illustration of standard operating procedures being created with AI assistance, showing workflow diagrams and process documents, in blue and white corporate style."
  },
  {
    id: "5",
    name: "Resume Analyzer",
    prompt: "A professional illustration of an AI system analyzing a resume and highlighting key skills and experience, with rating elements and skill scores, in blue and white corporate style."
  }
];

// Generate and save product images
async function generateProductImages() {
  console.log('Starting image generation...');
  
  // Ensure public and images directories exist
  const publicDir = path.join(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'product-images');
  
  ensureDirExists(publicDir);
  ensureDirExists(imagesDir);
  
  for (const product of products) {
    try {
      console.log(`Generating image for ${product.name}...`);
      
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: product.prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "b64_json"
      });
      
      // Check if data and b64_json are present
      if (response.data && response.data[0]?.b64_json) {
        const imgData = response.data[0].b64_json;
        const imgPath = path.join(imagesDir, `product-${product.id}.png`);
        
        // Save the image
        fs.writeFileSync(imgPath, Buffer.from(imgData, 'base64'));
        console.log(`Successfully saved image for ${product.name} to ${imgPath}`);
      } else {
        console.error(`No image data returned for ${product.name}`);
      }
    } catch (error) {
      console.error(`Error generating image for ${product.name}:`, error);
    }
  }
  
  console.log('Image generation complete!');
}

// Run the function
generateProductImages().catch(console.error);