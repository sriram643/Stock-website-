import React, { useState, useEffect } from 'react';
// Removed: import { createIcons, icons } from 'lucide'; // This caused the "Could not resolve" error

// Firebase imports - these will be available in the Canvas environment
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';

// Helper function to create Lucide icons dynamically from the global 'lucide' object
// This assumes lucide.js is loaded via a CDN script in the HTML.
const Icon = ({ name, size = 24, className = "" }) => {
    // Ensure the 'lucide' global object and its 'icons' property are available
    if (typeof lucide === 'undefined' || !lucide.icons || !lucide.icons[name]) {
        console.warn(`Lucide icon "${name}" not found or lucide global object not loaded.`);
        return null;
    }
    const svg = lucide.icons[name];
    if (!svg) return null; // Should not happen if lucide.icons[name] exists

    // Use createIcons to get the SVG string and dangerouslySetInnerHTML to render it
    return (
        <span className={className} dangerouslySetInnerHTML={{ __html: lucide.createIcons({ [name]: svg })[name] }} style={{ width: size, height: size }} />
    );
};


// Main App Component
const App = () => {
    const [currentScreen, setCurrentScreen] = useState('welcome'); // State to control which screen is visible
    const [firebaseApp, setFirebaseApp] = useState(null);
    const [auth, setAuth] = useState(null);
    const [db, setDb] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false); // To ensure Firestore operations wait for auth

    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

    // Firebase Initialization and Authentication Listener
    useEffect(() => {
        // Only initialize if not already initialized
        if (!firebaseApp && Object.keys(firebaseConfig).length > 0) {
            console.log("Initializing Firebase...");
            const app = initializeApp(firebaseConfig);
            const authInstance = getAuth(app);
            const dbInstance = getFirestore(app);

            setFirebaseApp(app);
            setAuth(authInstance);
            setDb(dbInstance);

            // Sign in with custom token if available, otherwise anonymously
            const signIn = async () => {
                try {
                    if (initialAuthToken) {
                        await signInWithCustomToken(authInstance, initialAuthToken);
                        console.log("Signed in with custom token.");
                    } else {
                        await signInAnonymously(authInstance);
                        console.log("Signed in anonymously.");
                    }
                } catch (error) {
                    console.error("Firebase Auth Error:", error);
                    // You might want to display a user-friendly error message here
                }
            };

            // Listen for auth state changes
            const unsubscribe = onAuthStateChanged(authInstance, (user) => {
                setCurrentUser(user);
                setIsAuthReady(true);
                console.log("Auth state changed. User:", user ? user.uid : "None");
            });

            signIn(); // Trigger sign-in
            return () => unsubscribe(); // Cleanup auth listener on unmount
        } else if (!firebaseApp) {
             console.log("Firebase config not available. Skipping Firebase init.");
             setIsAuthReady(true); // Treat as ready even without Firebase for UI demo
        }
    }, [firebaseApp, firebaseConfig, initialAuthToken]); // Only run once on component mount

    // Mock functions for backend interactions
    const handleLogin = async (email, password) => {
        console.log('Attempting login with:', email, password);
        // This is where you'd call your Angel One API or your custom backend
        // For Firebase Auth:
        if (auth) {
            try {
                // Example Firebase login:
                await signInWithEmailAndPassword(auth, email, password);
                console.log("User logged in successfully!");
                setCurrentScreen('fantasy-dashboard'); // Navigate on success
            } catch (error) {
                console.error("Login failed:", error.message);
                // Display error message to user
            }
        } else {
            console.log("Firebase Auth not initialized. Simulating success.");
            setCurrentScreen('fantasy-dashboard');
        }
    };

    const handleRegister = async (name, email, password, referralCode) => {
        console.log('Attempting registration for:', name, email, referralCode);
        // This is where you'd call your backend registration API
        // For Firebase Auth:
        if (auth) {
            try {
                // Example Firebase registration:
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User registered successfully:", userCredential.user.uid);
                // Optionally save user name and referral code to Firestore
                if (db) {
                    const userDocRef = doc(db, `artifacts/${appId}/users/${userCredential.user.uid}/profile/details`);
                    await setDoc(userDocRef, { name, email, referralCode, createdAt: new Date() });
                    console.log("User profile saved to Firestore.");
                }
                setCurrentScreen('fantasy-dashboard'); // Navigate on success
            } catch (error) {
                console.error("Registration failed:", error.message);
                // Display error message to user
            }
        } else {
            console.log("Firebase Auth not initialized. Simulating success.");
            setCurrentScreen('fantasy-dashboard');
        }
    };

    const handleLogout = async () => {
        if (auth) {
            try {
                await signOut(auth);
                console.log("User logged out.");
                setCurrentScreen('welcome');
            } catch (error) {
                console.error("Logout failed:", error.message);
            }
        } else {
            setCurrentScreen('welcome');
        }
    };


    const renderScreen = () => {
        switch (currentScreen) {
            case 'welcome':
                return <WelcomeScreen setCurrentScreen={setCurrentScreen} />;
            case 'login':
            case 'register':
                return <AuthScreen setCurrentScreen={setCurrentScreen} handleLogin={handleLogin} handleRegister={handleRegister} mode={currentScreen} />;
            case 'fantasy-dashboard':
                return <FantasyDashboard />;
            case 'real-trading':
                return <RealTradingPanel />;
            case 'leaderboard':
                return <Leaderboard />;
            case 'wallet-payments':
                return <WalletPayments />;
            case 'stock-detail':
                return <StockDetailPage />;
            case 'ai-assistant':
                return <AIAssistant />;
            case 'admin-panel':
                return <AdminPanel />;
            default:
                return <WelcomeScreen setCurrentScreen={setCurrentScreen} />;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-lg">
                {/* Global Navigation - for demo purposes, a simple top bar */}
                <nav className="flex justify-around bg-indigo-600 text-white p-3 rounded-lg shadow-md mb-8">
                    <button onClick={() => setCurrentScreen('fantasy-dashboard')} className="p-2 rounded-md hover:bg-indigo-700 text-sm">Fantasy</button>
                    <button onClick={() => setCurrentScreen('real-trading')} className="p-2 rounded-md hover:bg-indigo-700 text-sm">Real Trading</button>
                    <button onClick={() => setCurrentScreen('ai-assistant')} className="p-2 rounded-md hover:bg-indigo-700 text-sm">AI</button>
                    {currentUser ? (
                        <button onClick={handleLogout} className="p-2 rounded-md hover:bg-indigo-700 text-sm">Logout</button>
                    ) : (
                        <button onClick={() => setCurrentScreen('login')} className="p-2 rounded-md hover:bg-indigo-700 text-sm">Login</button>
                    )}
                </nav>

                {renderScreen()}

                {/* Footer Navigation (Mobile-like) - Example, could be a separate component */}
                <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around py-2 sm:hidden">
                    <button onClick={() => setCurrentScreen('fantasy-dashboard')} className="flex flex-col items-center text-gray-700 hover:text-indigo-600">
                        <Icon name="Gamepad" size={24} />
                        <span className="text-xs">Fantasy</span>
                    </button>
                    <button onClick={() => setCurrentScreen('real-trading')} className="flex flex-col items-center text-gray-700 hover:text-indigo-600">
                        <Icon name="LineChart" size={24} />
                        <span className="text-xs">Trade</span>
                    </button>
                    <button onClick={() => setCurrentScreen('leaderboard')} className="flex flex-col items-center text-gray-700 hover:text-indigo-600">
                        <Icon name="Award" size={24} />
                        <span className="text-xs">Rankings</span>
                    </button>
                    <button onClick={() => setCurrentScreen('wallet-payments')} className="flex flex-col items-center text-gray-700 hover:text-indigo-600">
                        <Icon name="Wallet" size={24} />
                        <span className="text-xs">Wallet</span>
                    </button>
                    <button onClick={() => setCurrentScreen('ai-assistant')} className="flex flex-col items-center text-gray-700 hover:text-indigo-600">
                        <Icon name="Bot" size={24} />
                        <span className="text-xs">AI</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

// --- Component Definitions ---

const WelcomeScreen = ({ setCurrentScreen }) => (
    <section id="welcome-screen" className="text-center space-y-6">
        <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-2">
                $
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">StockPay</h1>
        </div>
        <p className="mt-2 text-xl text-gray-600">Fantasy investing meets real trading.</p>
        <div className="space-y-4 pt-6">
            <button className="btn-primary" onClick={() => setCurrentScreen('login')}>Login</button>
            <button className="btn-secondary" onClick={() => setCurrentScreen('register')}>Register</button>
            <button className="btn-secondary text-gray-700 border-gray-300 hover:bg-gray-50" onClick={() => console.log('How It Works clicked')}>How It Works</button>
        </div>
    </section>
);

const AuthScreen = ({ setCurrentScreen, handleLogin, handleRegister, mode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [referralCode, setReferralCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'login') {
            handleLogin(email, password);
        } else {
            handleRegister(name, email, password, referralCode);
        }
    };

    return (
        <section id="auth-screen" className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-900">{mode === 'login' ? 'Login' : 'Register'}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {mode === 'register' && (
                    <div>
                        <label htmlFor="register-name" className="sr-only">Full Name</label>
                        <input id="register-name" name="name" type="text" required className="input-field" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                )}
                <div>
                    <label htmlFor="auth-email" className="sr-only">Email address</label>
                    <input id="auth-email" name="email" type="email" autoComplete="email" required className="input-field" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="auth-password" className="sr-only">Password</label>
                    <input id="auth-password" name="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required className="input-field" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {mode === 'register' && (
                    <div>
                        <label htmlFor="register-referral" className="sr-only">Referral Code (Optional)</label>
                        <input id="register-referral" name="referral" type="text" className="input-field" placeholder="Referral Code (Optional)" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
                    </div>
                )}
                {mode === 'login' && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => console.log('Forgot Password clicked')}>Forgot your password?</a>
                        </div>
                    </div>
                )}
                <button type="submit" className="btn-primary">{mode === 'login' ? 'Sign In' : 'Register Account'}</button>
            </form>
            <div className="text-center">
                {mode === 'login' ? (
                    <p className="text-sm text-gray-600">Don't have an account? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => setCurrentScreen('register')}>Register here</a></p>
                ) : (
                    <p className="text-sm text-gray-600">Already have an account? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => setCurrentScreen('login')}>Login here</a></p>
                )}
            </div>
        </section>
    );
};

