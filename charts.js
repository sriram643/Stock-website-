<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StockPay App UI</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts: Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Lucide Icons CDN for icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f4f7f6; /* Light background for the app */
            color: #333;
        }
        /* Custom scrollbar for chat */
        .chat-container::-webkit-scrollbar {
            width: 8px;
        }
        .chat-container::-webkit-scrollbar-track {
            background: #f0f0f0;
            border-radius: 10px;
        }
        .chat-container::-webkit-scrollbar-thumb {
            background: #cbd5e1; /* Tailwind gray-300 */
            border-radius: 10px;
        }
        .chat-container::-webkit-scrollbar-thumb:hover {
            background: #94a3b8; /* Tailwind gray-400 */
        }
        /* Generic button styling for consistency */
        .btn-primary {
            @apply bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out w-full;
        }
        .btn-secondary {
            @apply bg-white text-indigo-600 border border-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-50 transition duration-300 ease-in-out w-full;
        }
        .input-field {
            @apply w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500;
        }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-lg">

        <!-- Screen 1: Welcome Screen / Landing Page -->
        <section id="welcome-screen" class="text-center space-y-6">
            <div class="flex items-center justify-center mb-4">
                <!-- App Logo (Placeholder - could be SVG or Image) -->
                <div class="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-2">
                    $
                </div>
                <h1 class="text-4xl font-extrabold text-gray-900">StockPay</h1>
            </div>
            <p class="mt-2 text-xl text-gray-600">Fantasy investing meets real trading.</p>
            <div class="space-y-4 pt-6">
                <button class="btn-primary" onclick="alert('Login functionality not implemented in UI demo.')">Login</button>
                <button class="btn-secondary" onclick="alert('Register functionality not implemented in UI demo.')">Register</button>
                <button class="btn-secondary text-gray-700 border-gray-300 hover:bg-gray-50" onclick="alert('How It Works section not implemented in UI demo.')">How It Works</button>
            </div>
        </section>

        <hr class="my-8 border-t border-gray-200">

        <!-- Screen 2: Login & Registration -->
        <section id="auth-screen" class="space-y-6">
            <h2 class="text-3xl font-bold text-center text-gray-900">Login</h2>
            <form class="space-y-4">
                <div>
                    <label for="login-email" class="sr-only">Email address</label>
                    <input id="login-email" name="email" type="email" autocomplete="email" required class="input-field" placeholder="Email address">
                </div>
                <div>
                    <label for="login-password" class="sr-only">Password</label>
                    <input id="login-password" name="password" type="password" autocomplete="current-password" required class="input-field" placeholder="Password">
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500" onclick="alert('Forgot Password not implemented in UI demo.')">Forgot your password?</a>
                    </div>
                </div>
                <button type="submit" class="btn-primary" onclick="alert('Login functionality not implemented in UI demo.')">Sign in</button>
            </form>
            <div class="text-center">
                <p class="text-sm text-gray-600">Don't have an account? <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500" onclick="alert('Registration form displayed below.')">Register here</a></p>
            </div>

            <h2 class="text-3xl font-bold text-center text-gray-900 mt-10">Register</h2>
            <form class="space-y-4">
                <div>
                    <label for="register-name" class="sr-only">Full Name</label>
                    <input id="register-name" name="name" type="text" required class="input-field" placeholder="Full Name">
                </div>
                <div>
                    <label for="register-email" class="sr-only">Email address</label>
                    <input id="register-email" name="email" type="email" autocomplete="email" required class="input-field" placeholder="Email address">
                </div>
                <div>
                    <label for="register-password" class="sr-only">Password</label>
                    <input id="register-password" name="password" type="password" required class="input-field" placeholder="Password">
                </div>
                <div>
                    <label for="register-referral" class="sr-only">Referral Code (Optional)</label>
                    <input id="register-referral" name="referral" type="text" class="input-field" placeholder="Referral Code (Optional)">
                </div>
                <button type="submit" class="btn-primary" onclick="alert('Registration functionality not implemented in UI demo.')">Register Account</button>
            </form>
        </section>

        <hr class="my-8 border-t border-gray-200">

        <!-- Screen 3: Fantasy Game Dashboard -->
        <section id="fantasy-dashboard" class="space-y-6">
            <h2 class="text-3xl font-bold text-center text-gray-900">Fantasy Contest</h2>

            <div class="bg-indigo-50 border border-indigo-200 p-4 rounded-lg text-center shadow-sm">
                <p class="text-lg font-medium text-indigo-800">Today’s Contest Closes In:</p>
                <p class="text-3xl font-bold text-indigo-900 mt-1">1:23:10</p>
            </div>

            <button class="btn-primary">Join Contest</button>

            <div class="space-y-4">
                <h3 class="text-xl font-semibold text-gray-800">Your Picks:</h3>
                <div class="bg-white p-4 rounded-lg shadow space-y-3">
                    <!-- Stock 1 -->
                    <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <div>
                            <p class="font-medium text-gray-900">Reliance Industries</p>
                            <p class="text-sm text-gray-500">RIL</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-green-600 font-semibold">+2.55%</span>
                            <button class="text-gray-500 hover:text-gray-700" onclick="alert('Edit stock not implemented.')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit-3"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                            </button>
                        </div>
                    </div>
                    <!-- Stock 2 -->
                    <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <div>
                            <p class="font-medium text-gray-900">Tata Motors</p>
                            <p class="text-sm text-gray-500">TATAMOTORS</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-red-600 font-semibold">-1.20%</span>
                            <button class="text-gray-500 hover:text-gray-700" onclick="alert('Edit stock not implemented.')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit-3"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                            </button>
                        </div>
                    </div>
                    <!-- Stock 3 -->
                    <div class="flex items-center justify-between py-2 last:border-b-0">
                        <div>
                            <p class="font-medium text-gray-900">HDFC Bank</p>
                            <p class="text-sm text-gray-500">HDFCBANK</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-green-600 font-semibold">+0.80%</span>
                            <button class="text-gray-500 hover:text-gray-700" onclick="alert('Edit stock not implemented.')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit-3"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <p class="text-sm text-gray-500 text-center">You can edit your picks until the contest cutoff time.</p>
            </div>
        </section>

        <hr class="my-8 border-t border-gray-200">

        <!-- Screen 4: Real Trading Panel (Angel One Integrated) -->
        <section id="real-trading-panel" class="space-y-6">
            <h2 class="text-3xl font-bold text-center text-gray-900">Real Trading</h2>

            <button class="btn-primary bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2" onclick="alert('Angel One login not implemented.')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L9.5 9.5"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07L14.5 14.5"/></svg>
                <span>Login with Angel One</span>
            </button>

            <div class="space-y-4">
                <h3 class="text-xl font-semibold text-gray-800">Your Holdings:</h3>
                <div class="bg-white p-4 rounded-lg shadow">
                    <ul class="divide-y divide-gray-100">
                        <li class="py-3 flex justify-between items-center">
                            <div>
                                <p class="font-medium text-gray-900">INFY <span class="text-sm text-gray-500 ml-1">x10</span></p>
                                <p class="text-xs text-gray-500">Avg: ₹1500 | LTP: ₹1520</p>
                            </div>
                            <span class="text-green-600 font-semibold">+₹200 (1.33%)</span>
                        </li>
                        <li class="py-3 flex justify-between items-center">
                            <div>
                                <p class="font-medium text-gray-900">TCS <span class="text-sm text-gray-500 ml-1">x5</span></p>
                                <p class="text-xs text-gray-500">Avg: ₹3800 | LTP: ₹3750</p>
                            </div>
                            <span class="text-red-600 font-semibold">-₹250 (-1.32%)</span>
                        </li>
                    </ul>
                    <p class="mt-4 text-lg font-bold text-gray-900">Total PnL: <span class="text-red-600">-₹50</span></p>
                </div>
            </div>

            <div class="space-y-4">
                <h3 class="text-xl font-semibold text-gray-800">Open Orders:</h3>
                <div class="bg-white p-4 rounded-lg shadow">
                    <ul class="divide-y divide-gray-100">
                        <li class="py-3 flex justify-between items-center">
                            <div>
                                <p class="font-medium text-gray-900">SBIN <span class="text-sm text-gray-500 ml-1">Buy x20</span></p>
                                <p class="text-xs text-gray-500">Type: Limit | Price: ₹550</p>
                            </div>
                            <span class="text-yellow-600 font-semibold">Pending</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="space-y-4">
                <h3 class="text-xl font-semibold text-gray-800">Buy/Sell Panel:</h3>
                <div class="bg-white p-4 rounded-lg shadow space-y-4">
                    <div>
                        <label for="stock-symbol" class="block text-sm font-medium text-gray-700 mb-1">Stock Symbol</label>
                        <input type="text" id="stock-symbol" class="input-field" placeholder="e.g., RELIANCE">
                    </div>
                    <div>
                        <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <input type="number" id="quantity" class="input-field" value="1">
                    </div>
                    <div>
                        <label for="order-type" class="block text-sm font-medium text-gray-700 mb-1">Order Type</label>
                        <select id="order-type" class="input-field">
                            <option>Market</option>
                            <option>Limit</option>
                        </select>
                    </div>
                    <div class="flex space-x-4">
                        <button class="btn-primary bg-green-600 hover:bg-green-700" onclick="alert('Buy order functionality not implemented.')">Buy</button>
                        <button class="btn-primary bg-red-600 hover:bg-red-700" onclick="alert('Sell order functionality not implemented.')">Sell</button>
                    </div>
                </div>
            </div>

            <div class="space-y-4">
                <h3 class="text-xl font-semibold text-gray-800">Stock Info/Chart:</h3>
                <div class="bg-white p-4 rounded-lg shadow h-48 flex items-center justify-center text-gray-400">
                    <p>Simple Chart / Stock Info Placeholder</p>
                </div>
            </div>
        </section>

        <hr class="my-8 border-t border-gray-200">

        <!-- Screen 5: Leaderboard (Fantasy) -->
        <section id="leaderboard" class="space-y-6">
            <h2 class="text-3xl font-bold text-center text-gray-900">Fantasy Leaderboard</h2>

            <div class="flex justify-around bg-gray-100 p-2 rounded-lg shadow-sm">
                <button class="px-4 py-2 rounded-md font-medium text-indigo-600 bg-white shadow" onclick="alert('Daily Leaderboard selected.')">Daily</button>
                <button class="px-4 py-2 rounded-md font-medium text-gray-600 hover:bg-gray-200" onclick="alert('Weekly Leaderboard selected.')">Weekly</button>
                <button class="px-4 py-2 rounded-md font-medium text-gray-600 hover:bg-gray-200" onclick="alert('All-Time Leaderboard selected.')">All-Time</button>
            </div>

            <div class="bg-indigo-50 border border-indigo-200 p-4 rounded-lg text-center shadow-sm">
                <p class="text-lg font-medium text-indigo-800">Your Rank:</p>
                <p class="text-4xl font-bold text-indigo-900 mt-1">#7</p>
                <p class="text-sm text-gray-700 mt-1">Portfolio: <span class="text-green-600 font-semibold">+15.2%</span></p>
            </div>

            <div class="space-y-4">
                <h3 class="text-xl font-semibold text-gray-800">Top Performers:</h3>
                <div class="bg-white p-4 rounded-lg shadow">
                    <ul class="divide-y divide-gray-100">
                        <li class="py-3 flex justify-between items-center">
                            <span class="font-bold text-lg text-gray-900">#1. John Doe</span>
                            <span class="text-green-600 font-semibold">+22.5%</span>
                        </li>
                        <li class="py-3 flex justify-between items-center">
                            <span class="font-bold text-lg text-gray-900">#2. Jane Smith</span>
                            <span class="text-green-600 font-semibold">+18.9%</span>
                        </li>
                        <li class="py-3 flex justify-between items-center">
                            <span class="font-bold text-lg text-gray-900">#3. StockGuru</span>
                            <span class="text-green-600 font-semibold">+17.1%</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <hr class="my-8 border-t border-gray-200">

        <!-- Screen 6: Wallet & Payments -->
        <section id="wallet-payments" class="space-y-6">
            <h2 class="text-3xl font-bold text-center text-gray-900">Wallet</h2>

            <div class="bg-indigo-50 border border-indigo-200 p-4 rounded-lg text-center shadow-sm">
                <p class="text-lg font-medium text-indigo-800">Current Balance:</p>
                <p class="text-4xl font-bold text-indigo-900 mt-1">₹5,000.00</p>
            </div>

            <div class="flex space-x-4">
                <button class="btn-primary bg-green-600 hover:bg-green-700" onclick="alert('Add Funds functionality not implemented.')">
                    <div class="flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                        <span>Add Funds</span>
                    </div>
                </button>
                <button class="btn-primary bg-red-600 hover:bg-red-700" onclick="alert('Withdraw functionality not implemented.')">
                    <div class="flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>
                        <span>Withdraw</span>
                    </div>
                </button>
            </div>

            <div class="space-y-4">
                <h3 class="text-xl font-semibold text-gray-800">Transaction History:</h3>
                <div class="bg-white p-4 rounded-lg shadow">
                    <ul class="divide-y divide-gray-100">
                        <li class="py-3 flex justify-between items-center">
                            <div>
                                <p class="font-medium text-gray-900">Deposit</p
