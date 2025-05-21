import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define product descriptions for image generation
const products = [
  {
    id: "1",
    name: "Business Intelligent Agent",
    description: "Intelligent agent that converts natural language queries into optimized SQL code instantly with AI-powered translation.",
    prompt: "A professional, modern illustration representing a business intelligence AI agent transforming text into SQL code, with data visualization elements and a blue and white color scheme. Clean, minimal, corporate style."
  },
  {
    id: "2",
    name: "AI Recruitment Assistant",
    description: "Intelligent assistant that streamlines your recruitment process with automated candidate screening and ranking.",
    prompt: "A clean, professional illustration of an AI recruitment assistant reviewing candidate profiles and sorting applications, with resume elements, profile icons, and ranking symbols. Blue and white corporate style."
  },
  {
    id: "3",
    name: "CrispWrite",
    description: "AI-powered writing tool that helps you create clear, concise, and professional documents effortlessly.",
    prompt: "A sleek, modern illustration of an AI writing assistant helping to craft professional documents, with text elements, suggestion bubbles, and document icons. Clean blue and white color palette."
  },
  {
    id: "4",
    name: "SOP Assistant",
    description: "Specialized tool for creating and optimizing Standard Operating Procedures with AI-powered templates.",
    prompt: "A professional illustration of a Standard Operating Procedures assistant organizing workflow diagrams and process documents, with checklist elements and process flow symbols. Corporate blue and white style."
  },
  {
    id: "5",
    name: "Resume Analyzer",
    description: "Advanced AI system that comprehensively analyzes and scores resumes for optimal hiring decisions.",
    prompt: "A clean, corporate illustration of an AI resume analyzer scanning documents and highlighting key skills, with resume elements, skill ratings, and analysis markers. Blue and white professional style."
  }
];

async function generateAndSaveImages() {
  const publicDir = path.resolve('public');
  const imagesDir = path.join(publicDir, 'product-images');
  
  // Create directories if they don't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }
  
  console.log('Starting image generation...');
  
  // Generate each image sequentially
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
      
      if (response.data[0].b64_json) {
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
generateAndSaveImages().catch(console.error);