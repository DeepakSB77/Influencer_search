'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

interface FilterProps {
  onApplyFilters: (filters: FilterState) => void
}

interface FilterState {
  page: number
  perPage: number
  sort: string
  tags: string
  locations: string
  genders: string
  ages: string[]
  socialTypes: string[]
  minUsersCount: string
  maxUsersCount: string
  minER: string
  maxER: string
  minQualityScore: number
  maxQualityScore: number
  isVerified: boolean
  isContactEmail: boolean
  audienceLocations: string
  audienceGenders: string
  audienceAges: string[]
  minAudienceAge: string
  maxAudienceAge: string
  minLikes: string
  maxLikes: string
  minComments: string
  maxComments: string
  minVideoLikes: string
  maxVideoLikes: string
  minVideoComments: string
  maxVideoComments: string
  minVideoViews: string
  maxVideoViews: string
  minFakeFollowers: string
  maxFakeFollowers: string
  minInteractions: string
  maxInteractions: string
  minAudienceLocationsPercent: string
  minAudienceGendersPercent: string
  minAudienceAgePercent: string
  trackTotal: boolean
}

const socialTypeLabels: Record<string, string> = {
  'INST': 'Instagram',
  'FB': 'Facebook',
  'TW': 'Twitter',
  'YT': 'YouTube',
  'TT': 'TikTok',
  'TG': 'Telegram'
}

