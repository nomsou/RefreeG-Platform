"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { MainCauseCard } from "@/components/CauseCard";
import { useState, useEffect } from "react";
import { causesData } from "@/lib/dummyData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Cause } from "@/lib/type";
import { getDaysLeft } from "@/lib/utils";

export const DonationCarousel = ({ causes }: { causes: Cause[] }) => {
  // const mainCause = {
  //   ...causesData[0],
  //   description: causesData[0].description || "",
  // }; // Ensure description is defined
  // const otherCauses = causesData.slice(1);
  const [api, setApi] = useState<CarouselApi>();
  const [mobileApi, setMobileApi] = useState<CarouselApi>();

  const handleNext = () => {
    if (api) {
      api.scrollNext(); // Scroll desktop carousel
    }
    if (mobileApi) {
      mobileApi.scrollNext(); // Scroll mobile carousel
    }
  };

  const handlePrevious = () => {
    if (api) {
      api.scrollPrev(); // Scroll desktop carousel
    }
    if (mobileApi) {
      mobileApi.scrollPrev(); // Scroll mobile carousel
    }
  };

  // Group causes into chunks of 4 (2x2 grid per slide)
  const groupedCauses = [];
  for (let i = 0; i < causes.length; i += 4) {
    groupedCauses.push(causes.slice(i, i + 4));
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* <div className="w-full lg:w-[50%]">
                    <MainCauseCard {...mainCause} />
                </div> */}

        {/* Other Cause Cards */}
        <div className="w-full lg:w-[100%]">
          {/* Mobile: Single Column Carousel */}
          <div className="md:hidden">
            <Carousel setApi={setMobileApi}>
              <CarouselContent>
                {causes.map((cause) => (
                  <CarouselItem key={cause.id} className="basis-full">
                    <MainCauseCard
                      {...cause}
                      isBookmarked={cause.isBookmarked ?? false}
                      onRemoveBookmark={cause.onRemoveBookmark ?? (() => {})}
                      daysLeft={getDaysLeft(cause.deadline)}
                      progressPercentage={
                        (cause.raisedAmount / cause.goalAmount) * 100
                      }
                      hideDescription
                      hideTags
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Larger Screens: 2x2 Grid Carousel */}
          <div className="hidden md:block">
            <Carousel setApi={setApi}>
              <CarouselContent>
                {groupedCauses.map((group, groupIndex) => (
                  <CarouselItem key={groupIndex} className="basis-full">
                    <div className="grid grid-cols-4 grid-rows-1 gap-6">
                      {group.map((cause) => (
                        <MainCauseCard
                          {...cause}
                          key={cause.id}
                          isBookmarked={cause.isBookmarked ?? false}
                          onRemoveBookmark={
                            cause.onRemoveBookmark ?? (() => {})
                          }
                          daysLeft={getDaysLeft(cause.deadline)}
                          progressPercentage={
                            (cause.raisedAmount / cause.goalAmount) * 100
                          }
                          hideDescription
                          hideTags
                        />
                      ))}

                      {Array.from({ length: 4 - group.length }).map(
                        (_, index) => (
                          <div
                            key={`empty-${index}`}
                            className="w-full"
                            aria-hidden="true"
                          />
                        )
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className=" flex justify-center md:justify-end">
        <Button
          variant={"link"}
          className=" text-black"
          onClick={handlePrevious}
        >
          <ChevronLeft size={24} />
        </Button>
        <Button variant={"link"} className=" text-black" onClick={handleNext}>
          <ChevronRight size={24} />
        </Button>
      </div>
    </>
  );
};
