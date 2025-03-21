(() => {
  const url =
    "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";

  let currentIndex = 0;
  let currentPosition = 0;

  const init = () => {
    const products = getProducts();
    buildStructure();
    buildProductCards(products);
    buildCSS();

    setEvents();
  };

  const buildStructure = () => {
    const html = `
             <div class="ebebek-carousel">
                <h2 class="carousel-title">Sizin icin Sectiklerimiz</h2>
                <div class="carousel-container">
                    <button class="carousel-btn prev-btn">‹</button>
                    <div class="carousel-track-container">
                    <div class="carousel-track"></div>
                    </div>
                    <button class="carousel-btn next-btn">›</button>
                </div>
            </div>
        `;

    $(".container").append(html);
  };

  const buildProductCards = (products) => {
    //ad favorites local storage
    console.log(products);
    const track = $(".carousel-track");

    products.forEach((product) => {
      const card = `
              
                <a href="${product.url}" target="_blank" class="carousel-item">
                    <div class="product-item-img">
                      <div class=product-item-multiple-badges>
                      </div>
                      <div class="product-img">
                        <img src="${product.img}" alt="${product.name}" />
                      </div>
                    </div>
                    <div class="product-item-content">
                      <div class="product-item-title">
                        <b>${product.brand}</b>
                        <span>${product.name}</span>
                      </div>
                      <p>${product.price}</p>
                      <p>${product.original_price}</p>
                    </div>

                    <div class="dummy-product-list-promo">

                    </div>
                    <div class="favorite-btn">
                    
                    <img id="default" src="https://www.e-bebek.com/assets/svg/default-favorite.svg" alt="favorite" class="favorite-btn" />

                    </div>
                    <div class="product-item-actions">
                      <button type="submit" class="btn-item-add-to-cart">Sepete Ekle</button>
                    </div>
                </a>
            `;

      track.append(card);
    });

    $(".favorite-btn").hover(
      function () {
        $(this).attr(
          "src",
          "https://www.e-bebek.com/assets/svg/default-hover-favorite.svg"
        );
      },
      function () {
        $(this).attr(
          "src",
          "https://www.e-bebek.com/assets/svg/default-favorite.svg"
        );
      }
    );
  };

  const buildCSS = () => {
    const css = `
        <style>

          .ebebek-carousel {
            max-width: 1300px;
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
            font-size: 2rem;
            line-height: 1.11;
            color: #f28e00;
          }

          .carousel-container {
            position: relative;
            margin-bottom: 2rem;
          }

          .carousel-track-container {
            overflow: hidden;
          }
          .carousel-track {
            display: flex;
            gap: 20px;
          }

          .carousel-item {
            flex: 0 0 calc((100% - 80px) / 5);
            border: 1px solid #eee;
            border-radius: 10px;
            font-family: Poppins, "cursive";
            color: #7d7d7d;
            font-size: 12px;
            padding: 5px;
            margin: 0 0 20px 0px;
            position: relative;
            box-sizing: border-box;
            text-decoration: none;
          }

          .carousel-item:hover {
            box-shadow: 0 0 10px 0 #00000024;
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

          #default {
            width: 60%;
            height: 60%;
            adding: 10px;
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

          .product-item-content{
          padding: 0 17px 17px
          }
          product-item-title{
            margin-bottom: 10px;
            font-size: 1.2rem;
          }

          .dummy-product-list-promo{
            width: 230px;
            height: 70px;
            padding-left: 7.5px;
          }

          .product-item-actions {
            margin-top:20px;
            text-align: center;
            padding: 0 17px 17px;
            
          }

          .btn-item-add-to-cart {
            width: 100%;
            padding: 15px 20px;
            font-size: 0.9rem;
            font-weight: 700;
            color: #f28e00;
            background-color: #fff7ec;
            border: none;
            border-radius: 37px;
          }

          .carousel-item {
            flex: 0 0 calc((100% - 80px) / 5); /* Default 5 item */
          }

          /* 1480px altı için 4 item */
          @media (max-width: 1480px) {
            .carousel-item {
              flex: 0 0 calc((100% - 60px) / 4); /* 20px*3 gap = 60px */
            }
          }

          /* 1280px altı için 3 item */
          @media (max-width: 1280px) {
            .carousel-item {
              flex: 0 0 calc((100% - 40px) / 3); /* 20px*2 gap = 40px */
            }
          }

          /* 992px altı için 2 item */
          @media (max-width: 992px) {
            .carousel-item {
              flex: 0 0 calc((100% - 20px) / 2); /* 20px*1 gap = 20px */
            }
          }


            </style>
        `;

    $("head").append(css);
  };

  //TODO : button padding
  //TODO : favorite button
  //TODO : prev next button on resize
  //TODO : sepete ekle tam boyutu ayarla
  //TODO : butonlarda kendiliginden ok var , arka plan rengini ikisinide ayri ayri uygulamak zorunda kaldim

  const fetchProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();

    localStorage.setItem("products", JSON.stringify(data));
    return data;
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
    console.log($(window).width());

    console.log(getItemsPerScreen());
    const items = $(".carousel-item").outerWidth(true);
    console.log(items);
    let maxIndex = $(".carousel-item").length - getItemsPerScreen();

    $(".next-btn").click(() => {
      console.log("max index: " + maxIndex);
      if (currentIndex >= maxIndex) return;
      currentPosition -= items + 20;
      track.css("transform", `translateX(${currentPosition}px)`);
      currentPosition++;
      currentIndex++;
    });

    $(".prev-btn").click(() => {
      if (currentIndex <= 0) return;
      currentPosition += items + 20;
      track.css("transform", `translateX(${currentPosition}px)`);
      currentPosition--;
      currentIndex--;
    });

    $(window).on("resize", function () {
      currentPosition = 0;
      currentIndex = 0;
      $(".carousel-track").css("transform", `translateX(${currentPosition}px)`);
      maxIndex = $(".carousel-item").length - getItemsPerScreen();
    });
  };

  const getProducts = () => {
    const products = JSON.parse(localStorage.getItem("products"));
    if (products === null) {
      fetchProducts();
    }
    return products;
  };

  init();
})();
