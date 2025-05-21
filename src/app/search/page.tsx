"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Stethoscope, Languages, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// Example: a large list of medical specialties (can be expanded)
const allSpecialties = [
	"Cardiologist",
	"Dermatologist",
	"Endocrinologist",
	"Gastroenterologist",
	"Hematologist",
	"Immunologist",
	"Nephrologist",
	"Neurologist",
	"Oncologist",
	"Ophthalmologist",
	"Orthopedic Surgeon",
	"Otolaryngologist",
	"Pediatrician",
	"Psychiatrist",
	"Pulmonologist",
	"Radiologist",
	"Rheumatologist",
	"Urologist",
	"General Practitioner",
	"Dentist",
	"Surgeon",
	"Anesthesiologist",
	"Pathologist",
	"Obstetrician",
	"Gynecologist",
	"Allergist",
	"Infectious Disease Specialist",
	"Plastic Surgeon",
	"Geriatrician",
	"Family Medicine",
	"Sports Medicine",
	"Emergency Medicine",
	"Internal Medicine",
	"Occupational Medicine",
	"Pain Management",
	"Podiatrist",
	"Sleep Medicine",
	"Vascular Surgeon",
	"Geneticist",
	"Nuclear Medicine",
	"Rehabilitation Medicine",
	"Public Health",
	"Other",
	// ...add more as needed
];

// Styled Autocomplete to match site theme
const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
	"& .MuiInputBase-root": {
		backgroundColor: "hsl(var(--background))",
		color: "hsl(var(--foreground))",
		borderRadius: "0.375rem", // rounded-md
		border: "1px solid hsl(var(--border))",
		minHeight: "2.25rem", // h-9
		height: "2.25rem", // Force same height as other inputs
		paddingLeft: "0.75rem", // px-3
		fontSize: "1rem",
		boxShadow: "none",
		transition: "border-color 0.2s",
		outline: "none",
		fontFamily: "inherit",
		display: "flex",
		alignItems: "center",
	},
	"& .MuiInputBase-root.Mui-focused": {
		borderColor: "hsl(var(--primary))",
		boxShadow: "0 0 0 2px hsl(var(--ring))",
		outline: "none",
	},
	"& .MuiInputBase-input": {
		padding: 0,
		height: "2.25rem",
		lineHeight: "2.25rem",
		color: "hsl(var(--foreground))",
		backgroundColor: "transparent",
		fontFamily: "inherit",
		boxSizing: "border-box",
		display: "flex",
		alignItems: "center",
	},
	"& .MuiInputBase-input::placeholder": {
		color: "hsl(var(--muted-foreground))",
		opacity: 1,
		fontFamily: "inherit",
	},
	"& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-clearIndicator": {
		color: "hsl(var(--muted-foreground))",
	},
	"& .MuiAutocomplete-listbox": {
		background: "hsl(var(--card))", // Use card color for dropdown
		color: "hsl(var(--foreground))",
		border: "1px solid hsl(var(--border))",
		borderRadius: "0.375rem",
		boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
		fontSize: "1rem",
		padding: 0,
		fontFamily: "inherit",
	},
	"& .MuiAutocomplete-option": {
		backgroundColor: "hsl(var(--card))",
		color: "hsl(var(--foreground))",
		fontSize: "1rem",
		padding: "0.5rem 1rem",
		fontFamily: "inherit",
		"&[aria-selected='true']": {
			backgroundColor: "hsl(var(--accent))",
			color: "hsl(var(--accent-foreground))",
		},
		"&.Mui-focused, &:hover": {
			backgroundColor: "hsl(var(--primary))",
			color: "hsl(var(--primary-foreground))",
		},
	},
	"& .MuiAutocomplete-noOptions": {
		color: "hsl(var(--muted-foreground))",
		padding: "0.75rem",
		fontFamily: "inherit",
		background: "hsl(var(--card))",
	},
}));

