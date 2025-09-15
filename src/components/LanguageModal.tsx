import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
];

interface LanguageModalProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageModal = ({ selectedLanguage, onLanguageChange }: LanguageModalProps) => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  
  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange(languageCode);
    i18n.changeLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-card/80 backdrop-blur-sm border-border hover:bg-card/90 shadow-natural"
        >
          <Globe className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">{currentLanguage.native}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-md border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            {t('language.select')}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {languages.map((language) => (
              <Button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                variant={selectedLanguage === language.code ? 'default' : 'ghost'}
                className={`w-full justify-between h-auto p-4 ${
                  selectedLanguage === language.code 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium text-base">{language.native}</span>
                  <span className="text-sm opacity-70">{language.name}</span>
                </div>
                {selectedLanguage === language.code && (
                  <Check className="w-5 h-5" />
                )}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageModal;