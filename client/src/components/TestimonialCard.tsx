interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
}

export default function TestimonialCard({ quote, author, title }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
      <div className="text-primary-light text-4xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#0099ff" stroke="none">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </div>
      <p className="text-gray-700 mb-4">
        {quote}
      </p>
      <div className="mt-6">
        <p className="font-semibold text-primary-dark">{author}</p>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>
    </div>
  );
}
