const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json';

const fetchData = async () => {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
};

const populateProductDetails = (productData) => {

    const productTitle = document.getElementById('product-title');
    productTitle.innerText = productData.title;

    const productVendor = document.getElementById('product-vendor');
    productVendor.innerText = productData.vendor;

    const description = document.getElementById('description');
    description.innerHTML = productData.description;

    const price = document.getElementById('price');
    price.innerText = productData.price;

    const comparePrice = document.getElementById('compare-to-price');
    comparePrice.innerText = productData.compare_at_price;

    const imageUrls = [
        "https://s3-alpha-sig.figma.com/img/d636/7d6d/f34ce14e7187edeeb026d73413e4a29c?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Nejz5M5nvkC~ufQ6L~VnA1ATv-nDdbhOpUONmrNOKs053lqTtnY58s-zNJuJEMI4Vf3qUdsjgrpGY7h6z516wfe~uP-y5IH6uA8w5YatUGJ8WcNC~34AJGTYXtAJhg65xAksMNcjOqHoa333mqgjUZkioDqHMyENuIQ-BCaQ0lmrQfN-tEf~JgOT0LBvMfEIsD6SmDuqBC9a6TfarxaPINCJBva65uwUy1jDI4vazV-oteyKhx4ZqUMsgZxWXUdwEd4M5AE8fs0649bWpgKgasM~GiPDr6Ws3sxJzQo3JoXX0546yXxve49shSedcSxulVrJKl~tfkoLZddSOu2LYw__",
        "https://s3-alpha-sig.figma.com/img/7f07/20f0/38539658df252c621f52c64231e8986a?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IkYANVwb0N6zY3AwWqcq5lB84n2FDEm9hgUlSkqAykc6zFnKgTgDfvxHru3z2qC8gzmNxEsQPFUg43zqg4ZG2TURdpX6z1k7LcrcQtESCGmxI8aMf6b~RRjJ56b~JcOxnEJz2hCfqA~5SpgXSsvGIawgHehsAI8aLD1iNucIcAu7bvQ944UUbKlBV5tU50C4AH4aXUtBpq49h6V1q35oUUVwai39ZNWUBdDzuoYQF1jlLiXg3hPrWCgI-56lt00gQi1LIPbCAsZMuC2uQ5GKAPKJlJeKoAaZO-aEQ672wchWkNycBkidn9SRg9vWJ9olIv6BV6iX5U5kuBsE9eKmjw__",
        "https://s3-alpha-sig.figma.com/img/8a12/5fd1/8ad1df2ca3d3367baa54e79cf0caeff1?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jee39xSK-TesGDdB4ikB7AeAzHgVZEFSLCPmpsdWiDKF7tlLYIki12B8egIzHvHJFiDrlZ77yO6xeARgsawZtAhN3Dai82rxuDiqaFhuJqgB9qGnRKL~y7bKBGbmFbEnUQKoNp29mcaNh2HegzYJrqCCWaGrjD9HFou9fbFikeJeC1MifBEmFtlCpI~z0bqSKy45yEt7uAjCxGCorYJ~tNIOJ2ydgJ2qkXXLfWWfyye1Ukc1D1tEWSil8eicHE122yrDud89gKQ9VjwqNTx-3LlrY8LlrpT9GRUoB3yHbjN6PXD2AeqQ0NeTG5SvvMPV5fNbJJJmX31UN5Hmd178Bw__",
        "https://s3-alpha-sig.figma.com/img/2b85/4ec0/815f49c8ce3ddd231e2da63ce0596dc4?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aYg4oxHEv20diWN5kTt8pX0I6HqtzpJ9mhTSnw4Fk5vABxzbEWcuEMANZf6WYqs5CdBVuV~8TDeo7PTCANU1wq~79tHkkXTEREqNeWkI3n~C-33oQ9K5CBlk06xjxxGr1z0Vo6eeOvaEoSDU0v1SNM0SbadFyOBPRyGIkZ5IIdoJ-nMBNDH-3r6xo5u7JIhppuKPnYUwjtWdrfs2w7oghrK~PnL1tZcGZs7cD0RJNn8~YzdaCKdoLySRw0pu03wIiQTXLOnDUEWLiCCD2WAhGtIlVUKhMT~q8vEr2z1COlWERsX3DFWYbbGI9JWCtAmgPJW-2lDdAgboi5DrZMN5vA__"
    ];

    const mainImage = document.getElementById('main-image');
    mainImage.src = imageUrls[0];

    const imageTabsContainer = document.getElementById('image-tabs-container');

    imageUrls.forEach((imageUrl, index) => {
        const imageTab = document.createElement('img');
        imageTab.src = imageUrl;
        imageTab.classList.add('tab-images');
        imageTab.addEventListener('click', () => showImage(index));
        imageTabsContainer.appendChild(imageTab);
    });

    const colorForm = document.getElementById('color-form');
    productData.options[0].values.forEach((color, index) => {
        const colorName = Object.keys(color)[0];
        const colorHex = color[colorName];
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = colorHex;
        colorBox.addEventListener('click', () => selectColor(colorBox));
        colorBox.setAttribute('data-color-name', colorName);
        colorForm.appendChild(colorBox);
        if (colorName === "Blue") {
            colorBox.classList.add('selected');
            colorBox.innerHTML = '<img src="./assets/tick.svg" class="tick">';
        }
    });

    const sizeOptions = document.getElementsByClassName('size-options')[0].getElementsByTagName('input');
    for (let i = 0; i < sizeOptions.length; i++) {
        sizeOptions[i].addEventListener('change', function (event) {
            const selectedSize = event.target.value;
        });
    }
};

