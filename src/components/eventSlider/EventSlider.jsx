import Link from 'next/link';

const EventSection = ({ event }) => {
  return (
    <div className="bg-white py-8">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="text-center">
          {/* Event Image */}
          <img
            src={event.image}
            alt={event.title}
            className="mx-auto w-full h-auto max-w-md rounded-lg shadow-md"
          />

          {/* Event Title and Link */}
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-red-600">{event.title}</h2>
            <p className="text-gray-700 mt-2">{event.description}</p>

            {/* Event Link */}
            <Link href={event.link} passHref>
              <span className="inline-block mt-4 px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors">
                View Event
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


const event = {
  title: 'Rhythm for Rehabilitation 1.0',
  
  image: '/banner.jpg', // Replace with your image path
  link: 'https://www.facebook.com/share/m6m1JHCzhD9zkUxp/', // Link to the event page
};

const EventSlider = () => {
  return (
    <div>
      <EventSection event={event} />
    </div>
  );
};

export default EventSlider;
