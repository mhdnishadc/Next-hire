import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {
    const router = useRouter();
    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
    }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-blue-700'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview?.jobExperiance} Years of experiance</h2>
        <h2 className='text-xs text-gray-500'>Created At:{interview?.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-5'>
            <Button className="flex-1" size="sm" variant="outline" onClick={onFeedbackPress} >Feedback</Button>
            <Button className="bg-blue-800 flex-1" size="sm" onClick={onStart} >Start</Button>
        </div>

    </div>
  )
}

export default InterviewItemCard