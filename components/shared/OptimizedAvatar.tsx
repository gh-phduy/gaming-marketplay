"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * OptimizedAvatar Component
 * 
 * Uses Next.js Image for automatic image optimization and proper sizing
 * to eliminate "Improve image delivery" Lighthouse warnings
 */

interface OptimizedAvatarProps {
    src: string;
    alt: string;
    size?: number;
    className?: string;
    fallback?: string;
    isOnline?: boolean;
}

export function OptimizedAvatar({
    src,
    alt,
    size = 48,
    className,
    fallback,
    isOnline,
}: OptimizedAvatarProps) {
    const [hasError, setHasError] = React.useState(false);

    return (
        <div className={cn("relative w-min flex shrink-0", className)}>
            <div
                className="relative overflow-hidden rounded-full bg-muted"
                style={{ width: size, height: size }}
            >
                {!hasError ? (
                    <Image
                        src={src}
                        alt={alt}
                        width={size}
                        height={size}
                        className="object-cover"
                        onError={() => setHasError(true)}
                        // Ensure Next.js serves the image at the correct size
                        sizes={`${size}px`}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                        {fallback || alt.substring(0, 2).toUpperCase()}
                    </div>
                )}
            </div>
            {isOnline !== undefined && isOnline && (
                <div
                    className="absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-background bg-green-500"
                    style={{ width: size * 0.3, height: size * 0.3 }}
                    aria-label="Online"
                />
            )}
        </div>
    );
}

export default OptimizedAvatar;
