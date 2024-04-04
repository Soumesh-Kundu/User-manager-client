"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@radix-ui/react-dialog";
import { useFormContext } from "../Context";
import { Button } from "../ui/button";
import { useState } from "react";
import Loader from "../Loader";

export default function MessageBox() {
  const { isMessageOpen, setMessageOpen } = useFormContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  async function onYes() {
    setLoading(true);
    await isMessageOpen.handle();
    setMessageOpen({ type: null, isOpen: false, handle: () => {} });
    setLoading(false);
  }
  const type = isMessageOpen.type === "delete" ? "destructive" : "default";
  return (
    <>
      <Dialog open={isMessageOpen.isOpen}>
        <DialogPortal>
          <DialogOverlay className="bg-black/30 backdrop-blur-sm fixed top-0 w-full h-screen">
            <DialogContent className="bg-white text-lg md:text-base border-none rounded-md p-4 scale-x-95 md:scale-100 w-full sm:w-1/2 lg:w-1/4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !z-[100] flex  flex-col items-center py-8 gap-3">
              {isLoading ? (
                <div className="flex items-center gap-8 flex-col">
                  <Loader />
                  <div className="">
                    <span className="mr-1">Please wait </span>
                    <l-bouncy size={15} speed={1.6} color="black"></l-bouncy>
                  </div>
                </div>
              ) : (
                <>
                  <p>Are you sure to {isMessageOpen.type} ?</p>
                  <div className="w-full flex items-center justify-evenly mt-5">
                    <Button variant={type} className="px-7" onClick={onYes}>
                      {isMessageOpen.type === "delete" ? "Delete" : "Yes"}
                    </Button>
                    <Button
                      onClick={() => {
                        setMessageOpen({
                          type: null,
                          isOpen: false,
                          handle: () => {},
                        });
                      }}
                      variant="outline"
                      className="border-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </>
  );
}