const FantasyDashboard = () => (
    <section id="fantasy-dashboard" className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">Fantasy Contest</h2>

        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg text-center shadow-sm">
            <p className="text-lg font-medium text-indigo-800">Today’s Contest Closes In:</p>
            <p className="text-3xl font-bold text-indigo-900 mt-1">1:23:10</p>
        </div>

        <button className="btn-primary" onClick={() => console.log('Join Contest clicked')}>Join Contest</button>

        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Your Picks:</h3>
            <div className="bg-white p-4 rounded-lg shadow space-y-3">
                {/* Stock 1 */}
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                        <p className="font-medium text-gray-900">Reliance Industries</p>
                        <p className="text-sm text-gray-500">RIL</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-semibold">+2.55%</span>
                        <button className="text-gray-500 hover:text-gray-700" onClick={() => console.log('Edit stock clicked')}>
                            <Icon name="Edit3" size={20} />
                        </button>
                    </div>
                </div>
                {/* Stock 2 */}
                <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                        <p className="font-medium text-gray-900">Tata Motors</p>
                        <p className="text-sm text-gray-500">TATAMOTORS</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-red-600 font-semibold">-1.20%</span>
                        <button className="text-gray-500 hover:text-gray-700" onClick={() => console.log('Edit stock clicked')}>
                            <Icon name="Edit3" size={20} />
                        </button>
                    </div>
                </div>
                {/* Stock 3 */}
                <div className="flex items-center justify-between py-2 last:border-b-0">
                    <div>
                        <p className="font-medium text-gray-900">HDFC Bank</p>
                        <p className="text-sm text-gray-500">HDFCBANK</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-semibold">+0.80%</span>
                        <button className="text-gray-500 hover:text-gray-700" onClick={() => console.log('Edit stock clicked')}>
                            <Icon name="Edit3" size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <p className="text-sm text-gray-500 text-center">You can edit your picks until the contest cutoff time.</p>
        </div>
    </section>
);

const RealTradingPanel = () => (
    <section id="real-trading-panel" className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">Real Trading</h2>

        <button className="btn-primary bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2" onClick={() => console.log('Login with Angel One clicked')}>
            <Icon name="Link" size={24} />
            <span>Login with Angel One</span>
        </button>

        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Your Holdings:</h3>
            <div className="bg-white p-4 rounded-lg shadow">
                <ul className="divide-y divide-gray-100">
                    <li className="py-3 flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-900">INFY <span className="text-sm text-gray-500 ml-1">x10</span></p>
                            <p className="text-xs text-gray-500">Avg: ₹1500 | LTP: ₹1520</p>
                        </div>
                        <span className="text-green-600 font-semibold">+₹200 (1.33%)</span>
                    </li>
                    <li className="py-3 flex justify-between items-center">
             