export default function SearchPage() {
	// Dummy data for providers
	const providers = [
		{
			id: "1",
			name: "Dr. Priya Sharma",
			speciality: "Cardiologist",
			experience: "15 Yrs",
			location: "Mumbai",
			image: "https://images.unsplash.com/photo-1511174511562-5f97f4f4eab6?auto=format&fit=crop&w=400&q=80",
			rating: 4.8,
			reviews: 120,
			dataAiHint: "doctor portrait",
		},
		{
			id: "2",
			name: "Apollo Clinic",
			speciality: "Multispeciality",
			experience: "25 Yrs",
			location: "Delhi",
			image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
			rating: 4.5,
			reviews: 350,
			dataAiHint: "clinic building",
		},
		{
			id: "3",
			name: "Dr. Arjun Singh",
			speciality: "Pediatrician",
			experience: "10 Yrs",
			location: "Bangalore",
			image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=400&q=80",
			rating: 4.9,
			reviews: 95,
			dataAiHint: "doctor child",
		},
		{
			id: "4",
			name: "Manipal Hospital",
			speciality: "Hospital",
			experience: "30 Yrs",
			location: "Jaipur",
			image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
			rating: 4.7,
			reviews: 450,
			dataAiHint: "hospital exterior",
		},
	];

	const extractShortAddress = (data: any) => {
		if (!data) return "";
		// For search (array) or reverse (object)
		const address = data.address || data[0]?.address;
		if (!address) return "";
		const city = address.city || address.town || address.village || address.hamlet || address.suburb || address.county || address.state_district || address.state;
		const state = address.state || address.state_district || address.region;
		const country = address.country;
		// Prefer city + state, fallback to state + country
		if (city && state) return `${city}, ${state}`;
		if (city && country) return `${city}, ${country}`;
		if (state && country) return `${state}, ${country}`;
		return country || "";
	};

	const [locationLoading, setLocationLoading] = useState(false);
	const [location, setLocation] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [speciality, setSpeciality] = useState("");

	const handleDetectLocation = async () => {
		setLocationLoading(true);
		if (inputValue.trim()) {
			// If pincode is entered, use Nominatim to get address from pincode
			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/search?postalcode=${inputValue}&country=India&format=json&addressdetails=1`
				);
				const data = await response.json();
				if (data && data.length > 0) {
					const shortAddr = extractShortAddress(data);
					if (shortAddr) {
						setLocation(shortAddr);
						setInputValue(shortAddr);
					} else {
						alert("No concise address found for this pincode.");
					}
				} else {
					alert("No address found for this pincode.");
				}
			} catch {
				alert("Could not fetch address for this pincode.");
			} finally {
				setLocationLoading(false);
			}
		} else if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					try {
						const response = await fetch(
							`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
						);
						const data = await response.json();
						const shortAddr = extractShortAddress(data);
						if (shortAddr) {
							setLocation(shortAddr);
							setInputValue(shortAddr);
						} else {
							alert("Could not extract a concise address. Please enter it manually.");
						}
					} catch (err) {
						alert("Could not fetch address. Please enter it manually.");
					} finally {
						setLocationLoading(false);
					}
				},
				(error) => {
					setLocationLoading(false);
					console.error("Error getting location:", error);
					alert("Could not detect your location. Please enter it manually.");
				}
			);
		} else {
			setLocationLoading(false);
			alert("Geolocation is not supported by your browser.");
		}
	};

	return (
		<div className="container mx-auto px-4 py-8 md:py-12">
			<section className="mb-10 md:mb-12 p-6 md:p-8 bg-card rounded-xl shadow-lg border border-border/60">
				<h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
					Find Healthcare Providers
				</h1>
				<p className="text-muted-foreground mb-6 md:mb-8">
					Search for doctors, clinics, and hospitals near you.
				</p>

				<form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
					<div className="space-y-1">
						<label htmlFor="location" className="text-sm font-medium text-foreground">
							Location / Pincode
						</label>
						<div className="flex items-center border border-input rounded-md focus-within:ring-2 focus-within:ring-ring bg-background">
							<MapPin className="h-5 w-5 text-muted-foreground ml-3 mr-2 shrink-0" />
							<input
								id="location"
								value={inputValue}
								onChange={e => {
									setInputValue(e.target.value);
									setLocation(""); // Clear detected location if user edits
								}}
								placeholder="Enter Pincode or leave blank for GPS"
								className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 h-9 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
								style={{ minWidth: 0 }}
								maxLength={8}
								inputMode="text"
							/>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								className="mr-1 text-primary hover:text-primary hover:bg-primary/10"
								onClick={handleDetectLocation}
								disabled={locationLoading}
							>
								{locationLoading ? (
									<span className="animate-spin mr-2 w-4 h-4 border-2 border-primary border-t-transparent rounded-full inline-block align-middle"></span>
								) : null}
								Detect
							</Button>
						</div>
					</div>

					<div className="space-y-1">
						<label
							htmlFor="speciality"
							className="text-sm font-medium text-foreground"
						>
							Speciality / Symptom
						</label>
						<StyledAutocomplete
							freeSolo
							options={allSpecialties}
							value={speciality}
							onChange={(_event, newValue: string | null) => setSpeciality(newValue || "")}
							renderInput={(params: any) => (
								<TextField
									{...params}
									placeholder="e.g., Cardiologist, Fever"
									variant="standard"
									InputProps={{
										...params.InputProps,
										disableUnderline: true,
										className:
											"border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 h-9 bg-transparent text-foreground placeholder:text-muted-foreground",
										style: {
											fontFamily: 'inherit',
											color: 'hsl(var(--foreground))',
											background: 'transparent',
											height: '2.25rem',
											lineHeight: '2.25rem',
											display: 'flex',
											alignItems: 'center',
										},
									}}
									sx={{
										'& .MuiInputBase-input': {
											color: 'hsl(var(--foreground))',
											fontFamily: 'inherit',
											height: '2.25rem',
											lineHeight: '2.25rem',
											display: 'flex',
											alignItems: 'center',
										},
										'& .MuiInputBase-input::placeholder': {
											color: 'hsl(var(--muted-foreground))',
											opacity: 1,
										},
									}}
								/>
							)}
						/>
					</div>

					<Button
						type="submit"
						className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base h-10"
					>
						<Search className="mr-2 h-5 w-5" /> Search
					</Button>
				</form>
			</section>

			<section>
				<h2 className="text-2xl font-semibold text-foreground mb-6">
					Search Results ({providers.length})
				</h2>
				{providers.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{providers.map((provider) => (
							<Card
								key={provider.id}
								className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card border border-border/60"
							>
								<CardHeader className="p-0 relative">
									<Image
										src={provider.image}
										alt={provider.name}
										width={400}
										height={250}
										className="w-full h-48 object-cover" // Fixed height for consistency
										data-ai-hint={provider.dataAiHint}
									/>
								</CardHeader>
								<CardContent className="p-4 flex-grow flex flex-col">
									<CardTitle className="text-xl text-primary mb-1 line-clamp-1">
										{provider.name}
									</CardTitle>
									<CardDescription className="text-sm text-muted-foreground mb-1">
										{provider.speciality}
									</CardDescription>
									<div className="flex items-center text-sm text-muted-foreground mb-2">
										<MapPin className="h-4 w-4 mr-1 text-primary/70" />{" "}
										{provider.location}
									</div>
									<div className="flex items-center text-sm mb-3">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`w-4 h-4 ${
													i < Math.floor(provider.rating)
														? "fill-accent text-accent"
														: "fill-muted text-muted-foreground opacity-50"
												}`}
											/>
										))}
										<span className="ml-1.5 text-muted-foreground text-xs">
											({provider.reviews} reviews)
										</span>
									</div>
									<p className="text-sm text-foreground mb-4">
										Experience: {provider.experience}
									</p>
									<div className="mt-auto pt-2 border-t border-border/40">
										<Button
											asChild
											className="w-full bg-primary hover:bg-primary/90"
										>
											{/* Placeholder link, ideally to /providers/[id] */}
											<Link href={`/providers/${provider.id}`}>
												View Profile & Book
											</Link>
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				) : (
					<div className="text-center py-10 border-2 border-dashed border-border/60 rounded-lg">
						<Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
						<p className="text-xl text-muted-foreground">
							No providers found matching your criteria.
						</p>
						<p className="text-sm text-muted-foreground mt-1">
							Try adjusting your search filters or widening your search area.
						</p>
					</div>
				)}
			</section>
		</div>
	);
}
