

const Hero = () => {
  return (
    <div className="relative flex justify-center h-[40vh] md:h-[45vh] lg:h-[45vh] px-6 text-center overflow-hidden">

    {/* Gradient Background */}
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#c05621_0%,#a04820_50%,#f6ad55_100%)]" />

    {/* Plus Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 
    bg-[radial-gradient(circle,white_1px,transparent_1px)] 
    bg-size-[28px_28px]" />
    {/* <div
        className="absolute inset-0 opacity-90
        bg-[linear-gradient(white_2px,transparent_2px),
            linear-gradient(90deg,white_2px,transparent_2px)]
        bg-size-[40px_40px]
        bg-position-[20px_0,0_20px]"
    /> */}

    {/* Content */}
        <div className="relative z-10 max-w-3xl text-white mt-8">

            <p className="uppercase tracking-[0.25em] text-sm font-semibold  mb-4 opacity-90 ">
            ✦ OVER 10,000 RECIPES AT YOUR FINGERTIPS
            </p>

            <h1 className="text-5xl md:text-6xl font-serif leading-tight">
            Find your next <br />
            <span className="italic font-medium  opacity-80">
                favorite meal
            </span>
            </h1>

            <p className="mt-6 text-lg opacity-90 mx-auto">
            Search by ingredient, cuisine, or mood. Discover dishes from around the world.
            </p>

        </div>
    </div>
  )
}

export default Hero