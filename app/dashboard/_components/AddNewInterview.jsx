"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation'




function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState("")
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperiance, setJobExperiance] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();
  

  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperiance)

    const InputPrompt = "Job position : " + jobPosition + ", Job Description: " + jobDesc + ", Years Of Experiance:" + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + ", Depends on this information please give me a five interview questions with  answered in json format give question and answer as field in json."

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);
    if (MockJsonResp) {


      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp:MockJsonResp,
        jobPosition:jobPosition,
        jobDesc:jobDesc,
        jobExperiance:jobExperiance,
        createdBy:user?.primaryEmailAddress.emailAddress,
        createdAt:moment().format("DD-MM-YYYY")
      }).returning({ mockId:MockInterview.mockId })
      console.log("Id Created", resp)
      if(resp){
        setOpenDialog(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      }
    }
     else {
      console.log("Error in json response")
    }
    setLoading(false);
  }

  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl" >
          <DialogHeader>
            <DialogTitle className='text-2xl'>Tell us more about your job interview</DialogTitle>
            <DialogDescription>

              <form onSubmit={onSubmit}>
                <div>
                  <h2>Add details about your job position / role</h2>
                  <div className='mt-7 my-3'>
                    <label>Job role / Job position</label>
                    <Input placeholder="Ex.full stack developer" required onChange={(e) => setJobPosition(e.target.value)} />
                  </div>
                  <div className='mt-7 my-3'>
                    <label>Job Description / Tech stack (In Short )</label>
                    <Textarea placeholder="Ex.React, Angular, Nodejs, Mysql etc" required onChange={(e) => setJobDesc(e.target.value)} />
                  </div>
                  <div className='my-3'>
                    <label>Years of experiance</label>
                    <Input placeholder="Ex.5" type="number" max='50' required onChange={(e) => setJobExperiance(e.target.value)} />
                  </div>
                </div>
                <div className='flex gap-5 justify-end'>
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)} >cancel</Button>
                  <Button type="submit" disabled={loading} >
                    {loading?
                      <>
                        <LoaderCircle className='animate-spin' />'Generating AI Interview'
                      </> : 'Start Interview'
                    }
                    </Button>
                </div>
              </form>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddNewInterview