var app = angular.module('vendorApp', []);

app.controller('VendorController', ['$scope', '$timeout', 'CartService', function($scope, $timeout, CartService) {
    $scope.menuItems = [
        {name: 'Idly Rice', price: 118, img: 'https://m.media-amazon.com/images/I/51r3g+IPiWS.jpg'},
        {name: 'Brown Rice', price: 127, img: 'https://images.slurrp.com/prodrich_article/x7o2wcdeq6o.webp?impolicy=slurrp-20210601&width=880&height=500'},
        {name: 'Kichedi Samba Rice', price: 145, img: 'https://biobasics.org/cdn/shop/files/shop-organic-kichili-samba-rice-online-at-bio-basics_2048x.png?v=1695453940'},
        {name: 'Bamboo Rice', price: 626, img: 'https://m.media-amazon.com/images/I/51iNLWFp6BL._AC_UF894,1000_QL80_.jpg'},
        {name: 'Karunkuruvai Rice', price: 147, img: 'https://5.imimg.com/data5/SELLER/Default/2022/9/RO/PX/JH/30153532/karunkuruvai-rice.jpg'},
        {name: 'Matta rice', price: 127, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLj4RibyzC1HN7edr595gLUMH1kayaibFQxw&s'}
    ];

    $scope.vendors = [
        {name: 'MuthuKumar', location: 'City, Country', rating: 4.5, img: 'https://agronicfood.com/wp-content/uploads/2020/02/0-4.png'},
        {name: 'Ananthi', location: 'City, Country', rating: 4.2, img: 'https://give.do/blog/wp-content/uploads/2019/10/10-NGOs-empowering-Indian-farmers-to-grow-and-sustain.jpg'},
        {name: 'Azeeb', location: 'City, Country', rating: 4.7, img: 'https://t3.ftcdn.net/jpg/04/32/15/18/360_F_432151892_oQ3YQDo2LYZPILlEMnlo55PjjgiUwnQb.jpg'},
        {name: 'Premkumar', location: 'City, Country', rating: 4.8, img: 'https://thetechpanda.com/wp-content/uploads/2021/01/farmer-5353774_1280.jpg'},
        {name: 'Tahammul', location: 'City, Country', rating: 4.3, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5H7MVFUVt5vzsxCeNtMgI0xWhAplVhbE2nfCQ9GaA7umy-ido3AdigaARV--ScwLlz04&usqp=CAU'},
        {name: 'Maari', location: 'City, Country', rating: 4.3, img: 'https://t4.ftcdn.net/jpg/04/92/74/99/360_F_492749948_q8HmVGnFX7O9wwNcwZzHAxT9xmovww4G.jpg'}
    ];

    $scope.sortBy = 'rating'; 
    $scope.search = '';
    $scope.cart = CartService.getCart();
    $scope.sort = 'name';

    $scope.addToCart = function(item) {
        CartService.addToCart(item);
    };

    $scope.totalBill = function() {
        return CartService.totalBill();
    };

    function formatTime(ms) {
        var seconds = Math.floor((ms / 1000) % 60);
        var minutes = Math.floor((ms / (1000 * 60)) % 60);
        var hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
       

        return  hours + "h " + minutes + "m " + seconds + "s ";
    }

    function updateCountdown() {
        var endTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now

        function countdown() {
            var now = new Date().getTime();
            var distance = endTime - now;

            if (distance < 0) {
                $scope.countdown = "EXPIRED";
            } else {
                $scope.countdown = formatTime(distance);
                $timeout(countdown, 1000); // Update every second
            }
        }

        countdown();
    }

    // Initialize countdown
    updateCountdown();
}]);

app.filter('startsWith', function() {
    return function(items, searchText) {
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(function(item) {
            return item.name.toLowerCase().startsWith(searchText);
        });
    };
});

app.service('CartService', function() {
    var cart = [];

    this.addToCart = function(item) {
        cart.push(item);
    };

    this.getCart = function() {
        return cart;
    };

    this.totalBill = function() {
        return cart.reduce(function(total, item) {
            return total + item.price;
        }, 0);
    };
});
app.controller('ContactController', ['$scope', function($scope) {
    console.log("contact controller")
    // Expose $scope to the global window object for debugging
    window.debugScope = $scope;

    $scope.contact = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    $scope.submitForm = function() {
        console.log('Form submitted:');
        console.log('Name:', $scope.contact.name);
        console.log('Email:', $scope.contact.email);
        console.log('Subject:', $scope.contact.subject);
        console.log('Message:', $scope.contact.message);
    };
}]);