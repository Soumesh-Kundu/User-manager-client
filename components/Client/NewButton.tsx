"use client"
import { Button } from "../ui/button";
import { useFormContext } from "../Context";
export default function NewButton() {
    const {setFormOpen,setFormData}=useFormContext()
  return (
    <Button onClick={()=>{
        setFormData()
        setFormOpen(true)
    }}>
        New
    </Button>
  )
}
