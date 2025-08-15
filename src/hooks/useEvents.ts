import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export const useEvents = () => {
  const [events, setEvents] = useState<any[]>([])
  const [eventStats, setEventStats] = useState({
    totalEvents: 0,
    totalPeopleReached: 0,
    totalAttendees: 0,
    latestEventDate: null
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
    fetchEventStats()
  }, [])

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false })
      
      if (error) {
        console.error('Error fetching events:', error)
        return
      }

      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchEventStats = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_event_stats')
      
      if (error) {
        console.error('Error fetching event stats:', error)
        return
      }

      if (data && data.length > 0) {
        const stats = data[0]
        setEventStats({
          totalEvents: Number(stats.total_events) || 0,
          totalPeopleReached: Number(stats.total_people_reached) || 0,
          totalAttendees: Number(stats.total_attendees) || 0,
          latestEventDate: stats.latest_event_date
        })
      }
    } catch (error) {
      console.error('Error fetching event stats:', error)
    }
  }

  const submitEvent = async (event: {
    title: string
    description?: string
    event_date: string
    location?: string
    attendees: number
    people_reached: number
    event_type: string
    outcomes?: string
  }) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([event])
        .select()

      if (error) {
        console.error('Error submitting event:', error)
        return { success: false, error: error.message }
      }

      // Refresh events and stats after successful submission
      await fetchEvents()
      await fetchEventStats()
      
      return { success: true, data }
    } catch (error) {
      console.error('Error submitting event:', error)
      return { success: false, error: 'An error occurred while submitting the event' }
    }
  }

  return {
    events,
    eventStats,
    isLoading,
    submitEvent,
    refreshEvents: fetchEvents,
    refreshStats: fetchEventStats
  }
}