
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { submitMarketingContact, subscribeToAlerts, MarketingContact } from '@/lib/api';
import { 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Loader2,
  AlertTriangle,
  Bell 
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, isLoading: authLoading, isAuthenticated, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Marketing contact form
  const [contactForm, setContactForm] = useState<MarketingContact>({
    name: user?.name || '',
    email: user?.email || '',
    telegram: '',
    whatsapp: '',
    project: '',
    message: '',
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  
  // Alert preferences
  const [alertPreferences, setAlertPreferences] = useState<string[]>([
    'price_alerts',
    'new_listings',
    'market_news',
  ]);
  const [isUpdatingAlerts, setIsUpdatingAlerts] = useState(false);
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Name is required',
        variant: 'destructive',
      });
      return;
    }
    
    setIsUpdating(true);
    
    try {
      await updateUserProfile({ name });
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      console.error('Profile update error:', error);
      
      toast({
        title: 'Update failed',
        description: 'Failed to update your profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email) {
      toast({
        title: 'Required fields missing',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmittingContact(true);
    
    try {
      await submitMarketingContact(contactForm);
      
      toast({
        title: 'Contact information submitted',
        description: 'Your marketing contact information has been successfully submitted.',
      });
      
      // Reset form fields except name and email
      setContactForm(prev => ({
        ...prev,
        telegram: '',
        whatsapp: '',
        project: '',
        message: '',
      }));
    } catch (error) {
      console.error('Contact submission error:', error);
      
      toast({
        title: 'Submission failed',
        description: 'Failed to submit your contact information. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };
  
  const handleAlertPreferenceChange = (preference: string) => {
    setAlertPreferences(prev => 
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };
  
  const handleUpdateAlerts = async () => {
    setIsUpdatingAlerts(true);
    
    try {
      const success = await subscribeToAlerts(user?.email || '', alertPreferences);
      
      if (success) {
        toast({
          title: 'Alert preferences updated',
          description: 'Your alert preferences have been successfully updated.',
        });
      } else {
        throw new Error('Failed to update alert preferences');
      }
    } catch (error) {
      console.error('Alert update error:', error);
      
      toast({
        title: 'Update failed',
        description: 'Failed to update your alert preferences. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdatingAlerts(false);
    }
  };
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [authLoading, isAuthenticated, navigate]);
  
  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 pb-20">
          <h1 className="text-3xl font-bold mb-2">Account Profile</h1>
          <p className="text-muted-foreground mb-8">
            Manage your account settings and marketing contact preferences.
          </p>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="marketing">Marketing Contact</TabsTrigger>
              <TabsTrigger value="alerts">Alert Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="glass-morphism rounded-xl p-8 border border-border/50 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User className="h-4 w-4" />
                      </div>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="pl-10"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isUpdating}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className="pl-10"
                        value={email}
                        disabled
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Email cannot be changed.</p>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Update Profile'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="marketing">
              <div className="glass-morphism rounded-xl p-8 border border-border/50 max-w-2xl mx-auto">
                <div className="flex items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Marketing Contact Information</h2>
                    <p className="text-muted-foreground mt-1">
                      Submit your contact details to receive project marketing opportunities.
                    </p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmitContact} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="flex items-center">
                      Name <span className="text-destructive ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User className="h-4 w-4" />
                      </div>
                      <Input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        className="pl-10"
                        value={contactForm.name}
                        onChange={handleContactFormChange}
                        disabled={isSubmittingContact}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="flex items-center">
                      Email <span className="text-destructive ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                      </div>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10"
                        value={contactForm.email}
                        onChange={handleContactFormChange}
                        disabled={isSubmittingContact}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-telegram">Telegram</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <span className="text-xs font-medium">TG</span>
                      </div>
                      <Input
                        id="contact-telegram"
                        name="telegram"
                        type="text"
                        placeholder="@username"
                        className="pl-10"
                        value={contactForm.telegram}
                        onChange={handleContactFormChange}
                        disabled={isSubmittingContact}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-whatsapp">WhatsApp</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                      </div>
                      <Input
                        id="contact-whatsapp"
                        name="whatsapp"
                        type="text"
                        placeholder="+1234567890"
                        className="pl-10"
                        value={contactForm.whatsapp}
                        onChange={handleContactFormChange}
                        disabled={isSubmittingContact}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-project">Project Name (if applicable)</Label>
                    <Input
                      id="contact-project"
                      name="project"
                      type="text"
                      placeholder="Your project name"
                      value={contactForm.project}
                      onChange={handleContactFormChange}
                      disabled={isSubmittingContact}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Additional Information</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <textarea
                        id="contact-message"
                        name="message"
                        placeholder="Your marketing expertise, preferred project types, etc."
                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={contactForm.message}
                        onChange={handleContactFormChange}
                        disabled={isSubmittingContact}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      By submitting this form, you agree to receive marketing opportunities from crypto projects.
                      Your contact information will be shared with relevant project teams.
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <Button type="submit" disabled={isSubmittingContact}>
                      {isSubmittingContact ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Contact Information'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="alerts">
              <div className="glass-morphism rounded-xl p-8 border border-border/50 max-w-2xl mx-auto">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Alert Preferences</h2>
                    <p className="text-muted-foreground mt-1">
                      Customize what types of alerts you want to receive.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id="price-alerts" 
                        checked={alertPreferences.includes('price_alerts')}
                        onCheckedChange={() => handleAlertPreferenceChange('price_alerts')}
                      />
                      <Label htmlFor="price-alerts" className="font-medium">
                        Price Alerts
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-7">
                      Receive notifications when coins reach your specified price targets.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id="new-listings" 
                        checked={alertPreferences.includes('new_listings')}
                        onCheckedChange={() => handleAlertPreferenceChange('new_listings')}
                      />
                      <Label htmlFor="new-listings" className="font-medium">
                        New Listings
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-7">
                      Get notified when new cryptocurrencies are listed on major exchanges.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id="market-news" 
                        checked={alertPreferences.includes('market_news')}
                        onCheckedChange={() => handleAlertPreferenceChange('market_news')}
                      />
                      <Label htmlFor="market-news" className="font-medium">
                        Market News
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-7">
                      Stay updated with major market movements and crypto news.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id="marketing-opportunities" 
                        checked={alertPreferences.includes('marketing_opportunities')}
                        onCheckedChange={() => handleAlertPreferenceChange('marketing_opportunities')}
                      />
                      <Label htmlFor="marketing-opportunities" className="font-medium">
                        Marketing Opportunities
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-7">
                      Receive alerts about projects seeking marketing services.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id="portfolio-updates" 
                        checked={alertPreferences.includes('portfolio_updates')}
                        onCheckedChange={() => handleAlertPreferenceChange('portfolio_updates')}
                      />
                      <Label htmlFor="portfolio-updates" className="font-medium">
                        Portfolio Updates
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-7">
                      Get daily or weekly summaries of your portfolio performance.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={handleUpdateAlerts} disabled={isUpdatingAlerts}>
                      {isUpdatingAlerts ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Save Preferences'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
