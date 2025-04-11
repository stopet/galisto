"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
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
    src: "/images/gallery/304.jpg?height=600&width=800",
    alt: "Gallery image 1",
    width: 400,
    height: 200,
  },
  {
    id: 2,
    src: "/images/gallery/106.jpg?height=600&width=800",
    alt: "Gallery image 2",
   width: 400,
       height: 200,
  },
  {
    id: 3,
    src: "/images/gallery/300.jpg?height=600&width=800",
    alt: "Gallery image 3",
   width: 400,
       height: 200,
  },
  {
    id: 4,
    src: "/images/gallery/105.jpg?height=600&width=800",
    alt: "Gallery image 4",
    width: 400,
        height: 200,
  },
  {
    id: 5,
    src: "/images/gallery/301.jpg?height=600&width=800",
    alt: "Gallery image 5",
    width: 400,
        height: 200,
  },
  {
    id: 6,
    src: "/images/gallery/95.jpg?height=600&width=800",
    alt: "Gallery image 6",
    width: 800,
    height: 600,
  },
  {
    id: 7,
    src: "/images/gallery/94.jpg?height=600&width=800",
    alt: "Gallery image 7",
    width: 800,
    height: 600,
  },
  {
    id: 8,
    src: "/images/gallery/303.jpg?height=600&width=800",
    alt: "Gallery image 8",
    width: 800,
    height: 600,
  },
  {
    id: 9,
    src: "/images/gallery/92.jpg?height=600&width=800",
    alt: "Gallery image 9",
    width: 800,
    height: 600,
  },
  {
    id: 10,
    src: "/images/gallery/94.jpg?height=600&width=800",
    alt: "Gallery image 10",
    width: 800,
    height: 600,
  },
  {
    id: 11,
    src: "/images/gallery/94.jpg?height=600&width=800",
    alt: "Gallery image 11",
    width: 800,
    height: 600,
  },
  {
    id: 12,
    src: "/images/gallery/94.jpg?height=600&width=800",
    alt: "Gallery image 12",
    width: 800,
    height: 600,
  },
  {
      id: 13,
      src: "/images/gallery/94.jpg?height=600&width=800",
      alt: "Gallery image 12",
      width: 800,
      height: 600,
    },
    {
        id: 14,
        src: "/images/gallery/94.jpg?height=600&width=800",
        alt: "Gallery image 12",
        width: 800,
        height: 600,
      },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const imagesPerPage = 20
  const totalPages = Math.ceil(galleryImages.length / imagesPerPage)

  const openLightbox = (id: number) => {
    setSelectedImage(id)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  // Get current images for pagination
  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = galleryImages.slice(indexOfFirstImage, indexOfLastImage)

  // Find the current image for the lightbox
  const currentImageIndex = selectedImage ? galleryImages.findIndex((img) => img.id === selectedImage) : -1
  const currentImage = currentImageIndex !== -1 ? galleryImages[currentImageIndex] : null

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Navigation functions for lightbox
  const goToPrevImage = useCallback(() => {
    if (currentImageIndex > 0) {
      setSelectedImage(galleryImages[currentImageIndex - 1].id)
    } else {
      // Wrap around to the last image
      setSelectedImage(galleryImages[galleryImages.length - 1].id)
    }
  }, [currentImageIndex])

  const goToNextImage = useCallback(() => {
    if (currentImageIndex < galleryImages.length - 1) {
      setSelectedImage(galleryImages[currentImageIndex + 1].id)
    } else {
      // Wrap around to the first image
      setSelectedImage(galleryImages[0].id)
    }
  }, [currentImageIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return

      if (e.key === "ArrowLeft") {
        goToPrevImage()
      } else if (e.key === "ArrowRight") {
        goToNextImage()
      } else if (e.key === "Escape") {
        closeLightbox()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, goToPrevImage, goToNextImage])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentImages.map((image) => (
          <div
            key={image.id}
            className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
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
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Previous button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 md:left-4 z-10 text-white hover:bg-white/20 rounded-full h-10 w-10"
              onClick={goToPrevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Image container */}
            <div className="relative w-full max-w-4xl max-h-[90vh] px-12 md:px-16">
              <Image
                src={currentImage.src || "/placeholder.svg"}
                alt={currentImage.alt}
                width={currentImage.width}
                height={currentImage.height}
                className="mx-auto max-h-[80vh] w-auto object-contain"
              />

              {/* Image counter */}
              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Next button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 md:right-4 z-10 text-white hover:bg-white/20 rounded-full h-10 w-10"
              onClick={goToNextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
