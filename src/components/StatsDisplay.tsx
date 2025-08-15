import { useEvents } from '@/hooks/useEvents';
import { useDonations } from '@/hooks/useDonations';

const StatsDisplay = () => {
  const { eventStats, isLoading: eventsLoading } = useEvents();
  const { donationCount, isLoading: donationsLoading } = useDonations();

  if (eventsLoading || donationsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-3xl font-bold text-white mb-2">...</div>
          <div className="text-white/90">Events Hosted</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-white mb-2">...</div>
          <div className="text-white/90">People Reached</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-white mb-2">...</div>
          <div className="text-white/90">Community Supporters</div>
        </div>
      </div>
    );
  }

  // Realistic stats for a new 2025 NPO
  const displayStats = {
    events: eventStats.totalEvents || 0,
    peopleReached: eventStats.totalPeopleReached || 0,
    supporters: donationCount || 0
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div>
        <div className="text-3xl font-bold text-white mb-2">{displayStats.events}</div>
        <div className="text-white/90">Events Hosted</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-white mb-2">{displayStats.peopleReached}</div>
        <div className="text-white/90">People Reached</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-white mb-2">{displayStats.supporters}</div>
        <div className="text-white/90">Community Supporters</div>
      </div>
    </div>
  );
};

export default StatsDisplay;