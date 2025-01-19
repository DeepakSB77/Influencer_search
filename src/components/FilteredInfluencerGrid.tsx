'use client'

import React, { useState } from 'react'
import { FilterComponent } from './FilterComponent'
import { InfluencerGrid } from './influencerGrid'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Influencer {
  cid: string
  socialType: string
  name: string
  image: string
  url: string
  screenName: string
  usersCount: number
  avgER: number
  avgLikes: number
  avgComments: number
  avgViews: number
  qualityScore: number
  verified: boolean
  country: string
  gender: string
  age: string
  contactEmail: string
  pctFakeFollowers: number
  description: string
}

interface FilterParams {
  perPage: number
  page: number
  sort: string
  tags?: string
  locations?: string
  genders?: string
  ages?: string[]
  socialTypes?: string[]
  minUsersCount?: string
  maxUsersCount?: string
  minER?: string
  maxER?: string
  minQualityScore?: number
  maxQualityScore?: number
  isVerified?: boolean
  isContactEmail?: boolean
}

// Mock function to fetch influencers based on filters
const fetchInfluencers = async (filters: FilterParams) => {
  // This would be replaced with an actual API call
  console.log('Fetching influencers with filters:', filters)
  
  // Generate 100 mock influencers
  const allInfluencers = Array(100).fill(null).map((_, index) => ({
    cid: `INST:${index}`,
    socialType: ['INST', 'TW', 'FB', 'YT'][Math.floor(Math.random() * 4)],
    name: `Influencer ${index + 1}`,
    image: `https://picsum.photos/seed/${index}/100/100`,
    url: `https://instagram.com/influencer${index + 1}`,
    screenName: `influencer${index + 1}`,
    usersCount: Math.floor(Math.random() * 1000000) + 10000,
    avgER: Number((Math.random() * 10).toFixed(2)),
    avgLikes: Math.floor(Math.random() * 100000) + 1000,
    avgComments: Math.floor(Math.random() * 10000) + 100,
    avgViews: Math.floor(Math.random() * 1000000) + 10000,
    qualityScore: Math.random(),
    verified: Math.random() > 0.5,
    country: ['United States', 'UK', 'Canada', 'Australia', 'Germany'][Math.floor(Math.random() * 5)],
    gender: Math.random() > 0.5 ? 'm' : 'f',
    age: ['18-24', '25-34', '35-44'][Math.floor(Math.random() * 3)],
    contactEmail: Math.random() > 0.3 ? `influencer${index + 1}@example.com` : '',
    pctFakeFollowers: Math.random() * 0.5,
    description: `${Math.random() > 0.5 ? '🌟 ' : ''}Professional content creator specializing in ${
      ['fashion', 'tech', 'fitness', 'food', 'travel'][Math.floor(Math.random() * 5)]
    }. Based in ${['New York', 'London', 'Paris', 'Tokyo', 'Sydney'][Math.floor(Math.random() * 5)]}.`
  }))

  // Apply pagination
  const startIndex = (filters.page - 1) * filters.perPage
  const endIndex = startIndex + filters.perPage
  const paginatedInfluencers = allInfluencers.slice(startIndex, endIndex)

  // Simulate API response with total count
  return {
    influencers: paginatedInfluencers,
    totalCount: allInfluencers.length
  }
}

export function FilteredInfluencerGrid() {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const perPage = 16

  const handleApplyFilters = async (filters: FilterParams) => {
    setIsLoading(true)
    try {
      const { influencers: fetchedInfluencers, totalCount } = await fetchInfluencers({
        ...filters,
        page: currentPage,
        perPage
      })
      setInfluencers(fetchedInfluencers)
      setTotalPages(Math.ceil(totalCount / perPage))
    } catch (error) {
      console.error('Error fetching influencers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage)
    handleApplyFilters({
      page: newPage,
      perPage,
      sort: '-score'
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FilterComponent onApplyFilters={handleApplyFilters} />
      
      {isLoading ? (
        <div className="text-center py-8">
          <p>Loading influencers...</p>
        </div>
      ) : (
        <>
          <InfluencerGrid influencers={influencers} />
          {influencers.length > 0 && (
            <div className="mt-8 flex justify-center items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

