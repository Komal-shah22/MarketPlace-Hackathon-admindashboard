export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 text-center mt-10">
        <p className="text-sm md:text-base lg:text-lg">
          &copy; {new Date().getFullYear()} Shop.co - All Rights Reserved.
        </p>
      </footer>
    );
  }
    