export function FilterComponent({ onApplyFilters }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    page: 1,
    perPage: 16,
    sort: '-score',
    tags: '',
    locations: '',
    genders: '',
    ages: [],
    socialTypes: [],
    minUsersCount: '',
    maxUsersCount: '',
    minER: '',
    maxER: '',
    minQualityScore: 0,
    maxQualityScore: 100,
    isVerified: false,
    isContactEmail: false,
    audienceLocations: '',
    audienceGenders: '',
    audienceAges: [],
    minAudienceAge: '',
    maxAudienceAge: '',
    minLikes: '',
    maxLikes: '',
    minComments: '',
    maxComments: '',
    minVideoLikes: '',
    maxVideoLikes: '',
    minVideoComments: '',
    maxVideoComments: '',
    minVideoViews: '',
    maxVideoViews: '',
    minFakeFollowers: '',
    maxFakeFollowers: '',
    minInteractions: '',
    maxInteractions: '',
    minAudienceLocationsPercent: '',
    minAudienceGendersPercent: '',
    minAudienceAgePercent: '',
    trackTotal: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFilters({ ...filters, [name]: value })
  }

  const handleMultiSelectChange = (name: 'ages' | 'socialTypes' | 'audienceAges', value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFilters({ ...filters, [name]: checked })
  }

  const handleApplyFilters = () => {
    onApplyFilters(filters)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
    >
      <h2 className="text-2xl font-bold mb-6">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="sort">Sort By</Label>
          <Select onValueChange={(value) => handleSelectChange('sort', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select sort option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-score">Relevance</SelectItem>
              <SelectItem value="-usersCount">Followers</SelectItem>
              <SelectItem value="-avgViews">Views</SelectItem>
              <SelectItem value="-avgER">Engagement Rate</SelectItem>
              <SelectItem value="-qualityScore">Quality Score</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input id="tags" name="tags" value={filters.tags} onChange={handleInputChange} placeholder="Enter tags" />
        </div>
        <div>
          <Label htmlFor="locations">Locations</Label>
          <Input id="locations" name="locations" value={filters.locations} onChange={handleInputChange} placeholder="Enter locations" />
        </div>
        <div>
          <Label htmlFor="genders">Gender</Label>
          <Select onValueChange={(value) => handleSelectChange('genders', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="m">Male</SelectItem>
              <SelectItem value="f">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Age Ranges</Label>
          <div className="flex flex-wrap gap-2">
            {['0_18', '18_21', '21_24', '24_27', '27_30', '30_35', '35_45', '45+'].map((age) => (
              <Button
                key={age}
                variant={filters.ages.includes(age) ? "default" : "outline"}
                size="sm"
                onClick={() => handleMultiSelectChange('ages', age)}
              >
                {age.replace('_', '-')}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label>Social Types</Label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(socialTypeLabels).map(([type, label]) => (
              <Button
                key={type}
                variant={filters.socialTypes.includes(type) ? "default" : "outline"}
                size="sm"
                onClick={() => handleMultiSelectChange('socialTypes', type)}
                title={label}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="minUsersCount">Min Followers</Label>
          <Input
            id="minUsersCount"
            name="minUsersCount"
            type="number"
            value={filters.minUsersCount}
            onChange={handleInputChange}
            placeholder="Min followers"
          />
        </div>
        <div>
          <Label htmlFor="maxUsersCount">Max Followers</Label>
          <Input
            id="maxUsersCount"
            name="maxUsersCount"
            type="number"
            value={filters.maxUsersCount}
            onChange={handleInputChange}
            placeholder="Max followers"
          />
        </div>
        <div>
          <Label htmlFor="minER">Min Engagement Rate</Label>
          <Input
            id="minER"
            name="minER"
            type="number"
            step="0.01"
            value={filters.minER}
            onChange={handleInputChange}
            placeholder="Min ER"
          />
        </div>
        <div>
          <Label htmlFor="maxER">Max Engagement Rate</Label>
          <Input
            id="maxER"
            name="maxER"
            type="number"
            step="0.01"
            value={filters.maxER}
            onChange={handleInputChange}
            placeholder="Max ER"
          />
        </div>
        <div>
          <Label>Quality Score Range</Label>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[filters.minQualityScore, filters.maxQualityScore]}
            onValueChange={(value) => {
              setFilters({
                ...filters,
                minQualityScore: value[0],
                maxQualityScore: value[1]
              })
            }}
            className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
          />
          <div className="flex justify-between mt-2">
            <span>{filters.minQualityScore}%</span>
            <span>{filters.maxQualityScore}%</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="isVerified"
              checked={filters.isVerified}
              onCheckedChange={(checked) => handleSwitchChange('isVerified', checked)}
            />
            <Label htmlFor="isVerified">Verified Accounts Only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isContactEmail"
              checked={filters.isContactEmail}
              onCheckedChange={(checked) => handleSwitchChange('isContactEmail', checked)}
            />
            <Label htmlFor="isContactEmail">Email Contact</Label>
          </div>
        </div>
        <div>
          <Label htmlFor="audienceLocations">Audience Locations</Label>
          <Input
            id="audienceLocations"
            name="audienceLocations"
            value={filters.audienceLocations}
            onChange={handleInputChange}
            placeholder="Enter audience locations"
          />
        </div>
        <div>
          <Label htmlFor="audienceGenders">Audience Gender</Label>
          <Select onValueChange={(value) => handleSelectChange('audienceGenders', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select audience gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="m">Male</SelectItem>
              <SelectItem value="f">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Audience Age Ranges</Label>
          <div className="flex flex-wrap gap-2">
            {['0_18', '18_21', '21_24', '24_27', '27_30', '30_35', '35_45', '45+'].map((age) => (
              <Button
                key={age}
                variant={filters.audienceAges.includes(age) ? "default" : "outline"}
                size="sm"
                onClick={() => handleMultiSelectChange('audienceAges', age)}
              >
                {age.replace('_', '-')}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label>Engagement Metrics</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="minLikes"
              value={filters.minLikes}
              onChange={handleInputChange}
              placeholder="Min Likes"
            />
            <Input
              name="maxLikes"
              value={filters.maxLikes}
              onChange={handleInputChange}
              placeholder="Max Likes"
            />
            <Input
              name="minComments"
              value={filters.minComments}
              onChange={handleInputChange}
              placeholder="Min Comments"
            />
            <Input
              name="maxComments"
              value={filters.maxComments}
              onChange={handleInputChange}
              placeholder="Max Comments"
            />
          </div>
        </div>
        <div>
          <Label>Video Metrics</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="minVideoViews"
              value={filters.minVideoViews}
              onChange={handleInputChange}
              placeholder="Min Views"
            />
            <Input
              name="maxVideoViews"
              value={filters.maxVideoViews}
              onChange={handleInputChange}
              placeholder="Max Views"
            />
          </div>
        </div>
        <div>
          <Label>Audience Quality</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="minFakeFollowers"
              value={filters.minFakeFollowers}
              onChange={handleInputChange}
              placeholder="Min Fake Followers %"
            />
            <Input
              name="maxFakeFollowers"
              value={filters.maxFakeFollowers}
              onChange={handleInputChange}
              placeholder="Max Fake Followers %"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="trackTotal"
            checked={filters.trackTotal}
            onCheckedChange={(checked) => handleSwitchChange('trackTotal', checked)}
          />
          <Label htmlFor="trackTotal">Track Total</Label>
        </div>
      </div>
      <Button className="mt-6" onClick={handleApplyFilters}>Apply Filters</Button>
    </motion.div>
  )
}

