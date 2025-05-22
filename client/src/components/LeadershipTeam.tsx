import React from 'react';

interface LeadershipMember {
  name: string;
  position: string;
  bio: string;
  image?: string;
  initials?: string;
}

export default function LeadershipTeam() {
  const leadershipTeam: LeadershipMember[] = [
    {
      name: "Dr. Sarah Chen",
      position: "Chief Executive Officer",
      bio: "Dr. Chen brings over 15 years of expertise in AI research and business transformation. Previously led AI initiatives at Fortune 100 companies and holds a Ph.D. in Computer Science from Stanford.",
      initials: "DSC"
    },
    {
      name: "Michael Rodriguez",
      position: "Chief Technology Officer",
      bio: "With extensive experience in developing enterprise AI solutions, Michael has architected systems for global organizations. Former tech lead at Google's AI division with an MS in Machine Learning.",
      initials: "MR"
    },
    {
      name: "Jessica Wong",
      position: "Chief Operations Officer",
      bio: "Jessica specializes in scaling AI operations across diverse industries. Her background in business strategy and AI implementation has helped numerous organizations achieve digital transformation.",
      initials: "JW"
    },
    {
      name: "David Patel",
      position: "VP of Business Development",
      bio: "David excels at connecting business challenges with AI solutions. His dual background in business administration and data science allows him to bridge technical capabilities with market needs.",
      initials: "DP"
    }
  ];

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary-900">Our Leadership Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadershipTeam.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-r from-primary-700 to-primary-500 flex items-center justify-center">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {member.initials || member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-1">{member.name}</h3>
                <p className="text-sm text-primary-600 font-medium mb-4">{member.position}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}