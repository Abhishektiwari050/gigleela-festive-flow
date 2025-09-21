import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Calendar, 
  Users, 
  Heart,
  Trash2,
  MoreVertical,
  Star,
  Clock,
  Filter,
  Settings
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  type: 'booking' | 'favorite' | 'review' | 'system' | 'promotional';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: {
    artistName?: string;
    eventDate?: string;
    rating?: number;
    bookingId?: string;
  };
}

const Notifications = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [filter, setFilter] = useState('all');
  
  // Mock notifications data (in real app, this would come from API)
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your booking with Priya Sharma has been confirmed for your wedding event on Dec 25, 2024.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      actionUrl: '/bookings/1',
      actionLabel: 'View Booking',
      metadata: {
        artistName: 'Priya Sharma',
        eventDate: '2024-12-25',
        bookingId: '1'
      }
    },
    {
      id: '2',
      type: 'favorite',
      title: 'New Artist Match',
      message: 'Meera Nair, a Bharatanatyam dancer you might like, is now available in your area.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      actionUrl: '/artists/3',
      actionLabel: 'View Profile',
      metadata: {
        artistName: 'Meera Nair'
      }
    },
    {
      id: '3',
      type: 'review',
      title: 'Review Request',
      message: 'How was your experience with Raj Bhattacharya? Please share your feedback.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      actionUrl: '/reviews/add',
      actionLabel: 'Write Review',
      metadata: {
        artistName: 'Raj Bhattacharya',
        bookingId: '2'
      }
    },
    {
      id: '4',
      type: 'system',
      title: 'Profile Update',
      message: 'Your profile has been successfully updated with new preferences.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true
    },
    {
      id: '5',
      type: 'promotional',
      title: 'Special Offer',
      message: 'Get 20% off on your next booking! Use code FESTIVAL20. Valid till Dec 31.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: true,
      actionUrl: '/artists',
      actionLabel: 'Browse Artists'
    }
  ];
  
  useEffect(() => {
    if (isAuthenticated) {
      // In real app, fetch notifications from API
      setNotifications(mockNotifications);
    }
  }, [isAuthenticated]);
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'favorite':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'review':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'system':
        return <Settings className="h-5 w-5 text-gray-500" />;
      case 'promotional':
        return <Info className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getTimeLabel = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };
  
  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "Your notification list has been updated"
    });
  };
  
  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    );
    toast({
      title: "Notification deleted",
      description: "The notification has been removed"
    });
  };
  
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };
  
  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'unread' && notif.read) return false;
    if (filter !== 'all' && notif.type !== filter) return false;
    return true;
  });
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="flex items-center justify-center py-20 px-4 min-h-[60vh]">
            <Card className="w-full max-w-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center mb-2">Sign In Required</CardTitle>
                <p className="text-muted-foreground text-center">
                  Please sign in to view your notifications
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Button onClick={() => navigate("/signin")}>
                    Sign In
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Bell className="h-8 w-8" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </h1>
              <p className="text-muted-foreground">
                Stay updated with your bookings, favorites, and more
              </p>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilter('all')}>All Types</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('booking')}>Bookings</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('favorite')}>Favorites</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('review')}>Reviews</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('system')}>System</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('promotional')}>Promotions</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark All Read
                </Button>
              )}
            </div>
          </motion.div>
          
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread ({unreadCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
          
          {/* Notifications List */}
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="text-center py-16">
                <CardContent>
                  <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">
                    {activeTab === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {activeTab === 'unread' 
                      ? 'All caught up! Check back later for updates.'
                      : 'When you have new activity, notifications will appear here.'}
                  </p>
                  <Button onClick={() => navigate('/artists')}>
                    Browse Artists
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      !notification.read 
                        ? 'border-l-4 border-l-primary bg-primary/5' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`p-2 rounded-full ${
                          !notification.read ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className={`font-medium truncate ${
                              !notification.read ? 'text-primary' : 'text-foreground'
                            }`}>
                              {notification.title}
                            </h4>
                            
                            <div className="flex items-center gap-2 ml-2">
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {getTimeLabel(notification.timestamp)}
                              </span>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreVertical className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {!notification.read && (
                                    <DropdownMenuItem onClick={(e) => {
                                      e.stopPropagation();
                                      markAsRead(notification.id);
                                    }}>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Mark as Read
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteNotification(notification.id);
                                    }}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {notification.message}
                          </p>
                          
                          {/* Metadata */}
                          {notification.metadata && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {notification.metadata.artistName && (
                                <Badge variant="outline" className="text-xs">
                                  <Users className="h-3 w-3 mr-1" />
                                  {notification.metadata.artistName}
                                </Badge>
                              )}
                              {notification.metadata.eventDate && (
                                <Badge variant="outline" className="text-xs">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {new Date(notification.metadata.eventDate).toLocaleDateString()}
                                </Badge>
                              )}
                              {notification.metadata.rating && (
                                <Badge variant="outline" className="text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  {notification.metadata.rating}/5
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          {/* Action Button */}
                          {notification.actionLabel && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNotificationClick(notification);
                              }}
                            >
                              {notification.actionLabel}
                            </Button>
                          )}
                        </div>
                        
                        {/* Unread Indicator */}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notifications;