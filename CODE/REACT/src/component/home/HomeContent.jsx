import React from 'react';
import buildingPhoto from '../../../../IMAGES/BUILDING.png';
import { 
  Search, ClipboardList, FlaskConical, Copy, BookOpen, ArrowRight, Star
} from 'lucide-react';

const initialReviews = [
  { id: 1, initials: "AK", name: "Ananya Kashyap", rating: 5, text: "Amazing platform! All the resources I need in one place." },
  { id: 2, initials: "RM", name: "Rohit Mishra", rating: 5, text: "Previous papers and lab manuals are a lifesaver." },
  { id: 3, initials: "SP", name: "Shivam Pandey", rating: 4, text: "Well organized and easy to use." },
  { id: 4, initials: "VK", name: "Vanshika Kapoor", rating: 5, text: "Love the clean interface and the quality of content." }
];

const HomeContent = () => {
  return (
    <div className="w-full flex flex-col items-center bg-[#080b0e] text-gray-300 font-sans pb-20">
      
      {/* MASTER CONTAINER - Increased gap from 16 to 24 for more flow */}
      <div className="w-full max-w-[1150px] px-6 flex flex-col gap-24">
        
        {/* 1. SEARCH SECTION - CLEANED UP */}
        <section className="w-full flex flex-col items-center pt-16">
          <h1 className="text-3xl md:text-4xl text-white tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            WHAT ARE YOU SEARCHING FOR?
          </h1>
          
          {/* This spacer provides a guaranteed, clean gap */}
          <div className="h-10"></div> 
          
          <div className="relative w-full max-w-3xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input type="text" className="w-full bg-[#11151a] border border-gray-800 rounded-full py-4 pl-14 pr-6 text-white focus:outline-none focus:border-[#d99b78]" placeholder="Search for subjects, courses, notes, PYQs..." />
          </div>
        </section>

        {/* 2. ABOUT/WHY SECTION */}
        <section className="flex flex-col lg:flex-row gap-10">
          <div className="bg-[#11151a] border border-gray-800 rounded-2xl p-12 lg:w-1/3 flex flex-col justify-center">
            <h2 className="text-2xl text-white mb-8 uppercase tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>Why ABES<br />Autonomy is<br />Important?</h2>
            <div className="text-5xl text-[#d99b78] font-serif mb-4">“</div>
            <p className="text-gray-300 leading-relaxed text-lg">Education is not just about learning, it's about building a better tomorrow.<br />– ABES Autonomy</p>
          </div>
          <div className="lg:w-2/3 h-96 rounded-2xl overflow-hidden border border-gray-800">
            <img src={buildingPhoto} alt="ABES Engineering College" className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
          </div>
        </section>

        {/* 3. CATEGORIES GRID SECTION - Increased margin-top for breathing room */}
        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "ASSIGNMENTS", icon: ClipboardList, desc: "Homework, problem sets and project assignments." },
              { title: "LAB MANUALS", icon: FlaskConical, desc: "Practical manuals, experiment records and lab guides." },
              { title: "PREVIOUS PAPERS", icon: Copy, desc: "Previous year question papers and exam resources." },
              { title: "SUBJECTS", icon: BookOpen, desc: "Browse all subjects and course materials." }
            ].map((card, i) => (
              <div key={i} className="bg-[#11151a] border border-gray-800 rounded-2xl p-10 flex flex-col items-center text-center group hover:border-[#d99b78]/50 transition-all cursor-pointer">
                <card.icon className="w-10 h-10 text-[#d99b78] mb-8" />
                <h3 className="text-white text-lg tracking-wider mb-6" style={{ fontFamily: 'Georgia, serif' }}>{card.title}</h3>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed">{card.desc}</p>
                <ArrowRight className="w-5 h-5 text-[#d99b78] mt-auto" />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomeContent;