const Header = () => {
  return (
    <div className="flex justify-between p-3">
      <button
        type="button"
        className="text-indigo-500 hover:text-indigo-300 font-medium rounded-full text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Discordと連携する
      </button>
      <button
        id="question"
        type="submit"
        form="question"
        className="text-white bg-recursion hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        質問する
      </button>
    </div>
  );
};

export default Header;
