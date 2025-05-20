
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Loader2, UserCircle, CalendarCheck, LogOut, Clock, BriefcaseMedical, IndianRupee, CalendarDays, Ban, Edit, History } from 'lucide-react';
import type { Booking } from '@/components/provider/BookingForm';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns'; // For formatting date in reschedule dialog

const LOCAL_STORAGE_BOOKINGS_KEY_PREFIX = "swasthyaConnectBookings_";

// Sample time slots for reschedule form (can be customized)
const sampleTimeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

export default function DashboardPage() {
  const { user, loading: authLoading, logout: signOutUser } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { toast } = useToast();

  // State for cancellation dialog
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [bookingToCancelId, setBookingToCancelId] = useState<string | null>(null);
  const [cancellationReason, setCancellationReason] = useState("");

  // State for reschedule dialog
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [bookingToReschedule, setBookingToReschedule] = useState<Booking | null>(null);
  const [newAppointmentDate, setNewAppointmentDate] = useState<Date | undefined>(undefined);
  const [newAppointmentTime, setNewAppointmentTime] = useState<string>("");


  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else {
        loadBookings();
        setPageLoading(false);
      }
    }
  }, [user, authLoading, router]);

  const loadBookings = () => {
    if (user) {
      const bookingsKey = `${LOCAL_STORAGE_BOOKINGS_KEY_PREFIX}${user.phoneNumber}`;
      try {
        const storedBookingsString = localStorage.getItem(bookingsKey);
        if (storedBookingsString) {
          const parsedBookings: Booking[] = JSON.parse(storedBookingsString);
          // Sort by date and time, most recent first
          parsedBookings.sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.time.replace(/ /g, '')).getTime();
            const dateB = new Date(b.date + 'T' + b.time.replace(/ /g, '')).getTime();
            return dateB - dateA;
          });
          setBookings(parsedBookings);
        } else {
          setBookings([]);
        }
      } catch (e) {
        console.error("Failed to parse bookings from localStorage", e);
        setBookings([]);
      }
    }
  };

  const openCancelDialog = (bookingId: string) => {
    setBookingToCancelId(bookingId);
    setCancellationReason(""); // Reset reason
    setIsCancelDialogOpen(true);
  };

  const handleConfirmCancelBooking = async () => {
    if (!user || !bookingToCancelId) return;

    const bookingsKey = `${LOCAL_STORAGE_BOOKINGS_KEY_PREFIX}${user.phoneNumber}`;
    try {
      const storedBookingsString = localStorage.getItem(bookingsKey);
      let currentBookings: Booking[] = storedBookingsString ? JSON.parse(storedBookingsString) : [];
      
      const bookingIndex = currentBookings.findIndex(b => b.id === bookingToCancelId);

      if (bookingIndex > -1) {
        currentBookings[bookingIndex].status = 'Cancelled';
        currentBookings[bookingIndex].cancellationReason = cancellationReason || "Not specified";
        localStorage.setItem(bookingsKey, JSON.stringify(currentBookings));
        loadBookings(); 
        toast({
          title: "Appointment Cancelled",
          description: `Your appointment with ${currentBookings[bookingIndex].providerName} has been cancelled. Reason: ${cancellationReason || "Not specified"}.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: "Could not find the appointment to cancel.",
          variant: "destructive",
        });
      }
    } catch (e) {
      console.error("Failed to cancel booking in localStorage", e);
      toast({
        title: "Error",
        description: "An error occurred while cancelling the appointment.",
        variant: "destructive",
      });
    } finally {
      setIsCancelDialogOpen(false);
      setBookingToCancelId(null);
      setCancellationReason("");
    }
  };

  const openRescheduleDialog = (booking: Booking) => {
    setBookingToReschedule(booking);
    setNewAppointmentDate(parseISO(booking.date)); // Pre-fill with current date
    setNewAppointmentTime(booking.time); // Pre-fill with current time
    setIsRescheduleDialogOpen(true);
  };

  const handleConfirmRescheduleBooking = async () => {
    if (!user || !bookingToReschedule || !newAppointmentDate || !newAppointmentTime) {
      toast({ title: "Missing Information", description: "Please select a new date and time.", variant: "destructive"});
      return;
    }

    const bookingsKey = `${LOCAL_STORAGE_BOOKINGS_KEY_PREFIX}${user.phoneNumber}`;
    try {
      const storedBookingsString = localStorage.getItem(bookingsKey);
      let currentBookings: Booking[] = storedBookingsString ? JSON.parse(storedBookingsString) : [];
      const bookingIndex = currentBookings.findIndex(b => b.id === bookingToReschedule.id);

      if (bookingIndex > -1) {
        const originalDate = currentBookings[bookingIndex].date;
        const originalTime = currentBookings[bookingIndex].time;

        currentBookings[bookingIndex].date = format(newAppointmentDate, "yyyy-MM-dd");
        currentBookings[bookingIndex].time = newAppointmentTime;
        currentBookings[bookingIndex].status = 'Rescheduled';
        currentBookings[bookingIndex].originalBookingDetails = { date: originalDate, time: originalTime };
        currentBookings[bookingIndex].bookedAt = Date.now(); // Update bookedAt to reflect reschedule time for sorting

        localStorage.setItem(bookingsKey, JSON.stringify(currentBookings));
        loadBookings();
        toast({
          title: "Appointment Rescheduled",
          description: `Your appointment with ${bookingToReschedule.providerName} has been rescheduled to ${format(newAppointmentDate, "PPP")} at ${newAppointmentTime}.`,
        });
      } else {
         toast({ title: "Error", description: "Could not find the appointment to reschedule.", variant: "destructive"});
      }
    } catch (e) {
      console.error("Failed to reschedule booking in localStorage", e);
      toast({ title: "Error", description: "An error occurred while rescheduling.", variant: "destructive"});
    } finally {
      setIsRescheduleDialogOpen(false);
      setBookingToReschedule(null);
      setNewAppointmentDate(undefined);
      setNewAppointmentTime("");
    }
  };


  if (authLoading || pageLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-6">
            <UserCircle className="h-12 w-12" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Welcome to your Dashboard</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Manage your appointments, view your health records, and update your profile.
        </p>
         <p className="text-md text-muted-foreground mt-2">Logged in as: {user.phoneNumber || "User"}</p>
      </section>

      <section className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
                <CalendarCheck className="h-7 w-7 text-accent"/>
                <CardTitle className="text-2xl text-primary">My Appointments</CardTitle>
            </div>
            <CardDescription>View, reschedule, or cancel your upcoming appointments.</CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <Card key={booking.id} className={`p-4 border border-border/60 shadow-sm ${booking.status === 'Cancelled' ? 'bg-muted/30 opacity-70' : ''} ${booking.status === 'Rescheduled' ? 'border-accent/50 bg-accent/5' : ''}`}>
                    <CardTitle className={`text-lg mb-1 ${booking.status === 'Cancelled' ? 'text-muted-foreground line-through' : 'text-primary'}`}>{booking.providerName}</CardTitle>
                    <div className={`text-sm space-y-1 ${booking.status === 'Cancelled' ? 'text-muted-foreground line-through' : 'text-muted-foreground'}`}>
                      <p className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-primary/70" /> Date: {new Date(booking.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="flex items-center"><Clock className="mr-2 h-4 w-4 text-primary/70" /> Time: {booking.time}</p>
                      <p className="flex items-center"><IndianRupee className="mr-2 h-4 w-4 text-primary/70" /> Fee: {booking.consultationFee}</p>
                       <p className="flex items-center"><BriefcaseMedical className="mr-2 h-4 w-4 text-primary/70" /> Status: 
                          <span className={`font-medium ml-1 ${
                            booking.status === 'Confirmed' ? 'text-green-600' 
                            : booking.status === 'Cancelled' ? 'text-red-600' 
                            : booking.status === 'Rescheduled' ? 'text-blue-600'
                            : 'text-foreground'}`}>
                              {booking.status}
                          </span>
                       </p>
                       {booking.status === 'Cancelled' && booking.cancellationReason && (
                         <p className="text-xs italic">Reason: {booking.cancellationReason}</p>
                       )}
                       {booking.status === 'Rescheduled' && booking.originalBookingDetails && (
                         <p className="text-xs italic flex items-center"><History className="mr-1 h-3 w-3"/> Originally: {new Date(booking.originalBookingDetails.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} at {booking.originalBookingDetails.time}</p>
                       )}
                    </div>
                    {booking.status !== 'Cancelled' && (
                      <div className="mt-3 flex gap-2 flex-wrap">
                          <Button variant="outline" size="sm" onClick={() => openRescheduleDialog(booking)}>
                            <Edit className="mr-2 h-4 w-4" /> Reschedule
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => openCancelDialog(booking.id)}>
                            <Ban className="mr-2 h-4 w-4" /> Cancel
                          </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">You have no appointments scheduled.</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
                <LogOut className="h-7 w-7 text-destructive"/>
                <CardTitle className="text-2xl text-primary">Account</CardTitle>
            </div>
            <CardDescription>Manage your account settings or log out.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full mb-3" variant="outline" disabled>Edit Profile (Soon)</Button>
            <Button className="w-full" variant="destructive" onClick={signOutUser}>
                <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Cancellation Dialog */}
      <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for cancelling this appointment. This helps us improve our service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="cancellationReason">Reason (Optional)</Label>
            <Textarea
              id="cancellationReason"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              placeholder="e.g., Schedule conflict, feeling better..."
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setBookingToCancelId(null)}>Keep Appointment</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCancelBooking} className="bg-destructive hover:bg-destructive/90">Confirm Cancellation</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reschedule Dialog */}
      {bookingToReschedule && (
        <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reschedule Appointment</DialogTitle>
              <DialogDescription>
                Select a new date and time for your appointment with {bookingToReschedule.providerName}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newDate" className="text-right">New Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`col-span-3 justify-start text-left font-normal ${!newAppointmentDate && "text-muted-foreground"}`}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {newAppointmentDate ? format(newAppointmentDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newAppointmentDate}
                      onSelect={setNewAppointmentDate}
                      initialFocus
                      disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} // Disable past dates
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newTime" className="text-right">New Time</Label>
                 <Select value={newAppointmentTime} onValueChange={setNewAppointmentTime}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select new time" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleTimeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleConfirmRescheduleBooking} disabled={!newAppointmentDate || !newAppointmentTime}>
                Confirm Reschedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
