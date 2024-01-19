document.addEventListener("DOMContentLoaded", function () {
  // Get the product details container and carousel elements

  const mainSelectorEl = document.querySelector(".main");

  const productDetailsContainerEl = document.querySelector(
    ".product-details-container"
  );
  const productCorouselEl = document.querySelector(".splide__list");

  // Function to create and append product details
  function createAndAppendProduct(product, initialization) {
    if (initialization === 1) {
      mainSelectorEl.style.background = product.backgroundColor;
      const headingEl = document.createElement("h1");
      headingEl.textContent = product.heading;
      headingEl.classList.add("heading");
      productDetailsContainerEl.appendChild(headingEl);

      const captionEl = document.createElement("h3");
      captionEl.textContent = product.spanText;
      captionEl.classList.add("caption");
      productDetailsContainerEl.appendChild(captionEl);

      const chooseusEl = document.createElement("span");
      chooseusEl.textContent = "Choose us";
      chooseusEl.classList.add("chooseus");
      captionEl.appendChild(chooseusEl);

      const descriptionEl = document.createElement("p");
      descriptionEl.textContent = product.description;
      descriptionEl.classList.add("description");
      productDetailsContainerEl.appendChild(descriptionEl);

      const priceEl = document.createElement("p");
      priceEl.textContent = product.price;
      priceEl.classList.add("price");
      productDetailsContainerEl.appendChild(priceEl);
    }

    const corouselItemEl = document.createElement("li");
    corouselItemEl.classList.add("splide__slide");

    productCorouselEl.appendChild(corouselItemEl);

    const pictureEl = document.createElement("picture");
    corouselItemEl.appendChild(pictureEl);

    const imgEl = document.createElement("img");
    imgEl.classList.add("product-img");
    imgEl.src = product.productImg;
    pictureEl.appendChild(imgEl);
  }

  // Function to update product details based on the active slide
  function updateProductDetails(activeSlide) {
    // Clear existing product details
    productDetailsContainerEl.innerHTML = "";

    // Get the product associated with the active slide
    const activeProduct = products[activeSlide];

    // Display the details of the active product
    createAndAppendProduct(activeProduct, 1);
  }

  // Function to display products in the carousel
  function displayProducts(products) {
    let initialization = 1;
    for (let product of products) {
      createAndAppendProduct(product, initialization);
      initialization += 1;
    }

    // Initialize Splide carousel
    var splide = new Splide(".splide", {
      perPage: 1,
      pagination: false,
      focus: "center",
      omitEnd: true,
    });

    // Listen for the "moved" event to update product details
    splide.on("moved", function (newIndex) {
      updateProductDetails(newIndex);
    });

    splide.mount();
  }

  // Fetch product list and display them
  function fetchProductList() {
    fetch("/watches.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Store products globally to access them later
        products = data.watches;

        // Display products in the carousel
        displayProducts(products);
      });
  }

  // Fetch and display the product list
  fetchProductList();
});
