let selectedItems = [];

function addToCart(itemName, itemPrice) {
    selectedItems.push({ name: itemName, price: itemPrice });
    generateBill();
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Loaded');
    
    window.addEventListener('scroll', function() {
        var aboutSection = document.getElementById('about');
        var positionFromTop = aboutSection.getBoundingClientRect().top;
        var screenHeight = window.innerHeight;

        if (positionFromTop - screenHeight <= 0) {
            aboutSection.classList.add('active');
            console.log('About section activated');
        }
    });
});
function generateBill() {
    const selectedItemsList = document.getElementById("selected-items");
    const totalBill = document.getElementById("total-bill");
    let totalCost = 0;

    selectedItemsList.innerHTML = ''; // Clear the previous selections

    for (const item of selectedItems) {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - ₹${item.price}`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", function() {
            removeItem(item.name);
        });
        listItem.appendChild(removeButton);
        selectedItemsList.appendChild(listItem);
        totalCost += item.price;
    }

    totalBill.textContent = `₹${totalCost}`;
}

function removeItem(itemName) {
    selectedItems = selectedItems.filter(item => item.name !== itemName);
    generateBill(); // Recalculate the bill after removing an item
}
