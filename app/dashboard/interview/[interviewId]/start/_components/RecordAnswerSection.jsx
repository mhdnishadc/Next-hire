"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { chatSession } from '@/utils/GeminiAIModel'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { is } from 'drizzle-orm'
import { StopCircle, Webcam } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner'








function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser()
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      useEffect(() => {
        results.map((results)=>(
          setUserAnswer(prevAns=>prevAns+results?.transcript)

        ))
        
      }, [results])

      useEffect(() => {
        if(!isRecording && userAnswer.length>10)
          {
          UpdateUserAnswer()
        }

      },[userAnswer])

      const StartStopRecording = async() => {
        if(isRecording){
          
          stopSpeechToText();
        }
        else{
          startSpeechToText();
        }
      }

      const UpdateUserAnswer=async()=>{
        console.log(userAnswer);
        
        setLoading(true);
        const feedbackPrompt ="Question:"+mockInterviewQuestion?.[activeQuestionIndex]?.question+ 
           ", UserAnswer:"+userAnswer+", Depends on question and user answer for give interview question "+
           "Please give as rating for answer and feedback as area of improvement if any"+
           "in just 2 to 5 lines improve it in JSON format with rating field and feedback field;"

           const result = await chatSession.sendMessage(feedbackPrompt)
           const mockJsonResp =(result.response.text()).replace('```json', '').replace('```', '');
           console.log(mockJsonResp);
           const JsonFeedbackResp = JSON.parse(mockJsonResp);

           const resp = await db.insert(UserAnswer).values({
            mockIdRef:interviewData?.mockId,
            question:mockInterviewQuestion?.[activeQuestionIndex]?.question,
            correctAns:mockInterviewQuestion?.[activeQuestionIndex]?.answer,
            userAns:userAnswer,
            feedback:JsonFeedbackResp?.feedback,
            rating:JsonFeedbackResp?.rating,
            userEmail:user?.primaryEmailAddress.emailAddress,
            createdAt:moment().format("DD-MM-yyyy")
           })
           if(resp)
            {
            toast('User Answer saved successfully') 
            setUserAnswer('');
            setResults([]);
          }
          setResults([]);
         
          setLoading(false);
      }

  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg'>
        <Image className='absolute' src={'/webcam.png'} width={200} height={200}  alt='image'/>
        <Webcam 
        mirrored={true}
        style={{
            height:300,
            width:'100%',
            zindex:10,
          
        }}/>
    </div>
    <Button disabled={loading}
    variant="outline" className="my-10"
    onClick={StartStopRecording}>
    {isRecording?
    <h2 className='text-red-600 animate-pulse flex gap-2'>
        <StopCircle/>  Stop Recording
    </h2>
   :
       'Record Answer' }</Button>


    </div>
  )
}

export default RecordAnswerSection