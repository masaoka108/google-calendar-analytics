"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-[#77CDE9] via-[#77CDE9]/80 to-[#77CDE9]/60 shadow-md z-50">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-6 md:gap-10 items-center justify-between px-6 py-4 max-w-7xl mx-auto border-none"
      >
        <Link href="/" className="flex items-center space-x-3 group">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className=""></div>
            <Image
              src="/images/g_calendar_logo.png"
              alt="サイトロゴ"
              width={32}
              height={32}
              className="relative rounded-full"
            />
          </motion.div>
          <span className="inline-block font-bold text-white text-xl tracking-wide">
            {siteConfig.name}
          </span>
        </Link>
        {items?.length ? (
          <nav className="flex gap-6">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-white hover:text-white/90 relative group",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    <span className="relative flex items-center gap-1">
                      {item.icon && (
                        <item.icon className="w-4 h-4 fill-white" />
                      )}
                      {item.title}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                )
            )}
          </nav>
        ) : null}
      </motion.div>
    </div>
  )
}
