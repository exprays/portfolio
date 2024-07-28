import { cn } from "@/lib/utils";
import { LinkField, KeyTextField } from "@prismicio/client"
import { PrismicNextLink } from "@prismicio/next";
import { ArrowUpRight } from "lucide-react";

type ButtonProps = {
    linkField: LinkField;
    label: KeyTextField;
    showIcon?: boolean;
    className?: string;
}

export default function Button({ linkField, label, showIcon = false, className }: ButtonProps) { 
    return (
        <PrismicNextLink 
            field={linkField}
            className={cn(
                "group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-zinc-900 text-zinc-900 bg-zinc-50 px-4 py-2 font-bold transition-transform ease-out hover:scale-105",
                className
            )}
        >
            <span className="absolute inset-0 z-0 h-full translate-y-9 bg-cyan-300 transition-transform ease-in-out duration-300 group-hover:translate-y-0">
            </span>
            <span className="relative flex items-center justify-center gap-2">
                {label} {showIcon && <ArrowUpRight className="inline-block"/>}
            </span>
        </PrismicNextLink>
    )
}