(function loadjQuery() {
  const jqueryScript = document.createElement("script");
  jqueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
  jqueryScript.integrity =
    "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=";
  jqueryScript.crossOrigin = "anonymous";

  jqueryScript.onload = () => {
    (() => {
      const url =
        "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";

      let currentIndex = 0;
      let currentPosition = 0;

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
          await getProducts();
          const products = JSON.parse(localStorage.getItem("products"));
          buildStructure();
          buildProductCards(products);
          buildCSS();
          setEvents();
        } else {
          console.error("This script only works on homepage");
        }
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
      };

      const buildProductCards = (products) => {
        const track = $(".carousel-track");

        products.forEach((product) => {
          const discount = Math.floor(
            ((product.original_price - product.price) /
              product.original_price) *
              100
          );
          const card = `
                <a href="${product.url}" target="_blank" class="carousel-item">
                    <div class="product-item-img">
                      <div class=product-item-multiple-badges>
                       ${addProductBadges(dummyBadgeData, product.id)}
                      </div>
                      <div class="product-img">
                        <img src="${product.img}" alt="${product.name}" />
                      </div>
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
                    <div class="favorite-btn">
                      <svg class="favorite-btn-empty ${
                        isFavorite(product.id - 1) ? "favorited-item" : ""
                      }" xmlns="http://www.w3.org/2000/svg" width="26" height="23" viewBox="0 0 26 23" fill="none"><g id="Group 3"><g id="heart"><path id="Shape" fill-rule="evenodd" clip-rule="evenodd" d="M22.6339 2.97449C21.4902 1.83033 19.9388 1.1875 18.3211 1.1875C16.7034 1.1875 15.152 1.83033 14.0084 2.97449L12.8332 4.14968L11.658 2.97449C9.27612 0.592628 5.41435 0.592627 3.03249 2.97449C0.650628 5.35635 0.650628 9.21811 3.03249 11.6L4.20769 12.7752L12.8332 21.4007L21.4587 12.7752L22.6339 11.6C23.778 10.4564 24.4208 8.90494 24.4208 7.28723C24.4208 5.66952 23.778 4.11811 22.6339 2.97449Z" stroke="#FF8A00" stroke-width="2.17391" stroke-linecap="round" stroke-linejoin="round"/></g></g></svg>
                      <img src="https://www.e-bebek.com/assets/svg/default-hover-favorite.svg" alt="favorite" class="favorite-btn-hover" />
                    </div>
                    <div class="product-item-actions">
                      <button type="submit" class="btn-item-add-to-cart">Sepete Ekle</button>
                    </div>
                </a>
            `;

          track.append(card);
        });
      };

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

            .carousel-track-container {
              overflow: hidden;
            }
            .carousel-track {
              display: flex;
              gap: 20px;
              transition: transform 0.25s ease-in-out;

              border-radius: 10px;
            }

            .carousel-item {

              border: 1px solid #eee;
              border-radius: 10px;
              font-family: Poppins, "cursive";
              color: #7d7d7d;
              font-size: 12px;
              padding: 2.5px;
              margin: 16px 0 22px 3px;
              position: relative;
              box-sizing: border-box;
              text-decoration: none;
            }

            .carousel-item:hover {
              box-shadow: 0 0 0 0 #00000030, inset 0 0 0 3px #f28e00;
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

            .favorite-btn {
              position: absolute;
              cursor: pointer;
              background-color: #fff;
              border-radius: 50%;
              box-shadow: 0 2px 4px 0 #00000024;
              width: 50px;
              height: 50px;
              right: 15px;
              top: 10px;
            }

            .favorite-btn-empty {
              width: 25px;
              height: 25px;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              position: absolute;
            }

            .favorited-item {
              fill: #ff8a00;
            }

            .favorite-btn-hover {
              display: none;
              width: 50px;
              height: 50px;
            }

            .favorite-btn:not(:has(.favorited-item)):hover .favorite-btn-empty {
              display: none;
            }

            .favorite-btn:not(:has(.favorited-item)):hover .favorite-btn-hover {
              display: block;
            }
              .btn-item-add-to-cart{
                cursor:pointer;
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
                flex: 0 0 calc((100% - 70px) / 4);
              }
              .ebebek-carousel {
                max-width: 1100px;
              }
            }

            @media (max-width: 1280px) {
              .carousel-item {
                flex: 0 0 calc((100% - 40px) / 3);
              }
              .ebebek-carousel {
                max-width: 900px;
              }
            }

            @media (max-width: 1049px) {
              .carousel-item {
                flex: 0 0 calc((100% - 20px) / 2);
              }
              .ebebek-carousel {
                max-width: 600px;
              }
            }
            @media (max-width: 576px) {
              .ebebek-carousel {
                max-width: 500px;
              }
            }

            @media (max-width: 400px) {
              .ebebek-carousel {
                max-width: 400px;
              }
            }

          </style>
        `;
        $("head").append(css);
      };

      const fetchProducts = async () => {
        const response = await fetch(url);
        const data = await response.json();
        localStorage.setItem("products", JSON.stringify(data));
        return data;
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
          stars += `  (${ratingData.count})`;
        }
        return stars;
      };

      const setEvents = () => {
        const track = $(".carousel-track");

        const getItemsPerScreen = () => {
          const width = $(window).width();
          if (width >= 1480) return 5;
          if (width >= 1280) return 4;
          if (width >= 992) return 3;
          if (width >= 576) return 2;
          return 2;
        };

        let items = $(".carousel-item").outerWidth(true);
        let maxIndex = $(".carousel-item").length - getItemsPerScreen();

        $(".next-btn").click(() => {
          if (currentIndex >= maxIndex) return;
          currentPosition -= items + 20;
          track.css("transform", `translateX(${currentPosition}px)`);

          currentIndex++;
        });

        $(".prev-btn").click(() => {
          if (currentIndex <= 0) return;
          currentPosition += items + 20;
          track.css("transform", `translateX(${currentPosition}px)`);

          currentIndex--;
        });

        $(window).on("resize", function () {
          currentPosition = 0;
          currentIndex = 0;
          $(".carousel-track").css(
            "transform",
            `translateX(${currentPosition}px)`
          );
          maxIndex = $(".carousel-item").length - getItemsPerScreen();
          items = $(".carousel-item").outerWidth(true);
        });

        $(".favorite-btn").click(function (event) {
          event.preventDefault();

          const id = $(this).closest(".carousel-item").index();

          if (isFavorite(id)) {
            removeFromFavorites(id);
            $(this).find(".favorite-btn-empty").removeClass("favorited-item");
          } else {
            addToFavorites(id);
            $(this).find(".favorite-btn-empty").addClass("favorited-item");
          }
        });

        $(".btn-item-add-to-cart").click(function (event) {
          event.preventDefault();
        });
      };

      const getProducts = async () => {
        const products = JSON.parse(localStorage.getItem("products"));
        if (!products) {
          await fetchProducts();
        }
        return products;
      };
      init();
    })();
  };
  document.head.appendChild(jqueryScript);
})();
