"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

function page() {
  useRouter().push('/')
}

export default page