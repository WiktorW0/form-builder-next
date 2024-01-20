import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { MdOutlinePublish } from 'react-icons/md'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { FaSpinner } from 'react-icons/fa'
import { toast } from './ui/use-toast'
import { PublishForm } from '@/actions/form'
import { useRouter } from 'next/navigation'

const PublishFormBtn = ({ id }: { id: number }) => {
  const [loading, startTransition] = useTransition()
  const router = useRouter()
  const publishingForm = async () => {
    try {
      await PublishForm(id)
      toast({
        title: 'Success',
        description: 'Your form is now available to the public.'
      })
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong'
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'outline'} className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400'>
          <MdOutlinePublish className='h-4 w-4' />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able to edit this form. <br /> <br />
            <span className="font-medium">By publishing this form you will make it available to the public and you will be able to collect submissions.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={(e) => {
            e.preventDefault()
            startTransition(publishingForm)
          }}><span>Proceed </span> {loading && <FaSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PublishFormBtn