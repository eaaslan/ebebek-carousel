# E-bebek Carousel Component

## Overview

This JavaScript module creates a responsive product carousel for the E-bebek website's homepage. The carousel showcases selected products with rich product cards that include images, pricing, discounts, ratings, badges, and interactive elements like "Add to Cart" and "Favorite" buttons.

## Features

- **Responsive Design**: Automatically adjusts to display 2-5 products based on screen width
- **Smooth Navigation**: Left and right navigation buttons with smooth scrolling transitions
- **Interactive Elements**:
  - Favorite button with localStorage persistence
  - Add to Cart button (currently placeholder functionality)
- **Rich Product Display**:
  - Product images
  - Brand and product name
  - Star ratings with count
  - Original price and discount percentage (when applicable)
  - Product badges
- **Styling**: Custom styling with responsive adjustments for different viewport sizes

## Technical Implementation

### Setup and Initialization

The script begins by loading jQuery from a CDN and then self-executes once jQuery is available. It only runs on the E-bebek homepage.

```javascript
(function loadjQuery() {
  const jqueryScript = document.createElement("script");
  jqueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
  // ...
  
  jqueryScript.onload = () => {
    // Main implementation inside this callback
  };
  document.head.appendChild(jqueryScript);
})();
```

### Data Management

The component fetches product data from a GitHub Gist URL and stores it in localStorage for persistence and performance:

```javascript
const url = "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";
```

Since the API data doesn't include ratings or badges, the script uses dummy data:

```javascript
const dummyRatingData = [
  { productId: 1, rating: 5, count: 10 },
  // ...
];

const dummyBadgeData = [
  {
    productId: 1,
    badges: [
      "https://www.e-bebek.com/assets/images/cok-satan.png",
      "https://www.e-bebek.com/assets/images/yildiz-urun.png",
    ],
  },
  // ...
];
```

### Component Structure

The carousel is built with a semantic structure:

```javascript
const buildStructure = () => {
  const html = `
     <div class="ebebek-carousel">
        <h2 class="carousel-title">Sizin için Seçtiklerimiz</h2>
        <div class="carousel-container">
            <button class="carousel-btn prev-btn"></button>
            <div class="carousel-track-container">
            <div class="carousel-track"></div>
            </div>
            <button class="carousel-btn next-btn"></button>
        </div>
    </div>
  `;
  $(".Section2A").prepend(html);
};
```

### Product Cards

Each product is displayed as a card with detailed information:

```javascript
const buildProductCards = (products) => {
  // ...
  const card = `
    <a href="${product.url}" target="_blank" class="carousel-item">
      <div class="product-item-img">
        <!-- Product badges -->
        <div class="product-img">
          <img src="${product.img}" alt="${product.name}" />
        </div>
      </div>
      <div class="product-item-content">
        <!-- Product title, rating, pricing -->
      </div>
      <!-- Favorite button and Add to Cart -->
    </a>
  `;
  // ...
};
```

### Favorite Functionality

The component implements a favorite system with localStorage persistence:

```javascript
const isFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.includes(id);
};

const addToFavorites = (id) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favorites.includes(id)) return;
  favorites.push(id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const removeFromFavorites = (id) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const newFavorites = favorites.filter((favorite) => favorite !== id);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
};
```

### Responsive Design

The carousel adjusts the number of visible items based on screen width:

```javascript
const getItemsPerScreen = () => {
  const width = $(window).width();
  if (width >= 1480) return 5;
  if (width >= 1280) return 4;
  if (width >= 1048) return 3;
  if (width >= 576) return 2;
  return 2;
};
```

Corresponding CSS media queries ensure proper styling at different breakpoints:

```css
@media (max-width: 1480px) {
  .carousel-item {
    flex: 0 0 calc((100% - 60px) / 4);
    margin: 16px 0 22px 0px;
  }
  .ebebek-carousel {
    max-width: 1100px;
  }
}
```

### Event Handling

The component handles several user interactions:

```javascript
const setEvents = () => {
  // Navigation buttons
  $(".next-btn").click(() => {
    // Navigate forward
  });
  
  $(".prev-btn").click(() => {
    // Navigate backward
  });
  
  // Window resize handler
  $(window).on("resize", function () {
    // Adjust carousel
  });
  
  // Favorite button handler
  $(".favorite-btn").click(function (event) {
    // Toggle favorite status
  });
  
  // Add to cart button handler
  $(".btn-item-add-to-cart").click(function (event) {
    event.preventDefault();
    // Currently just prevents default action
  });
};
```

## Styling

The component uses a comprehensive CSS ruleset that covers:
- Main carousel container and structure
- Product cards and hover effects
- Product information layout and typography
- Interactive elements (buttons, ratings)
- Responsive adjustments

All styling is contained within the component and injected into the page:

```javascript
const buildCSS = () => {
  const css = `
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;..."); 
      /* All component CSS here */
    </style>
  `;
  $("head").append(css);
};
```

## Installation

1. Copy the entire JavaScript code
2. Add it to the E-bebek website either through:
   - A browser extension like Tampermonkey
   - The website's JavaScript files
   - A custom script tag in the page

The script is self-contained and will only execute on the E-bebek homepage.

## Usage Notes

- The component automatically adds itself to the `.Section2A` element on the E-bebek homepage
- Product data is fetched once and stored in localStorage for performance
- Favorite selections persist between page visits through localStorage
- The component is fully responsive and will adapt to various screen sizes
