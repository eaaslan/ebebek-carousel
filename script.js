(function loadjQuery() {
  const jqueryScript = document.createElement("script");
  jqueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
  jqueryScript.integrity =
    "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=";
  jqueryScript.crossOrigin = "anonymous";

  jqueryScript.onload = () => {
    (() => {
      // i created dummy data for rating and badge due to lack of data in the given api
      const dummyRatingData = [
        { productId: 1, rating: 5, count: 10 },
        { productId: 2, rating: 4, count: 8 },
        { productId: 3, rating: 3, count: 6 },
        { productId: 4, rating: 2, count: 4 },
        { productId: 6, rating: 5, count: 7 },
        { productId: 7, rating: 4, count: 5 },
        { productId: 8, rating: 3, count: 2 },
      ];
      const dummyBadgeData = [
        {
          productId: 1,
          badges: [
            "https://www.e-bebek.com/assets/images/cok-satan.png",
            "https://www.e-bebek.com/assets/images/yildiz-urun.png",
          ],
        },
        {
          productId: 2,
          badges: ["https://www.e-bebek.com/assets/images/cok-satan.png"],
        },
        {
          productId: 3,
          badges: ["https://www.e-bebek.com/assets/images/yildiz-urun.png"],
        },
        {
          productId: 4,
          badges: [
            "https://www.e-bebek.com/assets/images/cok-satan.png",
            "https://www.e-bebek.com/assets/images/yildiz-urun.png",
          ],
        },

        {
          productId: 6,
          badges: ["https://www.e-bebek.com/assets/images/yildiz-urun.png"],
        },
        {
          productId: 7,
          badges: [
            "https://www.e-bebek.com/assets/images/cok-satan.png",
            "https://www.e-bebek.com/assets/images/yildiz-urun.png",
          ],
        },
      ];
      const init = async () => {
        if (window.location.href === "https://www.e-bebek.com/") {
          // if(true){
          await getProducts();
          buildStructure();
          buildProductCards();
          buildCSS();
          setEvents();
        } else {
          console.error("This script only works on homepage");
        }
      };
      const getProducts =() => {
        return ProductService.getOrFetch()
      };
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
      // $(".carousel-container").append(html)
      };
      const  buildProductCards =  () => {
        let products=[]
        try{
         products= ProductService.getAll();
        if(products.length===0 || !(products)){
          throw new Error("There are no products")
        }}catch(error){
            console.error(error)
            return;
        }
        products.forEach((product) => {
          const discount = Math.floor(
            ((product.original_price - product.price) /
              product.original_price) *
              100
          );
          const card = `
                <a href="${product.url}" target="_blank" class="carousel-item" data-id=${product.id}>
                    <div class="product-item-img" >
                      <div class=product-item-multiple-badges>
                       ${addProductBadges(dummyBadgeData, product.id)}
                      </div>
                      <div class="product-img">
                        <img src="${product.img}" alt="${product.name}" />
                      </div>
                    </div>
                   <div class="favorite-btn-wrapper ${
                      FavoriteService.isFavorite(product.id) ? "favorited":""}">
                   <button class="favorite-btn" aria-label="Add to favorites"></button>
                    </div>
                    <div class="product-item-content">
                      <div class="product-item-title">
                        <b>${product.brand} -</b>
                        <span>${product.name}</span>
                      </div>
                      <div class="product-item-rating">
                            ${setRatingStars(dummyRatingData, product.id)}
                      </div>
                      <div class="original-price-wrapper">
                        ${
                          discount > 0
                            ? `<p class="original-price">${product.original_price} TL</p>
                        <p class="discount">%${discount}</p>
                        <i class="icon-decrease"></i>`
                            : ""
                        }
                      </div>
                      <p class="sale-price ${
                        discount > 0 ? "discounted-sale-price" : ""
                      }">${product.price} TL</p>
                    </div>
                    <div class="dummy-product-list-promo">
                    </div>
                    
                    <div class="product-item-actions">
                      <button type="submit" class="btn-item-add-to-cart">Sepete Ekle</button>
                    </div>
                </a>
            `;

            $(".carousel-track").append(card);
        });
      };
      const buildCSS = () => {
        const css = `
        <style>
            @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
            .ebebek-carousel * {
              font-family: Poppins, "cursive";
            }
            .carousel-track-container {
              border-radius: 40px;
              -webkit-box-shadow: 8px 8px 15px 0px rgba(242, 242, 242, 1);
              -moz-box-shadow: 8px 8px 15px 0px rgba(242, 242, 242, 1);
              box-shadow: 8px 8px 15px 0px rgba(242, 242, 242, 1);
              border-top-right-radius: 0;
                overflow: hidden;
            }
            .ebebek-carousel {
              max-width: 1320px;
              margin: 0 auto;
              padding: 20px;
            }
            .carousel-title {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background-color: #fef6eb;
              padding: 25px 67px;
              border-top-left-radius: 35px;
              border-top-right-radius: 35px;
              font-family: Quicksand-Bold;
              font-weight: 700;
              font-size: 31px;
              line-height: 1.11;
              color: #f28e00;
            }
            .carousel-container {
              position: relative;
              margin-bottom: 20px;
            }
            .carousel-track {
              display: flex;
              gap: 17px;
              transition: transform 0.25s ease-in-out;
              border-radius: 10px;
            }
            .carousel-item{
              flex: 0 0 calc((100% - 83px) / 5);
              border: 1px solid #eee;
              border-radius: 10px;
              font-family: Poppins, "cursive";
              color: #7d7d7d;
              font-size: 12px;
              padding: 2px;
              margin: 16px 0 22px 3px;
              position: relative;
              box-sizing: border-box;
              text-decoration: none;
            }
            .carousel-item:hover {
              box-shadow: 0 0 0 0 #00000030,inset 0 0 0 2px #f28e00;
              color: #7d7d7d !important;
            }
            .product-item-img {
              position: relative;
            }
            .product-img {
              object-fit: contain;
              margin-bottom: 10px;
            }
            .product-img img {
              width: 100%;
              height: 100%;
            }
            .product-item-multiple-badges {
              display: flex;
              flex-direction: column;
              position: absolute;
              left: 15px;
              top: 10px;
            }
            .favorite-btn-wrapper {
              position: absolute;
              top: 15px;
              right: 15px;
              height: 50px;
              width: 50px;
              cursor: pointer;
              background-color: #fff;
              border-radius: 50%;
              box-shadow: 0 2px 4px 0 #00000024;
            }
            .favorite-btn {
              width:100%;
              height: 100%;
              border: none;
              background: url('https://www.e-bebek.com/assets/svg/default-favorite.svg') no-repeat center;
            }
            .favorite-btn:hover {
              cursor: pointer;
              background: url('https://www.e-bebek.com/assets/svg/default-hover-favorite.svg') no-repeat center;
            }
           .favorite-btn-wrapper.favorited .favorite-btn {
              background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 23"><path fill="%23FF8A00" fill-rule="evenodd" clip-rule="evenodd" d="M22.6339 2.97449C21.4902 1.83033 19.9388 1.1875 18.3211 1.1875C16.7034 1.1875 15.152 1.83033 14.0084 2.97449L12.8332 4.14968L11.658 2.97449C9.27612 0.592628 5.41435 0.592627 3.03249 2.97449C0.650628 5.35635 0.650628 9.21811 3.03249 11.6L4.20769 12.7752L12.8332 21.4007L21.4587 12.7752L22.6339 11.6C23.778 10.4564 24.4208 8.90494 24.4208 7.28723C24.4208 5.66952 23.778 4.11811 22.6339 2.97449Z" stroke="%23FF8A00" stroke-width="2.17391" stroke-linecap="round" stroke-linejoin="round"/></svg>') no-repeat center;
              background-size: 25px;
            }
            .carousel-btn {
              height: 50px;
              width: 50px;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              border: none;
              border-radius: 50%;
              cursor: pointer;
            }
            .prev-btn {
              left: -65px;
              background: url(https://cdn06.e-bebek.com/assets/svg/prev.svg) no-repeat;
              background-position: 18px;
              background-color: #fef6eb;
            }
            .next-btn {
              right: -65px;
              background: url(https://cdn06.e-bebek.com/assets/svg/next.svg) no-repeat;
              background-position: 18px;
              background-color: #fef6eb;
            }
            .product-item-content {
              padding: 0 17px 17px;
            }
            .product-item-rating {
              display: flex;
              gap: 5px;
              margin-bottom:8px;
            }
            .product-item-title {
            margin-top:50px;
              min-height: 56px;
              font-size: 11.52px;
              line-height: 14.08px;
            }

            .product-item-title span {
              font-weight: 500;
            }

            .original-price-wrapper {
              display: flex;
              gap: 5px;
              min-height: 20px;
            }

            .original-price-wrapper {
              margin: 0;
              display: flex;
              gap: 5px;
              min-height: 20px;
              max-height: 20px;
            }
            .original-price {
              font-size: 13.44px;
              font-weight: 500;
              text-decoration: line-through;
            }

            .sale-price {
              font-size: 21.12px;
              line-height: 21.12px;
              font-weight: 600;
              margin: 10px 0;
            }

            .discounted-sale-price {
              color: #00a365;
            }

            .discount {
              color: #00a365;
              font-size: 18px;
              line-height: 18px;
              font-weight: 700;
            }

            .icon-decrease{
             color:#00a365;
             font-size:18px;
            }

            .dummy-product-list-promo {
              width: 230px;
              height: 35px;
              padding-left: 7.5px;
            }

            .product-item-actions {
              margin-top: 20px;
              text-align: center;
              padding: 0 17px 17px;
            }

            .btn-item-add-to-cart {
              font-family: Poppins, "cursive";
              width: 100%;
              padding: 15px 20px;
              font-size: 13.44px;
              font-weight: 700;
              color: #f28e00;
              background-color: #fff7ec;
              border: none;
              border-radius: 37px;
            }

            @media (max-width: 1480px) {
              .carousel-item {
                flex: 0 0 calc((100% - 62px) / 4);
              }
              .ebebek-carousel {
                max-width: 1200px;
              }
            }
            @media (max-width: 1280px) {
              .carousel-item {
                flex: 0 0 calc((100% - 42px) / 3);
              }
              .ebebek-carousel {
                max-width: 970px;
              }
            }
             @media (max-width: 990px) {
              .carousel-item {
                flex: 0 0 calc((100% - 22px) / 2);
              }
              .ebebek-carousel {
                max-width: 730px;
              }
            }
               @media (max-width: 768px) {
              .carousel-item {
                flex: 0 0 calc((100% - 22px) / 2);
              }
              .ebebek-carousel {
               max-width: 550px;
              }
            }
             @media (max-width: 574px) {
              .carousel-item {
                flex: 0 0 calc((100% - 22px) / 2);
                min-width:0 !important
              }
              .ebebek-carousel {
               max-width: 100vw;
               
              }
               .carousel-btn{
               display:none}
            }

          </style>
        `;
        $(document.head).append(css);
      };
      const addProductBadges = (dummyBadgeData, productId) => {
        const badgeData = dummyBadgeData.find(
          (data) => data.productId === productId
        );
        if (!badgeData) return "";
        return badgeData.badges.map((badge) => `<img src=${badge}>`).join("");
      };
      const setRatingStars = (dummyRatingData, productId) => {
        const ratingData = dummyRatingData.find(
          (data) => data.productId === productId
        );
        const rating = ratingData ? ratingData.rating : 0;
      
        let stars = ``;
        for (let i = 1; i <= 5; i++) {
          stars += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="17">
          <path fill=" ${
            i <= rating ? "rgba(254, 209, 0, 1)" : "#d7d7d7"
          }" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
        </svg>`;
        }
        if (ratingData) {
          stars += `(${ratingData.count})`;
        }
        return stars;
      };
      const ProductService = {

        API:"https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json",
        storageKey:"products",

        async fetch (){
          try{
            const response= await fetch(this.API)
            if(!response.ok){
              throw new Error("Error while fetching "+response.status)
            }
            const data= await  response.json()
            localStorage.setItem(this.storageKey,JSON.stringify(data))
          }catch(error){
            console.log("Catched error: "+error)
          }
        },
        async getOrFetch(){
          const products=this.getAll();
          console.log(products)
          if(products.length===0){
            return await this.fetch()
          }
        },
        getAll(){
          return JSON.parse(localStorage.getItem(this.storageKey))|| []
        }
      }
      const FavoriteService={
      storageKey:"favorites",
      getAll(){
          return JSON.parse(localStorage.getItem(this.storageKey)) || []
      },

      add(productId){
          const favorites=this.getAll()
          if(!favorites.includes(productId)) {
            favorites.push(productId) 
          localStorage.setItem(this.storageKey,JSON.stringify(favorites))
        }
      },

      remove(productId){
        const favorites=this.getAll()
        const updatedFavorites= favorites.filter(itemId=> itemId!==productId)
        localStorage.setItem(this.storageKey,JSON.stringify(updatedFavorites))
      },

      toggle(productId){
          this.isFavorite(productId)? this.remove(productId) : this.add(productId) 
      },

      isFavorite(productId){
        return this.getAll().includes(productId)
      }
      }
      const setEvents = () => {
        const $track = $(".carousel-track");
        const carouselItem=$(".carousel-item")
        const gapSize=  parseInt((window.getComputedStyle($(".carousel-track")[0]).getPropertyValue('gap')))||20

        const getItemsPerScreen = () => {
          const width = $(window).width();
          if (width >= 1480) return 5;
          if (width >= 1280) return 4;
          if (width >= 992) return 3;
          if (width >= 576) return 2;
          return 2;
        };

        let cardWidth = carouselItem.eq(0).outerWidth(true);
        let maxIndex = carouselItem.length - getItemsPerScreen();
        let currentIndex = 0;
        let nextPosition=0

        let isAnimating=false;
        const transitionDuration=200;

        $(".next-btn").click(() => {
          if (currentIndex >= maxIndex || isAnimating) return;
          isAnimating=true
          nextPosition=(++currentIndex)*(cardWidth + gapSize)
          $track.css("transform", `translateX(-${nextPosition}px)`);

          setTimeout(()=>{isAnimating=false;},transitionDuration)
        });

        $(".prev-btn").click(() => {
          if (currentIndex < 1 ||isAnimating) return;
          isAnimating=true;
          nextPosition=(--currentIndex)*(cardWidth + gapSize)
          $track.css("transform", `translateX(-${nextPosition}px)`);

          setTimeout(()=>{isAnimating=false},transitionDuration)
        });
        const debounce = (func, delay) => {
          let timer;
          return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
          };
        };
        $(window).on("resize", debounce(function () {
          nextPosition = 0;
          currentIndex = 0;
          $(".carousel-track").css(
            "transform",
            `translateX(${nextPosition}px)`
          );
          maxIndex = carouselItem.length - getItemsPerScreen();
          cardWidth = carouselItem.outerWidth(true);
        },250))
        $(".favorite-btn").click(function (event) {
          event.preventDefault();
          const id = Number( $(this).closest(".carousel-item").attr("data-id"))
          console.log(id)
          FavoriteService.toggle(id)
          $(this).closest(".favorite-btn-wrapper").toggleClass("favorited",FavoriteService.isFavorite(id))
        });
        $(".btn-item-add-to-cart").click(function (event) {
          event.preventDefault();
        });
      };
      init();
    })();
  };
  document.head.appendChild(jqueryScript);
})();