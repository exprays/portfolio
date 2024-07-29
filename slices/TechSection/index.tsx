"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { MdCircle } from "react-icons/md";

import Bounded from "@/components/bounded";
import Heading from "@/components/texts/heading";

gsap.registerPlugin(ScrollTrigger);
/**
 * Props for `TechSection`.
 */
export type TechSectionProps = SliceComponentProps<Content.TechSectionSlice>;

/**
 * Component for "TechSection" Slices.
 */
const TechSection = ({ slice }: TechSectionProps): JSX.Element => {

  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          markers: false,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        }
      });

      tl.fromTo(
        ".tech-item-row",
        {
          x: (index) => {
            return index % 2 === 0 
            ? gsap.utils.random(600, 400)
            : gsap.utils.random(-600, -400)
          }
        },
        {
          x: (index) => {
            return index % 2 === 0 
            ? gsap.utils.random(-600, -400)
            : gsap.utils.random(600, 400)
          },
          ease: "power1.inOut"
        }
      )

    }, component)
    return () => ctx.revert(); //cleanup
  }, [])

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <Bounded as="div">
        <Heading size="xl" as="h2"className="mb-8">
          {slice.primary.heading}
        </Heading>
      </Bounded>
      <div className="tech-items-container overflow-hidden">
        {slice.primary.item.map((item, index) => (
          <div key={index} className="tech-item-row mb-8 flex items-center justify-center gap-4 text-zinc-700 tracking-tighter" aria-label={item.tech_name || undefined}>
            {Array.from({ length: 15 }, (_, i) => (
              <React.Fragment key={i}>
                <span className="tech-item text-7xl font-extrabold uppercase tracking-tighter" style={{
                  color: i === 7 && item.tech_color ? item.tech_color: "inherit"
                }}>
                  {item.tech_name}
                </span>
                <span className="text-2xl">
                  <MdCircle />
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechSection;