'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect } from 'react'

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() =>
    console.error(error)
    , [error])

  return (
    <div className='flex w-full h-full flex-col items-center justify-center gap-6'>
      <h2 className='text-destructive text-4xl'>
        Something went wrong...
      </h2>
      <Button>
        <Link href='/'>Go back to home page</Link>
      </Button>
    </div>
  )
}

export default ErrorPage