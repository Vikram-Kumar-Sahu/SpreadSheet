import { FiSearch, FiBell, FiChevronRight } from 'react-icons/fi';
import { BsGrid } from 'react-icons/bs';

const Header = () => {
  const handleClick = (elementName: string) => {
    console.log(`${elementName} clicked`);
  };

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      {/* Left: Spreadsheet Icon and Breadcrumb */}
      <div className="flex items-center">
        <span 
          className="mr-2 cursor-pointer text-gray-600"
          onClick={() => handleClick("Panel icon")}
        >
          <BsGrid size={20} />
        </span>
        <nav className="flex items-center text-gray-500 text-base font-normal">
          <span 
            className="cursor-pointer hover:text-gray-700"
            onClick={() => handleClick("Workspace breadcrumb")}
          >
            Workspace
          </span>
          <span className="mx-1 text-gray-400">
            <FiChevronRight size={14} />
          </span>
          <span 
            className="cursor-pointer hover:text-gray-700"
            onClick={() => handleClick("Folder 2 breadcrumb")}
          >
            Folder 2
          </span>
          <span className="mx-1 text-gray-400">
            <FiChevronRight size={14} />
          </span>
          <span 
            className="text-black font-semibold cursor-pointer"
            onClick={() => handleClick("Spreadsheet 3 breadcrumb")}
          >
            Spreadsheet 3
          </span>
        </nav>
      </div>
      
      {/* Right: Search, Notifications, User */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search within sheet"
            className="pl-8 pr-3 py-1.5 rounded border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            onClick={() => handleClick("Search input")}
          />
          <span 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => handleClick("Search icon")}
          >
            <FiSearch size={16} />
          </span>
        </div>
        
        {/* Notification Bell */}
        <button 
          className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600"
          onClick={() => handleClick("Notifications")}
        >
          <FiBell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
        </button>
        
        {/* User Avatar and Name */}
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleClick("User profile")}
        >
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            <img src="/profile.svg" alt="" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">John Doe</span>
            <span className="text-xs text-gray-400">john.doe@email.com</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;