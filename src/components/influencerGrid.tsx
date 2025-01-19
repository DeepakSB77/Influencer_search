'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Facebook, Youtube, MessageCircle, Heart, Eye, Star } from 'lucide-react'

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
  avgViews: number | null
  qualityScore: number
  verified: boolean
  country: string
  gender: string
  age: string
  contactEmail: string
  pctFakeFollowers: number
  description: string
}

const InfluencerCard: React.FC<{ influencer: Influencer }> = ({ influencer }) => {
  const getSocialIcon = (socialType: string) => {
    switch (socialType) {
      case 'INST':
        return <Instagram className="w-5 h-5" />
      case 'TW':
        return <Twitter className="w-5 h-5" />
      case 'FB':
        return <Facebook className="w-5 h-5" />
      case 'YT':
        return <Youtube className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={influencer.image} alt={influencer.name} />
              <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{influencer.name}</CardTitle>
              <p className="text-sm text-muted-foreground">@{influencer.screenName}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center space-x-2 mb-2">
            {getSocialIcon(influencer.socialType)}
            <Badge variant={influencer.verified ? "default" : "secondary"}>
              {influencer.verified ? "Verified" : "Not Verified"}
            </Badge>
          </div>
          <p className="text-sm mb-2 line-clamp-2">{influencer.description}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{influencer.usersCount.toLocaleString()} followers</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{influencer.avgLikes.toLocaleString()} likes</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{influencer.avgViews?.toLocaleString() || 'N/A'} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{(influencer.qualityScore * 100).toFixed(1)}% quality</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {influencer.country}, {influencer.gender}, {influencer.age}
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={influencer.url} target="_blank" rel="noopener noreferrer">View Profile</a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

interface InfluencerGridProps {
  influencers: Influencer[]
}

export function InfluencerGrid({ influencers }: InfluencerGridProps) {
  if (influencers.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No influencers found matching the current filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {influencers.map((influencer) => (
        <InfluencerCard key={influencer.cid} influencer={influencer} />
      ))}
    </div>
  )
}

