import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import Bounded  from "@/components/bounded";
import Heading from "@/components/texts/heading";
import { createClient } from "@/prismicio";
import ContentList from "@/components/custom/ContentList";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({ slice }: ContentIndexProps): Promise<JSX.Element> => {

  const client = createClient();
  const blogposts = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("projects");

  const contentType = slice.primary.content_type || "1 Blog";

  const items = contentType === "1 Blog" ? blogposts : projects;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
        <Heading as="h2" size="xl">
          {slice.primary.heading}
        </Heading>
        {isFilled.richText(slice.primary.description) && (
          <div className="prose prose-xl prose-invert mb-10">
              <PrismicRichText field={slice.primary.description}/>
          </div>
        )}
        <ContentList items={items} contentType={contentType} linkText={slice.primary.link_text} fallbackImage={slice.primary.fallback_image}/>
    </Bounded>
  );
};

export default ContentIndex;
