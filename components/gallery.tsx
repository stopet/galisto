"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Sample gallery data
const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 1",
    width: 400,
    height: 200,
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 2",
   width: 400,
       height: 200,
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 3",
   width: 400,
       height: 200,
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 4",
    width: 400,
        height: 200,
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 5",
    width: 400,
        height: 200,
  },
  {
    id: 6,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 6",
    width: 800,
    height: 600,
  },
  {
    id: 7,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 7",
    width: 800,
    height: 600,
  },
  {
    id: 8,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 8",
    width: 800,
    height: 600,
  },
  {
    id: 9,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 9",
    width: 800,
    height: 600,
  },
  {
    id: 10,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 10",
    width: 800,
    height: 600,
  },
  {
    id: 11,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 11",
    width: 800,
    height: 600,
  },
  {
    id: 12,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 12",
    width: 800,
    height: 600,
  },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const imagesPerPage = 12
  const totalPages = Math.ceil(galleryImages.length / imagesPerPage)

  const openLightbox = (id: number) => {
    setSelectedImage(id)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  // Get current images
  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = galleryImages.slice(indexOfFirstImage, indexOfLastImage)

  const currentImage = galleryImages.find((img) => img.id === selectedImage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {currentImages.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => openLightbox(image.id)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) handlePageChange(currentPage - 1)
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1
            // Show first page, last page, and pages around current page
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(page)
                    }}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            }

            // Add ellipsis if there's a gap
            if ((page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2)) {
              return (
                <PaginationItem key={`ellipsis-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return null
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) handlePageChange(currentPage + 1)
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Lightbox */}
      {selectedImage && currentImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
            <div className="relative w-full max-h-[80vh]">
              <Image
                src={currentImage.src || "/placeholder.svg"}
                alt={currentImage.alt}
                width={currentImage.width}
                height={currentImage.height}
                className="mx-auto max-h-[80vh] w-auto object-contain"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
