"use client"
import { useRouter } from 'next/navigation'

function Page() {
  useRouter().push('/')
}

export default Page