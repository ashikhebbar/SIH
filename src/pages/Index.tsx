import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  Smartphone, Brain, Globe, Users, Camera, Zap, Shield, Award, Upload, Info, MapPin, 
  Star, TrendingUp, CheckCircle, Play, ArrowRight, Sparkles, Target,
  BarChart3, Clock, Wifi, Database, ChevronDown, X, User, LogOut, Mail, Lock, Eye, EyeOff
} from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase'; // Adjust path if your firebase.js is elsewhere

// Beautiful hero image with Indian farming theme
const heroImage = 'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80';

// Success story images
const successImages = [
  'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1607435232332-1ef4a2c57d70?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
];

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(true);
  const [stats, setStats] = useState({ users: 0, identifications: 0, accuracy: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  // Auth states
  const [user, setUser] = useState<User | null>(null); // Improved type
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Added for confirm password

  // Animated counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: Math.min(prev.users + 1000, 50000),
        identifications: Math.min(prev.identifications + 2000, 150000),
        accuracy: Math.min(prev.accuracy + 1, 99)
      }));
    }, 50);

    const timer = setTimeout(() => clearInterval(interval), 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  // Scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) console.log('User signed in:', currentUser.email);
    }, (error) => {
      console.error('Auth state error:', error);
      setAuthError('Authentication error. Please try again.');
    });
    return () => unsubscribe();
  }, []);

  // Handle sign-in with specific error messages
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email) {
      setAuthError(t.errorEmailRequired);
      return;
    }
    if (!password || password.length < 6) {
      setAuthError(t.errorPasswordRequired);
      return;
    }
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthModalOpen(false);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      const errorMessages: { [key: string]: string } = {
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/invalid-email': 'Invalid email format.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.'
      };
      setAuthError(errorMessages[err.code] || err.message || 'Failed to sign in');
    }
    setAuthLoading(false);
  };

  // Handle sign-up with specific error messages
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email) {
      setAuthError(t.errorEmailRequired);
      return;
    }
    if (!password || password.length < 6) {
      setAuthError(t.errorPasswordRequired);
      return;
    }
    if (!fullName) {
      setAuthError(t.errorNameRequired);
      return;
    }
    if (password !== confirmPassword) {
      setAuthError(t.errorMismatch);
      return;
    }
    setAuthLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setAuthModalOpen(false);
      setEmail('');
      setPassword('');
      setFullName('');
      setConfirmPassword('');
    } catch (err: any) {
      const errorMessages: { [key: string]: string } = {
        'auth/email-already-in-use': 'This email is already registered.',
        'auth/invalid-email': 'Invalid email format.',
        'auth/weak-password': 'Password is too weak. Use at least 6 characters.'
      };
      setAuthError(errorMessages[err.code] || err.message || 'Failed to create account');
    }
    setAuthLoading(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error('Logout error:', err.message);
      setAuthError('Failed to sign out. Please try again.');
    }
  };

  // Extended translations with auth
  const translations = {
    en: {
      appTitle: "BreedVision AI",
      appSubtitle: "Cattle & Buffalo Recognition",
      badge: "Smart India Hackathon 2025 - CodeVision Team",
      heroTitle: "AI-Powered Livestock",
      heroSubtitle: "Breed Recognition",
      heroDescription: "Revolutionizing Indian agriculture with cutting-edge AI technology. Instantly identify cattle and buffalo breeds with unprecedented accuracy.",
      getStarted: "Get Started Now",
      watchDemo: "Watch Demo",
      features: [
        { icon: Smartphone, label: "Mobile Friendly" },
        { icon: Globe, label: "Multi-Language" },
        { icon: Shield, label: "99% Accuracy" },
        { icon: Zap, label: "Lightning Fast" }
      ],
      stats: {
        users: "Active Users",
        identifications: "Breed Identifications",
        accuracy: "Accuracy Rate"
      },
      uploadTitle: "Upload Your Animal Photo",
      uploadDescription: "Take a clear photo of your cattle or buffalo, and our advanced AI will provide instant breed identification with comprehensive details.",
      analyzeButton: "Analyze Another Image",
      featuresTitle: "Why Choose BreedVision AI?",
      featuresSubtitle: "Advanced technology designed specifically for Indian farmers",
      featureInstant: "Instant Results",
      featureInstantDesc: "Get breed identification results in seconds with our lightning-fast AI processing engine.",
      featureAccuracy: "High Accuracy",
      featureAccuracyDesc: "Trained on extensive Indian breed datasets with industry-leading 99% identification accuracy.",
      featureMultiLang: "Multi-Language Support",
      featureMultiLangDesc: "Available in 10+ Indian languages to serve farmers across all states and regions.",
      featureFarmer: "Farmer Friendly",
      featureFarmerDesc: "Intuitive interface designed specifically for rural users with minimal tech experience.",
      featureOffline: "Works Offline",
      featureOfflineDesc: "Advanced offline capabilities ensure functionality even in areas with poor connectivity.",
      featureDatabase: "Comprehensive Database",
      featureDatabaseDesc: "Extensive database covering all major Indian cattle and buffalo breeds with detailed information.",
      aboutTitle: "About Our Technology",
      aboutSubtitle: "Built by Team CodeVision for Smart India Hackathon 2025",
      aiRecognition: "AI-Powered Recognition",
      aiDesc: "Our deep learning models are trained on comprehensive datasets of Indian cattle and buffalo breeds, ensuring accurate identification of indigenous varieties with detailed breed characteristics.",
      mobileDesign: "Mobile-First Design",
      mobileDesc: "Optimized for smartphones with progressive web app capabilities, making it accessible to farmers in remote areas with limited internet connectivity.",
      problemTitle: "Problem Statement",
      problemDesc: "Image-based Breed Recognition for Cattle and Buffaloes of India (SIH25004) - Agriculture, FoodTech & Rural Development",
      solutionTitle: "Our Solution",
      solutionDesc: "Fast, accurate, and accessible breed identification that empowers farmers with instant knowledge about their livestock characteristics and potential.",
      successTitle: "Success Stories",
      successSubtitle: "Real farmers, real results",
      testimonials: [
        {
          name: "Rajesh Patel",
          location: "Gujarat",
          quote: "BreedVision helped me identify the exact breed of my cattle. Now I can optimize feeding and care for better milk production.",
          rating: 5
        },
        {
          name: "Priya Sharma",
          location: "Punjab",
          quote: "This app is a game-changer for small farmers like me. Easy to use and incredibly accurate!",
          rating: 5
        },
        {
          name: "Mohammed Khan",
          location: "Uttar Pradesh",
          quote: "The multi-language support makes it perfect for our diverse farming community.",
          rating: 5
        }
      ],
      footerTitle: "BreedVision AI",
      footerDesc: "Empowering Indian farmers with AI-powered livestock breed recognition technology for a more productive future.",
      team: "Team CodeVision",
      hackathon: "Smart India Hackathon 2025",
      problemId: "Problem ID: SIH25004",
      builtWith: "Built with ❤️ for Indian farmers and livestock community",
      selectLanguage: "Select Your Language",
      changeLanguage: "Change Language",
      scrollToTop: "Back to Top",
      signIn: "Sign In",
      signUp: "Sign Up",
      logout: "Logout",
      email: "Email",
      password: "Password",
      fullName: "Full Name",
      confirmPassword: "Confirm Password",
      welcomeBack: "Welcome back! Please sign in to continue.",
      createAccount: "Create your account to get started.",
      loginRequired: "Login Required",
      loginPrompt: "Please sign in to upload and analyze images.",
      errorEmailRequired: "Email is required",
      errorPasswordRequired: "Password is required (min 6 chars)",
      errorNameRequired: "Full name is required",
      errorMismatch: "Passwords do not match"
    },
    hi: {
      appTitle: "ब्रीडविज़न एआई",
      appSubtitle: "गाय और भैंस की नस्ल पहचान",
      badge: "स्मार्ट इंडिया हैकाथॉन 2025 - कोडविज़न टीम",
      heroTitle: "एआई-संचालित पशुधन",
      heroSubtitle: "नस्ल पहचान",
      heroDescription: "अत्याधुनिक एआई तकनीक के साथ भारतीय कृषि में क्रांति लाना। अभूतपूर्व सटीकता के साथ गाय और भैंस की नस्लों की तुरंत पहचान करें।",
      getStarted: "अभी शुरू करें",
      watchDemo: "डेमो देखें",
      features: [
        { icon: Smartphone, label: "मोबाइल फ्रेंडली" },
        { icon: Globe, label: "बहुभाषी" },
        { icon: Shield, label: "99% सटीकता" },
        { icon: Zap, label: "बिजली की तेजी" }
      ],
      stats: {
        users: "सक्रिय उपयोगकर्ता",
        identifications: "नस्ल पहचान",
        accuracy: "सटीकता दर"
      },
      uploadTitle: "अपनी जानवर की फोटो अपलोड करें",
      uploadDescription: "अपनी गाय या भैंस की स्पष्ट फोटो लें, और हमारा उन्नत एआई व्यापक विवरण के साथ तत्काल नस्ल पहचान प्रदान करेगा।",
      analyzeButton: "एक और छवि का विश्लेषण करें",
      featuresTitle: "ब्रीडविज़न एआई क्यों चुनें?",
      featuresSubtitle: "भारतीय किसानों के लिए विशेष रूप से डिज़ाइन की गई उन्नत तकनीक",
      selectLanguage: "अपनी भाषा चुनें",
      changeLanguage: "भाषा बदलें",
      scrollToTop: "वापस शीर्ष पर",
      signIn: "साइन इन",
      signUp: "साइन अप",
      logout: "लॉग आउट",
      email: "ईमेल",
      password: "पासवर्ड",
      fullName: "पूरा नाम",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      welcomeBack: "स्वागत है! कृपया साइन इन करें।",
      createAccount: "अपना खाता बनाएं।",
      loginRequired: "लॉगिन आवश्यक",
      loginPrompt: "कृपया छवि अपलोड और विश्लेषण करने के लिए साइन इन करें।",
      errorEmailRequired: "ईमेल आवश्यक है",
      errorPasswordRequired: "पासवर्ड आवश्यक है (न्यूनतम 6 अक्षर)",
      errorNameRequired: "पूरा नाम आवश्यक है",
      errorMismatch: "पासवर्ड मेल नहीं खाते"
    },
    te: { appTitle: "బ్రీడ్‌విజన్ AI", appSubtitle: "పశువుల మరియు గేదెల జాతి గుర్తింపు", heroTitle: "AI-శక్తితో పశుసంపద", heroSubtitle: "జాతి గుర్తింపు", selectLanguage: "మీ భాషను ఎంచుకోండి", changeLanguage: "భాష మార్చండి" },
    ta: { appTitle: "பிரீட்விஷன் AI", appSubtitle: "கால்நடை மற்றும் எருமை இன அடையாளம்", heroTitle: "AI-சக்தியால் கால்நடை", heroSubtitle: "இன அடையாளம்", selectLanguage: "உங்கள் மொழியைத் தேர்வு செய்யவும்", changeLanguage: "மொழியை மாற்று" },
    ml: { appTitle: "ബ്രീഡ്‌വിഷൻ AI", appSubtitle: "കന്നുകാലികളുടെയും എരുമകളുടെയും ഇനം തിരിച്ചറിയൽ", heroTitle: "AI-ശക്തിയുള്ള കന്നുകാലി", heroSubtitle: "ഇനം തിരിച്ചറിയൽ", selectLanguage: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക", changeLanguage: "ഭാഷ മാറ്റുക" },
    kn: { appTitle: "ಬ್ರೀಡ್‌ವಿಷನ್ AI", appSubtitle: "ದನ ಮತ್ತು ಎಮ್ಮೆ ಜಾತಿ ಗುರುತಿಸುವಿಕೆ", heroTitle: "AI-ಶಕ್ತಿಯ ಜಾನುವಾರು", heroSubtitle: "ಜಾತಿ ಗುರುತಿಸುವಿಕೆ", selectLanguage: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", changeLanguage: "ಭಾಷೆ ಬದಲಾಯಿಸಿ" },
    gu: { appTitle: "બ્રીડવિઝન AI", appSubtitle: "ગાય અને ભેંસની જાતિ ઓળખ", heroTitle: "AI-સંચાલિત પશુધન", heroSubtitle: "જાતિ ઓળખ", selectLanguage: "તમારી ભાષા પસંદ કરો", changeLanguage: "ભાષા બદલો" },
    mr: { appTitle: "ब्रीडविझन AI", appSubtitle: "गुरेढोरे आणि म्हशींच्या जातीची ओळख", heroTitle: "AI-चालित पशुधन", heroSubtitle: "जातीची ओळख", selectLanguage: "तुमची भाषा निवडा", changeLanguage: "भाषा बदला" },
    pa: { appTitle: "ਬ੍ਰੀਡਵਿਜ਼ਨ AI", appSubtitle: "ਗਾਂ ਅਤੇ ਮੱਝਾਂ ਦੀ ਨਸਲ ਦੀ ਪਛਾਣ", heroTitle: "AI-ਸੰਚਾਲਿਤ ਪਸ਼ੂ-ਧਨ", heroSubtitle: "ਨਸਲ ਦੀ ਪਛਾਣ", selectLanguage: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ", changeLanguage: "ਭਾਸ਼ਾ ਬਦਲੋ" },
    bn: { appTitle: "ব্রিডভিশন AI", appSubtitle: "গরু ও মহিষের জাত শনাক্তকরণ", heroTitle: "AI-চালিত গবাদি পশু", heroSubtitle: "জাত শনাক্তকরণ", selectLanguage: "আপনার ভাষা নির্বাচন করুন", changeLanguage: "ভাষা পরিবর্তন করুন" }
  };

  const availableLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' }
  ];

  const t = translations[selectedLanguage] || translations.en;

  // Mock breed data
  const mockBreedResult = {
    name: selectedLanguage === 'en' ? "Gir Cattle" : "गिर गाय",
    confidence: 96,
    origin: selectedLanguage === 'en' ? "Gujarat, India" : "गुजरात, भारत",
    avgMilkYield: selectedLanguage === 'en' ? "10-15 liters/day" : "10-15 लीटर/दिन",
    physicalTraits: {
      height: selectedLanguage === 'en' ? "130-140 cm" : "130-140 सेमी",
      weight: selectedLanguage === 'en' ? "385-400 kg" : "385-400 किग्रा",
      color: selectedLanguage === 'en' ? "Red to yellow with white patches" : "लाल से पीले रंग के सफेद पैच के साथ",
      horns: selectedLanguage === 'en' ? "Curved backward and upward" : "पीछे और ऊपर की ओर मुड़ी हुई"
    },
    characteristics: selectedLanguage === 'en' ? 
      ["Heat Tolerant", "Disease Resistant", "High Milk Fat", "Docile Nature", "Drought Resistant", "Long Lactation"] :
      ["गर्मी सहनशील", "रोग प्रतिरोधी", "उच्च दूध वसा", "शांत स्वभाव", "सूखा प्रतिरोधी", "लंबी लैक्टेशन"],
    description: selectedLanguage === 'en' ? 
      "The Gir breed is one of the most important zebu breeds of India. Known for their distinctive appearance with a curved forehead and hanging ears, Gir cattle are highly valued for their milk production and adaptability to harsh tropical conditions." :
      "गिर नस्ल भारत की सबसे महत्वपूर्ण ज़ेबू नस्लों में से एक है।"
  };

  const handleImageUpload = (file: File) => {
    if (!file) {
      alert("Please upload a valid image.");
      return;
    }
    setUploadedImage(file);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 3000);
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setShowResult(false);
    setIsAnalyzing(false);
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setIsLanguageModalOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Enhanced Image Upload Component
  const ImageUpload = ({ onImageUpload, isAnalyzing }: { onImageUpload: (file: File) => void, isAnalyzing: boolean }) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onImageUpload(e.dataTransfer.files[0]);
      }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        onImageUpload(e.target.files[0]);
      }
    };

    if (!user) {
      return (
        <div className="text-center p-12 bg-red-50 border-2 border-red-200 rounded-3xl">
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-red-800 mb-2">{t.loginRequired}</h3>
          <p className="text-gray-600 mb-6">{t.loginPrompt}</p>
          <div className="space-x-4">
            <Button onClick={() => { setAuthMode('signin'); setAuthModalOpen(true); }} className="bg-blue-500 hover:bg-blue-600">
              {t.signIn}
            </Button>
            <Button onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }} variant="outline">
              {t.signUp}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className={`relative border-3 border-dashed rounded-3xl p-8 text-center transition-all duration-300 ${
        dragActive ? 'border-green-500 bg-green-50 scale-105' : 'border-green-300 bg-gradient-to-br from-green-50 to-yellow-50'
      } ${isAnalyzing ? 'pointer-events-none' : 'hover:border-green-400 hover:bg-green-50'}`}
           onDragEnter={handleDrag}
           onDragLeave={handleDrag}
           onDragOver={handleDrag}
           onDrop={handleDrop}>
        
        {isAnalyzing ? (
          <div className="space-y-4">
            <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-green-800 font-semibold text-lg">Analyzing your image...</p>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">{t.uploadTitle}</h3>
              <p className="text-gray-600">{t.uploadDescription}</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer hover:from-green-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Camera className="w-5 h-5" />
              Choose File
            </label>
          </div>
        )}
      </div>
    );
  };

  // Enhanced Breed Result Component
  const BreedResult = ({ breedInfo }: { breedInfo: typeof mockBreedResult }) => (
    <Card className="bg-gradient-to-br from-white to-green-50 shadow-2xl border-2 border-green-200 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-600 to-yellow-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{breedInfo.name}</CardTitle>
            <p className="text-green-100 flex items-center gap-2 mt-2">
              <MapPin className="w-4 h-4" />
              {breedInfo.origin}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-yellow-200">
              <Target className="w-5 h-5" />
              <span className="text-xl font-bold">{breedInfo.confidence}%</span>
            </div>
            <p className="text-sm text-green-100">Confidence</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-green-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Physical Traits
            </h4>
            <div className="space-y-2 bg-green-50 p-4 rounded-xl">
              <div className="flex justify-between"><span>Height:</span> <span className="font-medium">{breedInfo.physicalTraits.height}</span></div>
              <div className="flex justify-between"><span>Weight:</span> <span className="font-medium">{breedInfo.physicalTraits.weight}</span></div>
              <div className="flex justify-between"><span>Color:</span> <span className="font-medium">{breedInfo.physicalTraits.color}</span></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-green-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Milk Production
            </h4>
            <div className="bg-yellow-50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-yellow-600">{breedInfo.avgMilkYield}</div>
              <p className="text-sm text-gray-600">Average Daily Yield</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Key Characteristics
          </h4>
          <div className="flex flex-wrap gap-2">
            {breedInfo.characteristics.map((char, idx) => (
              <Badge key={idx} className="bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 px-3 py-1 hover:from-green-200 hover:to-yellow-200 transition-colors">
                <CheckCircle className="w-3 h-3 mr-1" />
                {char}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Description
          </h4>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{breedInfo.description}</p>
        </div>
      </CardContent>
    </Card>
  );

  // Language Selector Component
  const LanguageSelector = ({ selectedLanguage, onLanguageChange }: { selectedLanguage: string, onLanguageChange: (lang: string) => void }) => (
    <div className="grid grid-cols-2 gap-3">
      {availableLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code)}
          className={`p-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-2 text-sm font-medium ${
            selectedLanguage === lang.code
              ? 'border-green-500 bg-green-50 text-green-800 scale-105 shadow-md'
              : 'border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700'
          }`}
        >
          <span className="text-lg">{lang.flag}</span>
          <span className="truncate">{lang.name}</span>
        </button>
      ))}
    </div>
  );

  // Enhanced Auth Modal Component
  const AuthModal = ({ open, mode, onClose, onSwitch }: { open: boolean, mode: 'signin' | 'signup', onClose: () => void, onSwitch: (mode: 'signin' | 'signup') => void }) => {
    return open ? (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border-2 border-green-200 animate-fade-in relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-green-600"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-green-800 mb-2">
              {mode === 'signin' ? t.signIn : t.signUp}
            </h2>
            <p className="text-gray-600">
              {mode === 'signin' ? t.welcomeBack : t.createAccount}
            </p>
          </div>
          <form className="space-y-5" onSubmit={mode === 'signin' ? handleSignIn : handleSignUp}>
            {mode === 'signup' && (
              <Input
                type="text"
                placeholder={t.fullName}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-12"
              />
            )}
            <Input
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={t.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-12 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-8 w-8 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {mode === 'signup' && (
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t.confirmPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-12 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 h-8 w-8 p-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            )}
            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold" 
              disabled={authLoading}
            >
              {authLoading ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : mode === 'signin' ? t.signIn : t.signUp}
            </Button>
          </form>
          <div className="mt-6 text-center">
            {mode === 'signin' ? (
              <span>
                {t.createAccount} {' '}
                <button
                  className="text-green-700 font-semibold underline"
                  onClick={() => onSwitch('signup')}
                >
                  {t.signUp}
                </button>
              </span>
            ) : (
              <span>
                {t.welcomeBack} {' '}
                <button
                  className="text-green-700 font-semibold underline"
                  onClick={() => onSwitch('signin')}
                >
                  {t.signIn}
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 relative">
      {/* Auth Modal */}
      <AuthModal
        open={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSwitch={setAuthMode}
      />

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ChevronDown className="w-6 h-6 rotate-180" />
        </button>
      )}

      {/* Language Selection Modal */}
      {isLanguageModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl border-2 border-green-200 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-green-800 mb-2">{t.selectLanguage}</h2>
              <p className="text-gray-600">Choose your preferred language to continue</p>
            </div>
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
            />
            <Button
              onClick={() => setIsLanguageModalOpen(false)}
              className="mt-6 w-full bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-green-200 shadow-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-yellow-500 shadow-lg transform hover:scale-105 transition-transform">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800">{t.appTitle}</h1>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                {t.appSubtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-1" />
                  {t.logout}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => { setAuthMode('signin'); setAuthModalOpen(true); }}
                  className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-600 transition-all duration-300"
                >
                  {t.signIn}
                </Button>
                <Button
                  onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-yellow-600 transition-all duration-300"
                >
                  {t.signUp}
                </Button>
              </>
            )}
            <Button
              onClick={() => setIsLanguageModalOpen(true)}
              className="bg-green-100 text-green-800 px-6 py-3 rounded-full hover:bg-green-200 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
            >
              <Globe className="w-5 h-5 mr-2" />
              {t.changeLanguage}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Indian farmer with cattle in field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 text-white">
          <div className="max-w-4xl">
            <Badge className="mb-8 px-6 py-3 bg-yellow-400/90 text-green-900 font-bold text-lg border-2 border-yellow-300 backdrop-blur-sm shadow-xl hover:scale-105 transition-transform">
              <Award className="w-5 h-5 mr-2" />
              {t.badge}
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="block text-white drop-shadow-2xl">{t.heroTitle}</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
                {t.heroSubtitle}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 max-w-3xl text-white/95 leading-relaxed font-medium drop-shadow-lg">
              {t.heroDescription}
            </p>

            <div className="flex flex-wrap gap-6 mb-12">
              <Button className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300">
                <Zap className="w-6 h-6 mr-3" />
                {t.getStarted}
              </Button>
              <Button className="bg-white/20 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:bg-white/30 transition-all duration-300 hover:scale-105">
                <Play className="w-6 h-6 mr-3" />
                {t.watchDemo}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {t.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-300 hover:scale-105">
                  <feature.icon className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                  <span className="font-semibold text-sm">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl shadow-xl border border-green-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-black text-green-800 mb-2">{stats.users.toLocaleString()}+</div>
              <div className="text-green-700 font-semibold">{t.stats.users}</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-3xl shadow-xl border border-yellow-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-black text-yellow-800 mb-2">{stats.identifications.toLocaleString()}+</div>
              <div className="text-yellow-700 font-semibold">{t.stats.identifications}</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl shadow-xl border border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-black text-blue-800 mb-2">{stats.accuracy}%</div>
              <div className="text-blue-700 font-semibold">{t.stats.accuracy}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Upload Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-green-200 mb-6">
              <Upload className="w-6 h-6 text-green-600" />
              <span className="font-bold text-green-800 text-lg">{t.uploadTitle}</span>
            </div>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t.uploadDescription}
            </p>
          </div>

          {!showResult ? (
            <div className="max-w-2xl mx-auto">
              <ImageUpload 
                onImageUpload={handleImageUpload}
                isAnalyzing={isAnalyzing}
              />
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-10">
              <div className="text-center">
                <img 
                  src={uploadedImage ? URL.createObjectURL(uploadedImage) : 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'} 
                  alt={mockBreedResult.name}
                  className="w-80 h-80 mx-auto rounded-3xl shadow-2xl object-cover border-4 border-white"
                />
              </div>
              <BreedResult breedInfo={mockBreedResult} />
              <div className="text-center">
                <Button 
                  onClick={resetAnalysis}
                  className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
                >
                  <Camera className="w-6 h-6 mr-3" />
                  {t.analyzeButton}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-green-800 mb-6">{t.featuresTitle}</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">{t.featuresSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: t.featureInstant, desc: t.featureInstantDesc, gradient: "from-blue-500 to-purple-600" },
              { icon: Award, title: t.featureAccuracy, desc: t.featureAccuracyDesc, gradient: "from-green-500 to-teal-600" },
              { icon: Globe, title: t.featureMultiLang, desc: t.featureMultiLangDesc, gradient: "from-yellow-500 to-orange-600" },
              { icon: Users, title: t.featureFarmer, desc: t.featureFarmerDesc, gradient: "from-pink-500 to-red-600" },
              { icon: Wifi, title: t.featureOffline, desc: t.featureOfflineDesc, gradient: "from-indigo-500 to-blue-600" },
              { icon: Database, title: t.featureDatabase, desc: t.featureDatabaseDesc, gradient: "from-purple-500 to-pink-600" }
            ].map((feature, idx) => (
              <Card key={idx} className="group bg-gradient-to-br from-white to-gray-50 shadow-xl border-2 border-gray-100 hover:border-green-300 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-green-800 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-gray-600 text-lg leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-green-800 mb-6">{t.successTitle}</h2>
            <p className="text-2xl text-gray-600">{t.successSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-white shadow-2xl border-2 border-green-100 hover:border-green-300 transition-all duration-300 transform hover:scale-105 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={successImages[idx]} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-green-200"
                    />
                    <div>
                      <h3 className="font-bold text-green-800 text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black text-green-800 mb-6">{t.aboutTitle}</h2>
              <p className="text-2xl text-gray-600">{t.aboutSubtitle}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-4 text-green-800 font-bold text-xl">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                        <Brain className="w-7 h-7 text-white" />
                      </div>
                      {t.aiRecognition}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-lg leading-relaxed">{t.aiDesc}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-4 text-blue-800 font-bold text-xl">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                        <Smartphone className="w-7 h-7 text-white" />
                      </div>
                      {t.mobileDesign}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-lg leading-relaxed">{t.mobileDesc}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <h3 className="font-black text-purple-800 mb-4 flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                    {t.problemTitle}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{t.problemDesc}</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-yellow-50 border-2 border-green-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <h3 className="font-black text-green-800 mb-4 flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    {t.solutionTitle}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{t.solutionDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-green-800 to-yellow-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">{t.footerTitle}</h3>
              <p className="text-white/80 leading-relaxed">{t.footerDesc}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">{t.team}</h3>
              <p>{t.hackathon}</p>
              <p>{t.problemId}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p>Email: support@breedvision.ai</p>
              <p>Phone: +91 123-456-7890</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-white/80">{t.builtWith}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;