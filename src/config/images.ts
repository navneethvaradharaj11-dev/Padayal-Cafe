// src/config/images.ts
// Centralized image registry for Padayal Cafe.
// All images are registered here with accurate metadata.

export type ImageSource = {
  src: string;
  alt: string;
  sourceType: "placeholder" | "official" | "illustrative";
  isOfficial: boolean;
  attribution?: string;
};

export const IMAGES = {
  // Logo – local brand logo.
  logo: {
    src: "/logo.png",
    alt: "Padayal logo",
    sourceType: "placeholder",
    isOfficial: false,
  } as ImageSource,

  // Hero – traditional South Indian unboiled feast ambiance.
  hero: {
    src: "/images/hero-banner.jpg",
    alt: "Padayal traditional natural feast spread",
    sourceType: "illustrative",
    isOfficial: false,
  } as ImageSource,

  // Dishes
  dishes: {
    rajaVirundhu: {
      src: "/images/food/raja-virundhu.jpg",
      alt: "Padayal Traditional Raja Virundhu on fresh plantain leaf",
      sourceType: "illustrative",
      isOfficial: false,
    },
    spicedAvalTiffin: {
      src: "/images/food/spiced-aval-tiffin.jpg",
      alt: "Coconut and spiced red aval tiffin bowl",
      sourceType: "illustrative",
      isOfficial: false,
    },
    sproutsSalad: {
      src: "/images/food/sprouts-salad.jpg",
      alt: "Navadhanya sprouted pulses live protein salad",
      sourceType: "illustrative",
      isOfficial: false,
    },
    coconutElixir: {
      src: "/images/food/coconut-elixir.jpg",
      alt: "Pollachi tender coconut and lemongrass herbal elixir",
      sourceType: "illustrative",
      isOfficial: false,
    },
    mudakathanSoup: {
      src: "/images/food/mudakathan-soup.jpg",
      alt: "Mudakathan and sprouted fenugreek cold herbal soup",
      sourceType: "illustrative",
      isOfficial: false,
    },
    tenderCoconutPayasam: {
      src: "/images/food/tender-coconut-payasam.jpg",
      alt: "Tender coconut pulp and palm jaggery payasam dessert",
      sourceType: "illustrative",
      isOfficial: false,
    },
    tulsiMintShot: {
      src: "/images/food/tulsi-mint-shot.jpg",
      alt: "Wild amla, holy basil and mint cold press elixir",
      sourceType: "illustrative",
      isOfficial: false,
    },
    cucumberPachadi: {
      src: "/images/food/cucumber-pachadi.jpg",
      alt: "Country cucumber and fresh curd-free pomegranate pachadi",
      sourceType: "illustrative",
      isOfficial: false,
    },
  },

  // Founder – authentic portrait provided by user.
  founder: {
    src: "/images/founder.png",
    alt: "Portrait of Chef Padayal Sivakumar (R. Sivakumar)",
    sourceType: "official",
    isOfficial: true,
  } as ImageSource,

  // Gallery
  gallery: [
    {
      src: "/images/food/raja-virundhu.jpg",
      alt: "Traditional Plantain Leaf Feast",
      sourceType: "illustrative",
      isOfficial: false,
    },
    {
      src: "/images/food/sprouts-salad.jpg",
      alt: "Live Navadhanya Sprouted Pulses",
      sourceType: "illustrative",
      isOfficial: false,
    },
    {
      src: "/images/food/coconut-elixir.jpg",
      alt: "Cold-Pressed Tender Coconut Elixirs",
      sourceType: "illustrative",
      isOfficial: false,
    },
    {
      src: "/images/food/spiced-aval-tiffin.jpg",
      alt: "Seasoned Red Aval Delicacy",
      sourceType: "illustrative",
      isOfficial: false,
    },
    {
      src: "/images/food/tender-coconut-payasam.jpg",
      alt: "Tender Coconut Pulp Payasam",
      sourceType: "illustrative",
      isOfficial: false,
    },
    {
      src: "/images/hero-banner.jpg",
      alt: "Eco-Friendly Dining Ambience",
      sourceType: "illustrative",
      isOfficial: false,
    },
  ] as ImageSource[],

  // Wellness articles
  wellness: {
    foodPhilosophy: {
      src: "/images/wellness/food-philosophy.jpg",
      alt: "Natural South Indian vegetables, spices and herbs in brass and terracotta vessels",
      sourceType: "illustrative",
      isOfficial: false,
    },
    mudakathanGreens: {
      src: "/images/wellness/mudakathan-greens.jpg",
      alt: "Fresh native Mudakathan climbing herb and amla in clay bowl with herbal cup",
      sourceType: "illustrative",
      isOfficial: false,
    },
    redAvalStaple: {
      src: "/images/wellness/red-aval-heritage.jpg",
      alt: "Traditional unboiled red aval in woven muram with fresh coconut and spices",
      sourceType: "illustrative",
      isOfficial: false,
    },
  },
};
