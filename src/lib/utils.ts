// for shadcn dependecies

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getSteps = (instructions: string): string[] => {
  // Handle both uppercase STEP and lowercase step
  if (/step \d+/i.test(instructions)) {
    return instructions
      .split(/step \d+/i)
      .map(step => step.trim())
      .filter(step => step.length > 0)
  }

  // Split by newline and merge heading lines with content
  const lines = instructions
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

  const merged: string[] = []
  let current = ''

  for (const line of lines) {
    if (line.endsWith(':')) {
      current = line + ' '
    } else if (current) {
      merged.push(current + line)
      current = ''
    } else {
      merged.push(line)
    }
  }

  if (current) merged.push(current)

  return merged
}

// convert watch URL to embed URL
export const getYoutubeEmbedUrl = (url: string) => {
  const videoId = url.split('v=')[1]
  return `https://www.youtube.com/embed/${videoId}`
}