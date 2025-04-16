"use client"

import Image from "next/image"
import { CalendarIcon, MapPinIcon, TagIcon, UserIcon, WalletIcon } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface DetailCardProps {
  image: string
  title: string
  price: string
  location: string
  date: string
  category: string
  owner: string
  actionLabel?: string
  onAction?: () => void
}

export function DetailCard({
  image,
  title,
  price,
  location,
  date,
  category,
  owner,
  actionLabel,
//   onAction,
}: DetailCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>
      {/* <CardHeader className="p-6">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>
          <p className="text-xl font-bold text-primary">{price}</p>
        </div>
      </CardHeader> */}
      <CardContent className="p-4 pt-0">
        <div className="grid gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span><b>Worker name:</b> {"John Doe"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span><b>Desk no:</b> {"5"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span><b>Sitting Duration:</b> {"80.56"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span><b>Login time:</b> {"12:00 PM"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span><b>Logout time:</b> {"01:00 PM"}</span>
          </div>
        </div>
      </CardContent>
      {/* {actionLabel && (
        <>
          <Separator />
          <CardFooter className="p-6">
            <button
            //   onClick={onAction}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {actionLabel}
            </button>
          </CardFooter>
        </>
      )} */}
    </Card>
  )
}
