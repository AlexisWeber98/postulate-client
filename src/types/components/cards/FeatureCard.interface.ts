import { ReactNode } from 'react'

export interface FeatureCard {
  id?: number
  icon: ReactNode
  title: string
  desc: string
}
