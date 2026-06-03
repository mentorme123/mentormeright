const PARTNERS = [
  { name: "DDGD Vaishnav Chennai", logo: "/images/partners/ddgd-vaishnav.png", link: "/k12-programs" },
  { name: "Bhavan's Group", logo: "/images/partners/bhavans-group.png", link: "/k12-programs" },
  { name: "ICBM School of Business", logo: "/images/partners/icbm.png", link: "/college-programs" },
  { name: "TSWRDC Nalgonda", logo: "/images/partners/tswrdc.png", link: "/k12-programs" },
  { name: "Pragati Mahavidyalaya", logo: "/images/partners/pragati-maha.png", link: "/college-programs" },
  { name: "Keshav Memorial", logo: "/images/partners/keshav-memorial.png", link: "/k12-programs" },
  { name: "ELGI School", logo: "/images/partners/elgi-school.png", link: "/k12-programs" },
  { name: "St. Joseph's Degree & PG College", logo: "/images/partners/st-josephs.png", link: "/college-programs" },
  { name: "Howard Park International", logo: "/images/partners/howard-park.png", link: "/k12-programs" },
  { name: "Geetam School", logo: "/images/partners/geetam.png", link: "/k12-programs" },
  { name: "Pantheon Digital", logo: "/images/partners/pantheon-digital.png", link: "/college-programs" },
  { name: "Avanthi Degree & PG Colleges", logo: "/images/partners/avanthi.png", link: "/college-programs" },
  { name: "HPS Nizamabad", logo: "/images/partners/hps-nizamabad.png", link: "/k12-programs" },
  { name: "IIMC Hyderabad", logo: "/images/partners/iimc-hyderabad.png", link: "/college-programs" },
  { name: "St Pious Hyderabad", logo: "/images/partners/st-pious.png", link: "/k12-programs" },
];

export const dynamic = "force-static";
export const revalidate = false;

export default function Page() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white mb-8">
          Our Recent Program Partners
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {PARTNERS.map((partner) => (
              <a
                key={partner.name}
                href={partner.link}
                className="group flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-20 w-20">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
