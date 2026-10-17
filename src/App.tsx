/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { SAMPLE_EVENTS } from './data/sampleEvents';
import { filterEvents } from './utils/filterEvents';
import { LocationSelection, EventCategory, StructuredEvent, TicketTier } from './types';
import { AuthMode } from './types/auth';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { EventGrid } from './components/EventGrid';
import { LocationModal } from './components/LocationModal';
import { EventDetailsModal } from './components/EventDetailsModal';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { WalkthroughGuideModal } from './components/WalkthroughGuideModal';
import { AuthModal } from './components/AuthModal';
import { MyTicketsModal } from './components/MyTicketsModal';
import { Footer } from './components/Footer';

function MainApp() {
  const { user } = useAuth();

  // Primary Discovery Filters State
  const [currentLocation, setCurrentLocation] = useState<LocationSelection>({
    state: 'Lagos',
    neighbourhood: 'Ikeja', // Default to Ikeja to immediately demonstrate neighbourhood precision!
  });
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<EventCategory>('All');

  // Modal / Screen States
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isWalkthroughModalOpen, setIsWalkthroughModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<StructuredEvent | null>(null);

  // Auth Modal State
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: AuthMode;
  }>({
    isOpen: false,
    mode: 'signup',
  });

  // My Tickets Modal State
  const [isMyTicketsOpen, setIsMyTicketsOpen] = useState(false);

  // Sync user's preferred location if they log in and have one
  useEffect(() => {
    if (user?.preferredLocation) {
      setCurrentLocation(user.preferredLocation);
    }
  }, [user]);

  // Booking Flow State (Screen 5 CTA)
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    isOpen: boolean;
    event: StructuredEvent | null;
    tier: TicketTier | null;
    quantity: number;
  }>({
    isOpen: false,
    event: null,
    tier: null,
    quantity: 1,
  });

  // Filter Computation Engine
  const filterResult = useMemo(() => {
    return filterEvents(SAMPLE_EVENTS, {
      query,
      category,
      location: currentLocation,
      dateRange: 'all',
    });
  }, [query, category, currentLocation]);

  // Handlers
  const handleSelectNeighbourhood = (name: string | null) => {
    setCurrentLocation((prev) => ({
      ...prev,
      neighbourhood: name,
    }));
  };

  const handleSelectState = (state: any) => {
    setCurrentLocation({
      state,
      neighbourhood: null,
    });
  };

  const handleApplyLocation = (newLoc: LocationSelection) => {
    setCurrentLocation(newLoc);
  };

  const handleBroadenLocation = () => {
    setCurrentLocation((prev) => ({
      ...prev,
      neighbourhood: null,
    }));
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  const handleResetAllFilters = () => {
    setQuery('');
    setCategory('All');
    setCurrentLocation({
      state: 'Lagos',
      neighbourhood: null,
    });
  };

  const handleStartBooking = (
    event: StructuredEvent,
    selectedTier: TicketTier,
    quantity: number
  ) => {
    // Close event details and open the simulated confirmation voucher
    setSelectedEvent(null);
    setBookingConfirmation({
      isOpen: true,
      event,
      tier: selectedTier,
      quantity,
    });
  };

  // Walkthrough Guide Scenario Quick-Runner
  const handleApplyScenario = (
    location: LocationSelection,
    newQuery: string,
    newCategory: EventCategory
  ) => {
    setCurrentLocation(location);
    setQuery(newQuery);
    setCategory(newCategory);
  };

  const handleOpenAuth = (mode: AuthMode) => {
    setAuthModal({
      isOpen: true,
      mode,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Top Bar Navigation (Strict 3-zone contract with Sign In / Sign Up & Location) */}
      <Header
        currentLocation={currentLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenWalkthroughModal={() => setIsWalkthroughModalOpen(true)}
        onSelectCategory={setCategory}
        activeCategory={category}
        onOpenAuthModal={handleOpenAuth}
        onOpenMyTickets={() => setIsMyTicketsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Screen 1: Event Discovery Home Search & Category Segment */}
        <HeroSearch
          query={query}
          onQueryChange={setQuery}
          selectedCategory={category}
          onSelectCategory={setCategory}
          currentLocation={currentLocation}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
          totalResults={filterResult.totalMatches}
        />

        {/* Screen 3 & 4: Location-Based Results & Empty State Handling */}
        <EventGrid
          events={filterResult.events}
          currentLocation={currentLocation}
          onSelectNeighbourhood={handleSelectNeighbourhood}
          onSelectState={handleSelectState}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
          onSelectEvent={(event) => setSelectedEvent(event)}
          query={query}
          onClearQuery={handleClearQuery}
          category={category}
          onSelectCategory={setCategory}
          onResetAllFilters={handleResetAllFilters}
          onBroadenLocation={handleBroadenLocation}
        />

      </main>

      {/* Screen 2: Granular Location Selector Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onApplyLocation={handleApplyLocation}
      />

      {/* Screen 5: Event Details View */}
      <EventDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onStartBooking={handleStartBooking}
        onOpenAuthModal={handleOpenAuth}
      />

      {/* Booking Confirmation Ticket Stub Modal */}
      <BookingConfirmationModal
        isOpen={bookingConfirmation.isOpen}
        onClose={() =>
          setBookingConfirmation({
            isOpen: false,
            event: null,
            tier: null,
            quantity: 1,
          })
        }
        event={bookingConfirmation.event}
        selectedTier={bookingConfirmation.tier}
        quantity={bookingConfirmation.quantity}
        onOpenAuthModal={handleOpenAuth}
      />

      {/* Auth Modal: Sign In / Sign Up with Email & Password or Google ID */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* My Tickets & Digital Passes Modal */}
      <MyTicketsModal
        isOpen={isMyTicketsOpen}
        onClose={() => setIsMyTicketsOpen(false)}
        onExploreEvents={() => setIsMyTicketsOpen(false)}
      />

      {/* Product Review Walkthrough Modal */}
      <WalkthroughGuideModal
        isOpen={isWalkthroughModalOpen}
        onClose={() => setIsWalkthroughModalOpen(false)}
        onApplyScenario={handleApplyScenario}
      />

      {/* Site Footer */}
      <Footer
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenWalkthroughModal={() => setIsWalkthroughModalOpen(true)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
