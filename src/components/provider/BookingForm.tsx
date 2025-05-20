
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext'; // Import useAuth

// Define the expected structure for an availability item
interface AvailabilityItem {
  day: string;
  slots: string[];
}

interface BookingFormProps {
  availability: AvailabilityItem[];
  consultationFee: string;
  providerName: string;
}

export interface Booking {
  id: string;
  providerName: string;
  date: string;
  time: string;
  consultationFee: string;
  bookedAt: number;
  status: 'Confirmed' | 'Cancelled' | 'Rescheduled'; 
  userId: string; 
  cancellationReason?: string;
  originalBookingDetails?: { date: string; time: string };
}

const LOCAL_STORAGE_BOOKINGS_KEY_PREFIX = "swasthyaConnectBookings_";

export function BookingForm({ availability, consultationFee, providerName }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth(); // Get user from AuthContext

  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDate) {
      // Placeholder: In a real app, you might filter slots based on the selected date and provider's actual availability.
      // For now, we'll use all unique slots from the provider's general availability.
      const allSlots = availability.flatMap(a => a.slots);
      const uniqueSlots = Array.from(new Set(allSlots)).sort(); // Sort for consistent order
      setAvailableTimeSlots(uniqueSlots);
    } else {
      setAvailableTimeSlots([]);
    }
  }, [selectedDate, availability]);


  const handleBookingRequest = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book an appointment.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time for your appointment.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsBooking(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    const newBooking: Booking = {
      id: Date.now().toString(), // Simple unique ID
      providerName,
      date: selectedDate,
      time: selectedTime,
      consultationFee,
      bookedAt: Date.now(),
      status: 'Confirmed',
      userId: user.phoneNumber,
    };

    try {
      const bookingsKey = `${LOCAL_STORAGE_BOOKINGS_KEY_PREFIX}${user.phoneNumber}`;
      const existingBookingsString = localStorage.getItem(bookingsKey);
      const existingBookings: Booking[] = existingBookingsString ? JSON.parse(existingBookingsString) : [];
      existingBookings.push(newBooking);
      localStorage.setItem(bookingsKey, JSON.stringify(existingBookings));
      
      setBookingConfirmed(true);
      toast({
        title: "Appointment Requested!",
        description: `Your request for ${selectedDate} at ${selectedTime} with ${providerName} has been submitted. You can view it on your dashboard.`,
        duration: 5000,
      });

    } catch (error) {
      console.error("Failed to save booking to localStorage", error);
      toast({
        title: "Booking Failed",
        description: "Could not save your booking. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="appointment-date" className="block text-sm font-medium text-foreground mb-1">Select Date</label>
        <Input
          id="appointment-date"
          type="date"
          className="mb-2 bg-background"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setBookingConfirmed(false); 
            setSelectedTime(""); 
          }}
          disabled={isBooking || bookingConfirmed}
          min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
        />
      </div>
      
      {selectedDate && (
        <div>
          <label htmlFor="appointment-time" className="block text-sm font-medium text-foreground mb-1">Select Time Slot</label>
          <Select
            value={selectedTime}
            onValueChange={(value) => {
              setSelectedTime(value);
              setBookingConfirmed(false);
            }}
            disabled={isBooking || bookingConfirmed || availableTimeSlots.length === 0}
          >
            <SelectTrigger id="appointment-time" className="bg-background">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              {availableTimeSlots.length > 0 ? (
                availableTimeSlots.map(slot => (
                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>No slots available for this date (placeholder)</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      )}

      <Button 
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-10 text-base"
        onClick={handleBookingRequest}
        disabled={isBooking || bookingConfirmed || !selectedDate || !selectedTime || !user}
      >
        {isBooking ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : bookingConfirmed ? (
          "Appointment Requested!"
        ) : (
          <>
            <CalendarDays className="mr-2 h-5 w-5"/> Request Appointment
          </>
        )}
      </Button>
      {!user && <p className="text-xs text-destructive text-center">Please login to book an appointment.</p>}
      {bookingConfirmed && (
        <p className="text-sm text-green-700 dark:text-green-500 text-center mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded-md">
            Your appointment request has been noted. You can view details on your dashboard.
        </p>
      )}
    </div>
  );
}
