$(document).ready(function () {
    $('#show-register').click(function () {
        $('#login-section').hide();
        $('#register-section').show();
        $('#show-register').hide();
        $('#show-login').show();
    });

    $('#show-login').click(function () {
        $('#register-section').hide();
        $('#login-section').show();
        $('#show-login').hide();
        $('#show-register').show();
    });

    // Register form submission
    $('#register-form').submit(function (event) {
        event.preventDefault();

        const email = $('#register-email').val();
        const password = $('#register-password').val();
        const confirmPassword = $('#confirm-password').val();

        if (password !== confirmPassword) {
            $('#register-message').text('Passwords do not match.').css('color', 'red');
            return;
        }

        $.ajax({
            url: 'http://127.0.0.1:8000/api/register',
            method: 'POST',
            data: {
                email: email,
                password: password,
            },
            success: function (response) {
                $('#register-message').text('Registration successful! Please log in.').css('color', 'green');
                $('#register-form')[0].reset();
                $('#show-login').click();  // Automatically switch to login form after registration
            },
            error: function () {
                $('#register-message').text('Registration failed. Please try again.').css('color', 'red');
            }
        });
    });
    function showMainPage() {
        $('#login-section').hide();
        $('#product-list').show();
        $('#view-cart').show();
        $('#logout-btn').show();
        loadProducts();
    }

    const token = localStorage.getItem('token');
    if (token) {
        showMainPage();
    } else {
        $('#login-section').show();
        $('#product-list').hide();
        $('#logout-btn').hide();
        $('#cart').hide();
        $('#view-cart').hide();
    }
    $('#login-form').submit(function (event) {
        event.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();

        $.ajax({
            url: 'http://127.0.0.1:8000/api/login',
            method: 'POST',
            data: {
                email: email,
                password: password,
            },
            success: function (response) {
                localStorage.setItem('token', response.token);
                $('#login-message').text('Login successful!').css('color', 'green');
                showMainPage();
                loadProducts();
            },
            error: function () {
                $('#login-message').text('Login failed. Please try again.').css('color', 'red');
            }
        });
    });

    $('#logout-btn').click(function () {
        localStorage.removeItem('token');

        $('#login-section').show();
        $('#product-list').hide();
        $('#view-cart').hide();
        $('#cart').hide();
        $('#logout-btn').hide();
    });

    function loadProducts() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/products',
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            success: function (response) {
                let productsHtml = '';
                response.products.forEach(product => {
                    productsHtml += `
                        <tr>
                            <td>${product.name}</td>
                            <td>$${product.price}</td>
                            <td>
                                <button class="add-to-cart" data-id="${product.id}" data-price="${product.price}">Add to Cart</button>
                            </td>
                        </tr>
                    `;
                });
                $('#products').html(productsHtml);
            },
            error: function () {
                alert('Failed to load products.');
            }
        });
    }

    $(document).on('click', '.add-to-cart', function () {
        const productId = $(this).data('id');

        $.ajax({
            url: 'http://127.0.0.1:8000/api/cart',
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                product_id: productId,
            },
            success: function () {
                alert('Product added to cart.');
            },
            error: function (e) {
                console.log(e);
                alert('Failed to add product to cart.');
            }
        });
    });

    $('#view-cart').click(function () {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/cart',
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            success: function (response) {
                console.log(response);
                let cartItemsHtml = '';
                let total = 0;

                response.products.forEach(item => {
                    const subtotal = item.pivot.quantity * item.price;
                    total += subtotal;
                    cartItemsHtml += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.pivot.quantity}</td>
                            <td>$${item.price}</td>
                            <td>$${total.toFixed(2)}</td>
                        </tr>
                    `;
                });

                $('#cart-items tbody').html(cartItemsHtml);
                $('#cart-total').text('$' + total.toFixed(2));
                $('#cart').show();
            },
            error: function () {
                alert('Failed to load cart.');
            }
        });
    });
});