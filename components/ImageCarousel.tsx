"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface ImageCarouselProps {
    images: string[];
    alt: string;
    interval?: number; // ms
}

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export default function ImageCarousel({
    images,
    alt,
    interval = 5000,
}: ImageCarouselProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <motion.div
            variants={item}
            className="relative mt-14 aspect-[4/3] rounded-2xl overflow-hidden"
        >
            <AnimatePresence>
                <motion.img
                    key={images[index]}
                    src={images[index]}
                    alt={alt}
                    initial={{ opacity: 0, scale: 1.08, filter: "blur(16px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.08, filter: "blur(16px)" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </AnimatePresence>
        </motion.div>
    );
}