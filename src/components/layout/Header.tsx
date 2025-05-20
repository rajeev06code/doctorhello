
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BriefcaseMedical, Home, Lightbulb, LogIn, LogOut, Search, UserPlus, Menu, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"


export function Header() {
  const { user, logout, loading } = useAuth(); 

  const commonLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Search", icon: Search },
    { href: "/recommendations", label: "AI Recommender", icon: Lightbulb },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <BriefcaseMedical className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl text-primary">
            Hello <span className="text-foreground">Doctor</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
          {commonLinks.map(link => (
            <Button key={link.label} variant="ghost" asChild className="text-foreground/80 hover:text-primary hover:bg-primary/10">
              <Link href={link.href}>
                <link.icon className="mr-2 h-4 w-4" /> {link.label}
              </Link>
            </Button>
          ))}
          
          {!loading && user && (
            <Button variant="ghost" asChild className="text-foreground/80 hover:text-primary hover:bg-primary/10">
                <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </Link>
            </Button>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {loading ? (
            <Button variant="ghost" disabled>Loading...</Button>
          ) : user ? (
            <Button variant="outline" onClick={logout} className="border-primary text-primary hover:bg-primary/10">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-foreground/80 hover:text-primary hover:bg-primary/10">
                  <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" /> Login
                  </Link>
              </Button>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <Link href="/register">
                      <UserPlus className="mr-2 h-4 w-4" /> Register
                  </Link>
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary hover:bg-primary/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <Link href="/" className="flex items-center space-x-2">
                    <BriefcaseMedical className="h-7 w-7 text-primary" />
                    <span className="font-bold text-lg text-primary">
                      Hello <span className="text-foreground">Doctor</span>
                    </span>
                  </Link>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                  {commonLinks.map(link => (
                    <SheetClose key={link.label} asChild>
                       <Button 
                          variant="ghost" 
                          asChild 
                          className="w-full justify-start text-base text-foreground/80 hover:text-primary hover:bg-primary/10"
                        >
                        <Link href={link.href}>
                          <link.icon className="mr-3 h-5 w-5" /> {link.label}
                        </Link>
                      </Button>
                    </SheetClose>
                  ))}
                  
                  {!loading && user && (
                    <SheetClose asChild>
                       <Button 
                          variant="ghost" 
                          asChild 
                          className="w-full justify-start text-base text-foreground/80 hover:text-primary hover:bg-primary/10"
                        >
                        <Link href="/dashboard">
                          <LayoutDashboard className="mr-3 h-5 w-5" /> Dashboard
                        </Link>
                      </Button>
                    </SheetClose>
                  )}

                  {!loading && !user && (
                    <>
                      <SheetClose asChild>
                        <Button 
                            variant="ghost" 
                            asChild 
                            className="w-full justify-start text-base text-foreground/80 hover:text-primary hover:bg-primary/10"
                          >
                          <Link href="/login">
                            <LogIn className="mr-3 h-5 w-5" /> Login
                          </Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button 
                            variant="default" 
                            asChild 
                            className="w-full justify-start text-base bg-accent hover:bg-accent/90 text-accent-foreground"
                          >
                          <Link href="/register">
                            <UserPlus className="mr-3 h-5 w-5" /> Register
                          </Link>
                        </Button>
                      </SheetClose>
                    </>
                  )}

                  {!loading && user && (
                     <SheetClose asChild>
                        <Button variant="ghost" onClick={logout} className="w-full justify-start text-base text-foreground/80 hover:text-primary hover:bg-primary/10">
                           <LogOut className="mr-3 h-5 w-5" /> Logout
                        </Button>
                     </SheetClose>
                  )}
                </nav>
                 <div className="p-4 mt-auto border-t">
                    {/* Optional: Footer content for mobile menu */}
                 </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
