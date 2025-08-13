import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export const useDonations = () => {
  const [totalDonations, setTotalDonations] = useState(0)
  const [donationCount, setDonationCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDonationStats()
  }, [])

  const fetchDonationStats = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_donation_stats')
      
      if (error) {
        console.error('Error fetching donation stats:', error)
        return
      }

      if (data && data.length > 0) {
        const stats = data[0]
        setTotalDonations(Number(stats.total_donations) || 0)
        setDonationCount(Number(stats.donation_count) || 0)
      } else {
        setTotalDonations(0)
        setDonationCount(0)
      }
    } catch (error) {
      console.error('Error fetching donation stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitDonation = async (donation: {
    amount: number
    donor_name: string
    donor_email: string
    donor_phone?: string
    payment_method: string
  }) => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .insert([donation])
        .select()

      if (error) {
        console.error('Error submitting donation:', error)
        return { success: false, error: error.message }
      }

      // Refresh stats after successful donation
      await fetchDonationStats()
      
      return { success: true, data }
    } catch (error) {
      console.error('Error submitting donation:', error)
      return { success: false, error: 'An error occurred while submitting your donation' }
    }
  }

  return {
    totalDonations,
    donationCount,
    isLoading,
    submitDonation,
    refreshStats: fetchDonationStats
  }
}