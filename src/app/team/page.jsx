import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Anid Hassan',
    role: 'Fundraising and Planning',
    phone: '+8801863333449',
    facebook: 'https://www.facebook.com/anid.hassan',
  },
  {
    name: 'Suprakash Bakali',
    role: 'Database and Fund Management',
    phone: '+8801521795475',
    facebook: 'https://www.facebook.com/bakali.me.in',
  },
  {
    name: 'Riyadh Hossain',
    role: 'Publication Specialist',
    phone: '+8801824006979',
    facebook: 'https://www.facebook.com/riyadh.hossain.69',
  },
  {
    name: 'Shimanta Ranjan Chakma',
    role: 'Area survey support',
    phone: '+8801648336521',
    facebook: 'https://www.facebook.com/src.shimanta.35',
  },
  {
    name: 'Pritom Pal Dip',
    role: 'Website Design and maintenance',
    phone: '+8801625197575',
    facebook:"https://www.facebook.com/dippal513"
  },
  {
    name: 'Sadman Atik',
    role: 'Backend Developer',
    phone: '+880 1978-120911',
    // facebook:"https://www.facebook.com/dippal513"
  },
  {
    name: 'Rahat Rahman',
    role: 'External Affairs and support',
    phone: '+8801675137167',
    facebook: 'https://www.facebook.com/mohammad.rahat.39108',
  },
  {
    name: 'Muhammad Mamun',
    role: 'Social Media management',
    phone: '+8801881337706',
    facebook: 'https://www.facebook.com/profile.php?id=100015569592333',
  },
  {
    name: 'Shuvo Karmaker',
    role: 'Support',
    phone: '+8801745330624',
    facebook: 'https://www.facebook.com/suvo.suvokarmoker',
  },
  {
    name: 'Asif Shahriar Shammo',
    role: 'Support',
    phone: '+8801796581213',
    facebook: 'https://www.facebook.com/asifshahriar.shammo30',
  },
  {
    name: 'Sadik Ahmed Masum',
    role: 'Support',
    phone: '+8801864664247',
    facebook: 'https://www.facebook.com/profile.php?id=100074735670159',
  },
];
const Team = () => {
    return (
        <div className="max-w-screen-xl mx-auto py-12 px-6">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative bg-white border border-red-300 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative flex flex-col items-center p-6">
                  <div className="">
                    <Image
                      src="/avatar.png" // Replace with actual avatar image paths if available
                      alt={member.name}
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-red-500"
                    />
                  </div>
                  <div className="pt-16 pb-6 text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-lg text-gray-700 mb-1">{member.role}</p>
                    <p className="text-sm text-gray-600 mb-4">{member.phone}</p>
                    {member.facebook && (
                      <Link href={member?.facebook || ""}
                        
                        className="bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
                      >
                        Facebook Profile
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default Team;