fetchData().then((data) => {
    if (data && data.product) {
        populateProductDetails(data.product);
    }
});

function showImage(imageIndex) {
    const tabImages = document.getElementsByClassName('tab-images');
    for (let i = 0; i < tabImages.length; i++) {
        tabImages[i].classList.remove('active');
    }

    const selectedTabImage = document.getElementsByClassName('tab-images')[imageIndex];
    selectedTabImage.classList.add('active');

    const mainImage = document.getElementById('main-image');
    const selectedImageUrl = selectedTabImage.src;
    mainImage.src = selectedImageUrl;
}

function selectColor(selectedColorBox) {
    const colorBoxes = document.getElementsByClassName('color-box');
    Array.from(colorBoxes).forEach((colorBox) => {
        colorBox.classList.remove('selected');
        colorBox.innerHTML = '';
    });
    selectedColorBox.classList.add('selected');
    selectedColorBox.innerHTML = '<img src="./assets/tick.svg" class="tick">';
}

function addToCart() {
    const colorBoxes = document.getElementsByClassName('color-box');
    let selectedColor;
    for (let i = 0; i < colorBoxes.length; i++) {
        if (colorBoxes[i].classList.contains('selected')) {
            selectedColor = colorBoxes[i];
            break;
        }
    }

    const sizeInputs = document.getElementsByClassName('size-options')[0].getElementsByTagName('input');
    let selectedSize;
    for (let i = 0; i < sizeInputs.length; i++) {
        if (sizeInputs[i].checked) {
            selectedSize = sizeInputs[i];
            break;
        }
    }

    if (selectedColor && selectedSize) {
        const colorName = selectedColor.getAttribute('data-color-name');
        console.log(colorName)
        const sizeValue = selectedSize.value;
        console.log(sizeValue)
        const notificationText = `Embrace Sideboard with Color ${colorName} and Size ${sizeValue} added to cart`;
        const fourth_row = document.getElementById('fourth-row');
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerText = notificationText;
        fourth_row.appendChild(notification); 
        setTimeout(() => {
            notification.remove();
        }, 10000);

    } else {
        alert('Please select color and size before adding to cart');
    }
}

const addToCartButton = document.getElementsByClassName('cart-button')[0];
addToCartButton.addEventListener('click', addToCart);
